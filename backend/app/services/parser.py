"""
Resume Parsing Service.
Extracts contact information, sections, experience metrics, and text from PDF and TXT documents.
"""

import io
import re
from typing import List, Tuple
from pypdf import PdfReader

from backend.app.schemas.models import ContactInfo, EducationItem, ParsedResume
from backend.app.services.skill_extractor import extract_skills

# Regex patterns for contact information
EMAIL_REGEX = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
PHONE_REGEX = re.compile(r"(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}")
LINKEDIN_REGEX = re.compile(r"(?:https?://)?(?:www\.)?linkedin\.com/in/([a-zA-Z0-9_-]+)", re.IGNORECASE)
GITHUB_REGEX = re.compile(r"(?:https?://)?(?:www\.)?github\.com/([a-zA-Z0-9_-]+)", re.IGNORECASE)

# Standard resume section header patterns
SECTION_PATTERNS = {
    "Summary": re.compile(r"^(?:professional\s+summary|summary|profile|about\s+me)\b", re.IGNORECASE),
    "Experience": re.compile(r"^(?:work\s+experience|professional\s+experience|experience|employment\s+history)\b", re.IGNORECASE),
    "Education": re.compile(r"^(?:education|academic\s+background|qualifications)\b", re.IGNORECASE),
    "Skills": re.compile(r"^(?:technical\s+skills|skills\s+&?\s+competencies|skills|technologies)\b", re.IGNORECASE),
    "Projects": re.compile(r"^(?:projects|personal\s+projects|featured\s+projects)\b", re.IGNORECASE),
    "Certifications": re.compile(r"^(?:certifications|licenses\s+&?\s+certifications|credentials)\b", re.IGNORECASE),
}

# Date ranges for estimating years of experience
YEAR_RANGE_REGEX = re.compile(r"\b(20\d{2}|19\d{2})\s*(?:-|–|to)\s*(20\d{2}|19\d{2}|present|current)\b", re.IGNORECASE)


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts plain text from raw PDF file bytes."""
    reader = PdfReader(io.BytesIO(file_bytes))
    text_parts = []
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text_parts.append(page_text)
    return "\n".join(text_parts)


def parse_contact_info(text: str) -> ContactInfo:
    """Extracts email, phone, links, and candidate name."""
    email_match = EMAIL_REGEX.search(text)
    phone_match = PHONE_REGEX.search(text)
    linkedin_match = LINKEDIN_REGEX.search(text)
    github_match = GITHUB_REGEX.search(text)

    # Heuristic for name: First 1-3 non-empty lines that don't contain email/urls/symbols
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    candidate_name = "Candidate"
    for line in lines[:5]:
        if (
            not EMAIL_REGEX.search(line)
            and not PHONE_REGEX.search(line)
            and "http" not in line.lower()
            and len(line.split()) in [2, 3, 4]
            and not any(char in line for char in ["@", "/", "|", ":", "#"])
        ):
            candidate_name = line
            break

    return ContactInfo(
        name=candidate_name,
        email=email_match.group(0) if email_match else None,
        phone=phone_match.group(0) if phone_match else None,
        linkedin=linkedin_match.group(0) if linkedin_match else None,
        github=github_match.group(0) if github_match else None,
    )


def detect_sections(text: str) -> List[str]:
    """Identifies major recognized resume sections present."""
    found_sections = []
    for line in text.splitlines():
        line_clean = line.strip().lower()
        if len(line_clean) > 40:
            continue
        for section_name, pattern in SECTION_PATTERNS.items():
            if pattern.search(line_clean) and section_name not in found_sections:
                found_sections.append(section_name)
    return found_sections


def estimate_experience_years(text: str) -> float:
    """Estimates total years of professional experience from date intervals."""
    matches = YEAR_RANGE_REGEX.findall(text)
    current_year = 2026
    total_years = 0.0

    seen_ranges = set()
    for start_str, end_str in matches:
        try:
            start_yr = int(start_str)
            end_yr = current_year if end_str.lower() in ["present", "current"] else int(end_str)
            if start_yr <= end_yr and (end_yr - start_yr) <= 30:
                key = (start_yr, end_yr)
                if key not in seen_ranges:
                    seen_ranges.add(key)
                    diff = max(0.5, float(end_yr - start_yr))
                    total_years += diff
        except ValueError:
            continue

    # Bound estimate reasonably
    return min(total_years, 25.0)


def extract_education(text: str) -> List[EducationItem]:
    """Extracts degree and institution mentions."""
    degrees = []
    degree_patterns = [
        re.compile(r"\b(Bachelor(?:'s)?(?:\s+of\s+[A-Za-z\s]+)?|B\.S\.|B\.A\.|B\.Sc|B\.Tech)\b", re.IGNORECASE),
        re.compile(r"\b(Master(?:'s)?(?:\s+of\s+[A-Za-z\s]+)?|M\.S\.|M\.A\.|M\.Sc|M\.Tech|MBA)\b", re.IGNORECASE),
        re.compile(r"\b(Ph\.?D\.?|Doctorate)\b", re.IGNORECASE),
        re.compile(r"\b(Associate(?:'s)?(?:\s+Degree)?)\b", re.IGNORECASE),
    ]

    for line in text.splitlines():
        for pattern in degree_patterns:
            match = pattern.search(line)
            if match:
                deg_title = match.group(0).strip()
                if not any(d.degree.lower() == deg_title.lower() for d in degrees):
                    degrees.append(EducationItem(degree=deg_title, institution=line.strip()[:80]))
                break
    return degrees


def parse_resume(raw_text: str) -> ParsedResume:
    """
    Parses full resume text into structured representation.
    """
    contact = parse_contact_info(raw_text)
    skills, categorized_skills = extract_skills(raw_text)
    sections = detect_sections(raw_text)
    exp_years = estimate_experience_years(raw_text)
    education = extract_education(raw_text)
    words = raw_text.split()

    return ParsedResume(
        contact=contact,
        skills=skills,
        categorized_skills=categorized_skills,
        education=education,
        years_of_experience=exp_years,
        raw_text=raw_text,
        total_words=len(words),
        sections_found=sections,
    )
