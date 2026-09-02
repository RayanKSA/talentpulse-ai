import pytest
from backend.app.schemas.models import JobPosting
from backend.app.services.parser import parse_resume
from backend.app.services.matcher import match_resume_to_job, calculate_semantic_similarity
from backend.app.services.ats_scorer import evaluate_ats_compliance
from backend.app.services.skill_extractor import compare_skill_sets

def test_compare_skill_sets():
    cand_skills = ["Python", "FastAPI", "Docker", "Git"]
    req_skills = ["Python", "FastAPI", "PostgreSQL"]
    pref_skills = ["Docker", "Kubernetes"]

    comparison = compare_skill_sets(cand_skills, req_skills, pref_skills)
    assert "Python" in comparison["matched_skills"]
    assert "FastAPI" in comparison["matched_skills"]
    assert "Docker" in comparison["matched_skills"]
    assert "PostgreSQL" in comparison["missing_required_skills"]
    assert "Kubernetes" in comparison["missing_preferred_skills"]
    assert "Git" in comparison["bonus_skills"]
    assert 0.0 <= comparison["match_percentage"] <= 100.0

def test_calculate_semantic_similarity():
    doc1 = "Senior Python engineer building FastAPI microservices and PostgreSQL databases."
    doc2 = "Looking for a Python developer proficient in FastAPI and database systems."
    doc3 = "Veterinary clinic specializing in feline surgery and pet grooming."

    sim_high = calculate_semantic_similarity(doc1, doc2)
    sim_low = calculate_semantic_similarity(doc1, doc3)

    assert sim_high > sim_low
    assert sim_high > 0.05
    assert sim_low == 0.0

def test_ats_compliance_scoring():
    # Realistic 250+ word resume snippet
    resume_text = """
    Alex Smith
    alex@smith.com | (555) 123-4567 | linkedin.com/in/alexsmith | github.com/alexsmith
    
    Professional Summary
    Experienced software engineer with 4 years building distributed systems.
    
    Work Experience
    Software Engineer | Tech Innovations Inc | 2021 - Present
    - Architected and engineered high-throughput REST APIs in Python and FastAPI.
    - Reduced API response latency by 35% and scaled infrastructure to support 2M daily active users.
    - Automated CI/CD deployment pipelines saving 15 hours per week of manual operations.
    - Spearheaded migration of legacy MySQL databases to PostgreSQL, improving query execution time by 40%.
    - Mentored 3 junior developers and collaborated with product teams across 2 offices.
    
    Education
    Bachelor of Science in Computer Science | State University | 2017 - 2021
    
    Skills
    Python, FastAPI, React, Docker, PostgreSQL, Redis, Linux, Git, CI/CD
    """
    parsed = parse_resume(resume_text)
    report = evaluate_ats_compliance(parsed)
    assert report.overall_score >= 70
    assert report.metrics_count >= 3
    assert report.action_verbs_count >= 3

def test_match_resume_to_job_end_to_end():
    resume_text = """
    Jane Developer
    jane@dev.com | 555-0199 | linkedin.com/in/janedev
    Experience
    Senior Full Stack | WebCorp | 2020 - Present
    - Developed web apps in React, Python, and FastAPI handling 50k users.
    - Deployed Docker containers to AWS and managed PostgreSQL databases.
    Education
    B.S. in Computer Science
    Skills
    Python, FastAPI, React, Docker, PostgreSQL, AWS
    """
    parsed = parse_resume(resume_text)
    job = JobPosting(
        title="Full Stack Engineer",
        required_skills=["Python", "FastAPI", "React"],
        preferred_skills=["Docker", "PostgreSQL"],
        description="We are hiring a Full Stack Engineer to build APIs in FastAPI and frontends in React."
    )
    result = match_resume_to_job(parsed, job)

    assert result.overall_score >= 75
    assert result.fit_verdict in ["Exceptional Match", "Strong Contender"]
    assert len(result.interview_questions) >= 2
    assert "Python" in result.skill_breakdown.matched_skills
