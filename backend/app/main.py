"""
TalentPulse AI - Main FastAPI Application.
Production-ready API for resume parsing, ATS scoring, candidate-job matching,
and recruiter talent pool benchmarking.
"""

from typing import List, Optional
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.app.schemas.models import (
    ParsedResume,
    JobPosting,
    MatchAnalysisResult,
    ATSAuditReport,
)
from backend.app.services.parser import parse_resume, extract_text_from_pdf
from backend.app.services.ats_scorer import evaluate_ats_compliance
from backend.app.services.matcher import match_resume_to_job
from backend.app.sample_data import SAMPLE_JOBS, SAMPLE_RESUMES

app = FastAPI(
    title="TalentPulse AI API",
    description="Intelligent ATS & Career Match Platform for HR teams and technical candidates.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration for local development and container deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request schemas
class MatchRequest(BaseModel):
    resume_text: str
    job_id: Optional[str] = None
    custom_job: Optional[JobPosting] = None

class RankCandidatesRequest(BaseModel):
    job_id: Optional[str] = None
    custom_job: Optional[JobPosting] = None


@app.get("/api/health")
def health_check():
    """Service health and diagnostic status."""
    return {
        "status": "healthy",
        "service": "TalentPulse AI Engine",
        "version": "1.0.0",
        "capabilities": ["pdf_parsing", "ats_audit", "vector_matching", "interview_generation"]
    }


@app.get("/api/jobs", response_model=List[JobPosting])
def get_jobs():
    """Retrieve pre-configured industry job profiles."""
    return [JobPosting(**job) for job in SAMPLE_JOBS]


@app.get("/api/sample-resumes")
def get_sample_resumes():
    """Retrieve realistic candidate sample resumes across experience tiers."""
    return SAMPLE_RESUMES


@app.post("/api/parse-resume", response_model=ParsedResume)
async def parse_resume_endpoint(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None)
):
    """
    Parses a resume from uploaded PDF bytes or pasted text.
    Extracts contact information, work experience, education, and classified skills.
    """
    text = ""
    if file:
        filename = file.filename.lower()
        content = await file.read()
        if filename.endswith(".pdf"):
            try:
                text = extract_text_from_pdf(content)
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Failed to parse PDF document: {str(e)}")
        else:
            text = content.decode("utf-8", errors="ignore")
    elif raw_text:
        text = raw_text
    else:
        raise HTTPException(status_code=400, detail="Provide either an uploaded file or raw_text.")

    if not text.strip():
        raise HTTPException(status_code=400, detail="Document contains no readable text.")

    parsed = parse_resume(text)
    return parsed


@app.post("/api/ats-audit", response_model=ATSAuditReport)
def ats_audit_endpoint(payload: dict = Body(...)):
    """
    Runs an exhaustive ATS compliance audit on raw resume text.
    Evaluates measurable metrics, strong action verbs, section headers, and length.
    """
    resume_text = payload.get("resume_text", "")
    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text is required.")

    parsed = parse_resume(resume_text)
    report = evaluate_ats_compliance(parsed)
    return report


@app.post("/api/match", response_model=MatchAnalysisResult)
def match_endpoint(req: MatchRequest):
    """
    Executes deep match analysis between candidate resume and target job posting.
    Returns composite score, skill Venn breakdown, ATS audit, and tailored interview probes.
    """
    if not req.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text is required.")

    # Determine target job
    target_job: Optional[JobPosting] = None
    if req.custom_job:
        target_job = req.custom_job
    elif req.job_id:
        found = next((j for j in SAMPLE_JOBS if j["id"] == req.job_id), None)
        if found:
            target_job = JobPosting(**found)

    if not target_job:
        # Default to first sample job if none specified
        target_job = JobPosting(**SAMPLE_JOBS[0])

    parsed = parse_resume(req.resume_text)
    result = match_resume_to_job(parsed, target_job)
    return result


@app.post("/api/recruiter/rank")
def rank_candidates_endpoint(req: RankCandidatesRequest):
    """
    Recruiter Benchmarking Engine:
    Ranks all talent pool candidates against a specific job role.
    Sorts by overall match score and produces a comparative leaderboard.
    """
    target_job: Optional[JobPosting] = None
    if req.custom_job:
        target_job = req.custom_job
    elif req.job_id:
        found = next((j for j in SAMPLE_JOBS if j["id"] == req.job_id), None)
        if found:
            target_job = JobPosting(**found)

    if not target_job:
        target_job = JobPosting(**SAMPLE_JOBS[0])

    leaderboard = []
    for cand in SAMPLE_RESUMES:
        parsed = parse_resume(cand["raw_text"])
        result = match_resume_to_job(parsed, target_job)
        leaderboard.append({
            "candidate_id": cand["id"],
            "name": cand["name"],
            "title": cand["title"],
            "email": cand["email"],
            "years_experience": cand["years_experience"],
            "overall_score": result.overall_score,
            "skills_score": result.skills_score,
            "ats_score": result.ats_score,
            "fit_verdict": result.fit_verdict,
            "verdict_color": result.verdict_color,
            "matched_skills": result.skill_breakdown.matched_skills,
            "missing_required_skills": result.skill_breakdown.missing_required_skills,
            "summary": result.summary_for_recruiter,
        })

    # Sort candidates descending by overall score
    leaderboard.sort(key=lambda x: x["overall_score"], reverse=True)

    return {
        "job_title": target_job.title,
        "job_company": target_job.company,
        "total_candidates": len(leaderboard),
        "leaderboard": leaderboard
    }
