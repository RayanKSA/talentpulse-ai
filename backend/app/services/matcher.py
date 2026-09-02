"""
Hybrid Resume-to-Job Matching Engine.
Combines TF-IDF vector cosine similarity, canonical skill taxonomy intersection,
and experience level calibration to generate a multi-dimensional fit score.
"""

from typing import Dict, Any, List
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from backend.app.schemas.models import (
    ParsedResume,
    JobPosting,
    MatchAnalysisResult,
    SkillMatchBreakdown,
)
from backend.app.services.skill_extractor import extract_skills, compare_skill_sets
from backend.app.services.ats_scorer import evaluate_ats_compliance
from backend.app.services.interview_generator import generate_interview_questions

EXPERIENCE_LEVEL_MAP = {
    "entry": (0.0, 2.0),
    "junior": (0.0, 3.0),
    "mid-level": (2.0, 6.0),
    "mid": (2.0, 6.0),
    "senior": (5.0, 15.0),
    "lead": (7.0, 20.0),
    "staff": (8.0, 25.0),
}


def calculate_semantic_similarity(resume_text: str, job_text: str) -> float:
    """
    Calculates TF-IDF vector cosine similarity with unigram + bigram features.
    """
    if not resume_text.strip() or not job_text.strip():
        return 0.0

    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),
        max_features=5000,
        sublinear_tf=True
    )
    tfidf_matrix = vectorizer.fit_transform([resume_text, job_text])
    sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    return float(max(0.0, min(1.0, sim)))


def evaluate_experience_fit(cand_years: float, job_level: str) -> int:
    """
    Scores alignment between candidate's estimated experience and role requirements (0-100).
    """
    target_range = EXPERIENCE_LEVEL_MAP.get(job_level.lower(), (2.0, 5.0))
    min_exp, max_exp = target_range

    if min_exp <= cand_years <= max_exp + 3:
        return 100
    elif cand_years < min_exp:
        deficit = min_exp - cand_years
        return max(30, int(100 - (deficit * 25)))
    else:
        # Overqualified or very senior
        return 85


def generate_recruiter_summary(
    candidate_name: str,
    job_title: str,
    overall_score: int,
    verdict: str,
    matched_skills: List[str],
    missing_skills: List[str]
) -> str:
    """Generates an executive briefing paragraph for non-technical recruiters."""
    top_matches = ", ".join(matched_skills[:4]) if matched_skills else "general qualifications"
    if missing_skills:
        missing_text = f"Primary development areas include {', '.join(missing_skills[:3])}."
    else:
        missing_text = "Candidate satisfies all primary technical requirements."

    return (
        f"{candidate_name} is evaluated as a {verdict} ({overall_score}/100) for the {job_title} role. "
        f"Key technical proficiencies demonstrated include {top_matches}. {missing_text}"
    )


def match_resume_to_job(resume: ParsedResume, job: JobPosting) -> MatchAnalysisResult:
    """
    Executes end-to-end matching analysis:
    1. Canonical skill extraction & gap analysis
    2. TF-IDF vector similarity
    3. Experience calibration
    4. ATS formatting audit
    5. Contextual interview question generation
    """
    # If job required/preferred skills were not provided explicitly, extract them from job description
    req_skills = job.required_skills
    pref_skills = job.preferred_skills

    if not req_skills:
        extracted_job_skills, _ = extract_skills(job.description)
        # Allocate first 60% as required, remaining as preferred
        split_idx = max(1, int(len(extracted_job_skills) * 0.65))
        req_skills = extracted_job_skills[:split_idx]
        pref_skills = extracted_job_skills[split_idx:]

    skill_comparison = compare_skill_sets(resume.skills, req_skills, pref_skills)
    skill_breakdown = SkillMatchBreakdown(**skill_comparison)

    semantic_sim = calculate_semantic_similarity(resume.raw_text, job.description)
    # Calibrate TF-IDF cosine similarity: in IR, a cosine similarity of 0.35+ between
    # distinct resume and job documents indicates very high topical alignment.
    semantic_score = min(100, int((semantic_sim / 0.35) * 100))

    exp_score = evaluate_experience_fit(resume.years_of_experience, job.experience_level or "mid-level")
    skills_score = int(skill_breakdown.match_percentage)

    # ATS Audit
    ats_report = evaluate_ats_compliance(resume)

    # Weighted Composite Score:
    # 55% Skill Match, 25% Semantic Relevance, 20% Experience Alignment
    overall_score = int(
        (skills_score * 0.55) +
        (semantic_score * 0.25) +
        (exp_score * 0.20)
    )
    overall_score = max(0, min(100, overall_score))

    # Verdict assignment
    if overall_score >= 80:
        verdict = "Exceptional Match"
        color = "emerald"
    elif overall_score >= 68:
        verdict = "Strong Contender"
        color = "blue"
    elif overall_score >= 50:
        verdict = "Moderate Fit"
        color = "amber"
    else:
        verdict = "Low Match"
        color = "rose"

    # Targeted interview questions for missing skills & behavioral STAR
    interview_qs = generate_interview_questions(
        job_title=job.title,
        matched_skills=skill_breakdown.matched_skills,
        missing_skills=skill_breakdown.missing_required_skills,
        experience_level=job.experience_level or "Mid-Level"
    )

    recruiter_summary = generate_recruiter_summary(
        candidate_name=resume.contact.name or "Candidate",
        job_title=job.title,
        overall_score=overall_score,
        verdict=verdict,
        matched_skills=skill_breakdown.matched_skills,
        missing_skills=skill_breakdown.missing_required_skills
    )

    return MatchAnalysisResult(
        candidate_name=resume.contact.name or "Candidate",
        job_title=job.title,
        overall_score=overall_score,
        fit_verdict=verdict,
        verdict_color=color,
        skills_score=skills_score,
        experience_score=exp_score,
        ats_score=ats_report.overall_score,
        semantic_similarity=round(semantic_sim, 3),
        skill_breakdown=skill_breakdown,
        ats_audit=ats_report,
        interview_questions=interview_qs,
        summary_for_recruiter=recruiter_summary
    )
