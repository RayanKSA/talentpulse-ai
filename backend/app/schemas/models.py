from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class ContactInfo(BaseModel):
    name: Optional[str] = "Candidate"
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    location: Optional[str] = None

class EducationItem(BaseModel):
    degree: str
    institution: Optional[str] = None
    year: Optional[str] = None

class ParsedResume(BaseModel):
    contact: ContactInfo
    summary: Optional[str] = ""
    skills: List[str] = []
    categorized_skills: Dict[str, List[str]] = {}
    education: List[EducationItem] = []
    years_of_experience: float = 0.0
    raw_text: str
    total_words: int = 0
    sections_found: List[str] = []

class JobPosting(BaseModel):
    id: Optional[str] = None
    title: str
    company: Optional[str] = "TechCorp Global"
    department: Optional[str] = "Engineering"
    experience_level: Optional[str] = "Mid-Level"  # Junior, Mid-Level, Senior, Lead
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    description: str

class ATSAuditItem(BaseModel):
    rule: str
    passed: bool
    score: int
    max_score: int
    feedback: str
    impact: str  # High, Medium, Low

class ATSAuditReport(BaseModel):
    overall_score: int  # 0 to 100
    grade: str  # A, B, C, D
    summary: str
    metrics_count: int
    action_verbs_count: int
    sections_score: int
    checks: List[ATSAuditItem] = []

class SkillMatchBreakdown(BaseModel):
    matched_skills: List[str] = []
    missing_required_skills: List[str] = []
    missing_preferred_skills: List[str] = []
    bonus_skills: List[str] = []
    match_percentage: float = 0.0

class InterviewQuestion(BaseModel):
    category: str  # "Technical Skill Gap", "System Design", "Behavioral (STAR)"
    skill_targeted: Optional[str] = None
    question: str
    suggested_star_points: List[str] = []
    rationale: str

class MatchAnalysisResult(BaseModel):
    candidate_name: str
    job_title: str
    overall_score: int  # 0 to 100
    fit_verdict: str  # "Exceptional Match", "Strong Contender", "Moderate Fit", "Low Match"
    verdict_color: str  # green, emerald, amber, red
    skills_score: int
    experience_score: int
    ats_score: int
    semantic_similarity: float
    skill_breakdown: SkillMatchBreakdown
    ats_audit: ATSAuditReport
    interview_questions: List[InterviewQuestion] = []
    summary_for_recruiter: str

class CandidateProfile(BaseModel):
    id: str
    name: str
    title: str
    email: str
    years_experience: float
    skills: List[str]
    resume_text: str
