"""
ATS (Applicant Tracking System) Audit & Compliance Scoring Engine.
Analyzes resumes against recruiting industry standards: quantifiable metrics,
action verbs, contact hygiene, and structural completeness.
"""

import re
from typing import List, Tuple
from backend.app.schemas.models import ATSAuditReport, ATSAuditItem, ParsedResume

# High-impact engineering action verbs recommended by tech recruiters
POWER_ACTION_VERBS = {
    "accelerated", "achieved", "analyzed", "architected", "automated", "built",
    "centralized", "collaborated", "configured", "consolidated", "containerized",
    "debugged", "decreased", "delivered", "deployed", "designed", "developed",
    "devised", "eliminated", "engineered", "enhanced", "established", "executed",
    "expanded", "formulated", "generated", "implemented", "improved", "increased",
    "initiated", "integrated", "launched", "lead", "led", "leveraged", "maximized",
    "mentored", "migrated", "minimized", "modernized", "monitored", "negotiated",
    "optimized", "orchestrated", "overhauled", "partnered", "pioneered", "reduced",
    "refactored", "resolved", "restructured", "revamped", "scaled", "simplified",
    "spearheaded", "standardized", "streamlined", "supervised", "transformed", "upgraded"
}

# Weak, passive, or overused phrases that recruiters frown upon
WEAK_PHRASES = [
    "responsible for", "duties included", "worked on", "helped with",
    "assisted with", "participated in", "team player", "hard worker",
    "go-getter", "detail-oriented"
]

# Robust metric and quantifiable achievement regexes
METRIC_PATTERNS = [
    re.compile(r"\b\d+(?:\.\d+)?%"),  # 35%, 99.99%
    re.compile(r"\$\s*\d+(?:[.,]\d+)?\s*(?:k|m|b|million|billion)?\b", re.IGNORECASE),  # $500k, $1.2M
    re.compile(r"\b\d+(?:\.\d+)?\s*(?:x|times|fold)\b", re.IGNORECASE),  # 10x, 2.5x
    re.compile(r"\b\d+(?:\.\d+)?\s*[kKmMbB]?\+?\s+(?:[a-zA-Z\-]+\s+){0,3}(?:users|clients|requests|customers|engineers|developers|members|endpoints|qps|tps|transactions|queries|ms|seconds|minutes|hours|days|weeks|months|years)\b", re.IGNORECASE),
    re.compile(r"\b(?:reduced|decreased|increased|boosted|saved|grew|scaled|cut|improved|accelerated)\b[^\.\n]{1,40}?\b\d+", re.IGNORECASE),
]


def count_metrics(text: str) -> int:
    """Counts instances of quantified results, metrics, and scale indicators."""
    total = 0
    for pat in METRIC_PATTERNS:
        total += len(list(pat.finditer(text)))
    return total


def count_action_verbs(text: str) -> Tuple[int, List[str]]:
    """Counts unique power action verbs used in the document."""
    words = re.findall(r"\b[a-zA-Z]+\b", text.lower())
    found = [w for w in set(words) if w in POWER_ACTION_VERBS]
    total_occurrences = sum(1 for w in words if w in POWER_ACTION_VERBS)
    return total_occurrences, sorted(found)


def find_weak_phrases(text: str) -> List[str]:
    """Detects passive or filler phrases."""
    text_lower = text.lower()
    return [phrase for phrase in WEAK_PHRASES if phrase in text_lower]


def evaluate_ats_compliance(resume: ParsedResume) -> ATSAuditReport:
    """
    Computes an objective ATS score (0-100) and actionable improvement checklist.
    """
    checks: List[ATSAuditItem] = []
    total_earned = 0
    total_possible = 100

    raw_text = resume.raw_text
    metrics_count = count_metrics(raw_text)
    action_verb_count, found_verbs = count_action_verbs(raw_text)
    weak_phrases = find_weak_phrases(raw_text)

    # 1. Contact Information Completeness (20 pts)
    contact_score = 0
    contact_max = 20
    contact_feedback = []

    if resume.contact.email:
        contact_score += 7
    else:
        contact_feedback.append("Missing professional email address.")

    if resume.contact.phone:
        contact_score += 5
    else:
        contact_feedback.append("Missing phone number.")

    if resume.contact.linkedin or resume.contact.github:
        contact_score += 8
    else:
        contact_feedback.append("Consider adding LinkedIn and GitHub profile links.")

    passed_contact = contact_score >= 15
    feedback_contact = "Contact information is complete and easily extractable by ATS." if passed_contact else " ".join(contact_feedback)
    checks.append(ATSAuditItem(
        rule="Contact Details Extracted",
        passed=passed_contact,
        score=contact_score,
        max_score=contact_max,
        feedback=feedback_contact,
        impact="High"
    ))
    total_earned += contact_score

    # 2. Measurable Achievements & Metrics (25 pts)
    # Recruiters prioritize quantifiable impact: e.g. "improved speed by 30%"
    metric_max = 25
    if metrics_count >= 5:
        metric_score = 25
        metric_feedback = f"Outstanding quantifiable impact! Found {metrics_count} instances of metrics, percentages, or scale."
        metric_passed = True
    elif metrics_count >= 2:
        metric_score = 16
        metric_feedback = f"Good impact metrics ({metrics_count} found). Aim for at least 5 bullet points with concrete numbers (e.g. %, ms, scale)."
        metric_passed = True
    else:
        metric_score = 6
        metric_feedback = f"Only {metrics_count} quantifiable metrics detected. Add tangible metrics (e.g., 'reduced API response time by 40%', 'served 10k users')."
        metric_passed = False

    checks.append(ATSAuditItem(
        rule="Quantifiable Impact & Metrics",
        passed=metric_passed,
        score=metric_score,
        max_score=metric_max,
        feedback=metric_feedback,
        impact="High"
    ))
    total_earned += metric_score

    # 3. Strong Action Verbs vs Passive Phrases (20 pts)
    verb_max = 20
    if action_verb_count >= 10 and len(weak_phrases) == 0:
        verb_score = 20
        verb_feedback = f"Excellent strong action verbs used ({action_verb_count} total). Zero weak passive phrases detected."
        verb_passed = True
    elif action_verb_count >= 5:
        penalty = min(5, len(weak_phrases) * 2)
        verb_score = max(10, 16 - penalty)
        weak_str = f" Avoid passive phrases like: {', '.join(weak_phrases[:2])}." if weak_phrases else ""
        verb_feedback = f"Solid action verb usage ({action_verb_count} verbs).{weak_str}"
        verb_passed = True
    else:
        verb_score = 8
        verb_feedback = f"Low action verb frequency ({action_verb_count} found). Begin bullet points with verbs like 'Architected', 'Spearheaded', 'Engineered'."
        verb_passed = False

    checks.append(ATSAuditItem(
        rule="Action-Oriented Language",
        passed=verb_passed,
        score=verb_score,
        max_score=verb_max,
        feedback=verb_feedback,
        impact="Medium"
    ))
    total_earned += verb_score

    # 4. Standard Section Hierarchy (20 pts)
    sec_max = 20
    essential_sections = {"Experience", "Education", "Skills"}
    found_essential = essential_sections.intersection(set(resume.sections_found))
    sec_score = int((len(found_essential) / len(essential_sections)) * 15)
    if "Summary" in resume.sections_found or "Projects" in resume.sections_found:
        sec_score += 5
    sec_score = min(20, sec_score)
    sec_passed = sec_score >= 15

    missing_sec = essential_sections - set(resume.sections_found)
    if missing_sec:
        sec_feedback = f"Missing standard ATS section headers: {', '.join(missing_sec)}. Standard headers ensure smooth resume parsing."
    else:
        sec_feedback = "All standard ATS section headers present (Experience, Education, Skills)."

    checks.append(ATSAuditItem(
        rule="Standard ATS Section Hierarchy",
        passed=sec_passed,
        score=sec_score,
        max_score=sec_max,
        feedback=sec_feedback,
        impact="High"
    ))
    total_earned += sec_score

    # 5. Length & Formatting Density (15 pts)
    length_max = 15
    words = resume.total_words
    if 300 <= words <= 900:
        length_score = 15
        length_feedback = f"Optimal resume length ({words} words). Concise enough for recruiters, detailed enough for ATS."
        length_passed = True
    elif 200 <= words < 300:
        length_score = 10
        length_feedback = f"Slightly brief ({words} words). Consider detailing technical contributions and project outcomes."
        length_passed = True
    elif 900 < words <= 1300:
        length_score = 10
        length_feedback = f"Somewhat lengthy ({words} words). Tech recruiters favor a focused 1 to 2 page resume."
        length_passed = True
    else:
        length_score = 5
        length_feedback = f"Word count ({words} words) is outside the recommended 300-900 word window."
        length_passed = False

    checks.append(ATSAuditItem(
        rule="Length & Content Density",
        passed=length_passed,
        score=length_score,
        max_score=length_max,
        feedback=length_feedback,
        impact="Low"
    ))
    total_earned += length_score

    final_score = min(100, max(0, total_earned))
    if final_score >= 88:
        grade = "A"
        summary = "Resume is highly optimized for modern ATS screening and recruiter scanning."
    elif final_score >= 75:
        grade = "B"
        summary = "Good ATS compatibility with minor opportunities to strengthen quantifiable impact."
    elif final_score >= 60:
        grade = "C"
        summary = "Fair ATS compliance. Needs more quantifiable metrics, stronger action verbs, and clear sectioning."
    else:
        grade = "D"
        summary = "High risk of ATS filtering. Significant revisions to structure, contact info, and impact metrics recommended."

    return ATSAuditReport(
        overall_score=final_score,
        grade=grade,
        summary=summary,
        metrics_count=metrics_count,
        action_verbs_count=action_verb_count,
        sections_score=sec_score,
        checks=checks
    )
