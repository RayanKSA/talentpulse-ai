import pytest
from backend.app.services.parser import parse_contact_info, detect_sections, estimate_experience_years, parse_resume
from backend.app.services.skill_extractor import extract_skills

SAMPLE_TEXT = """
Jane Doe
jane.doe@example.com | (555) 123-4567 | linkedin.com/in/janedoe | github.com/janedoe

Professional Summary
Senior Software Engineer with 6 years experience building scalable web backends in Python and React.

Technical Skills
Languages: Python, JavaScript, TypeScript, SQL
Frameworks: FastAPI, React, Next.js, Docker
Databases: PostgreSQL, Redis

Work Experience
Senior Backend Engineer | Acme Corp | 2020 - Present
- Built high-throughput microservices in FastAPI and PostgreSQL, serving 1M daily requests.
- Optimized database queries, reducing response latency by 45%.

Software Engineer | Beta Startup | 2018 - 2020
- Developed frontend components in React and TypeScript.
- Integrated automated tests reducing production bugs by 30%.

Education
Bachelor of Science in Computer Science | MIT | 2014 - 2018
"""

def test_parse_contact_info():
    contact = parse_contact_info(SAMPLE_TEXT)
    assert contact.name == "Jane Doe"
    assert contact.email == "jane.doe@example.com"
    assert contact.phone == "(555) 123-4567"
    assert "janedoe" in contact.linkedin
    assert "janedoe" in contact.github

def test_detect_sections():
    sections = detect_sections(SAMPLE_TEXT)
    assert "Summary" in sections
    assert "Skills" in sections
    assert "Experience" in sections
    assert "Education" in sections

def test_estimate_experience():
    exp = estimate_experience_years(SAMPLE_TEXT)
    assert exp >= 4.0

def test_skill_extraction():
    skills, categorized = extract_skills(SAMPLE_TEXT)
    assert "Python" in skills
    assert "FastAPI" in skills
    assert "React" in skills
    assert "PostgreSQL" in skills
    assert "Docker" in skills
    assert "Languages" in categorized
    assert "Backend" in categorized

def test_full_parse_resume():
    parsed = parse_resume(SAMPLE_TEXT)
    assert parsed.contact.name == "Jane Doe"
    assert len(parsed.skills) >= 5
    assert len(parsed.education) >= 1
    assert parsed.total_words > 50
