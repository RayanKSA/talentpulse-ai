import { JobPosting, SampleResume, MatchAnalysisResult, RecruiterCandidate, ATSAuditReport } from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function fetchJobs(): Promise<JobPosting[]> {
  const res = await fetch(`${API_BASE}/api/jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function fetchSampleResumes(): Promise<SampleResume[]> {
  const res = await fetch(`${API_BASE}/api/sample-resumes`);
  if (!res.ok) throw new Error("Failed to fetch sample resumes");
  return res.json();
}

export async function parseResumeUpload(file?: File, rawText?: string) {
  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  }
  if (rawText) {
    formData.append("raw_text", rawText);
  }
  const res = await fetch(`${API_BASE}/api/parse-resume`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Parsing error" }));
    throw new Error(err.detail || "Failed to parse resume");
  }
  return res.json();
}

export async function matchResume(
  resumeText: string,
  jobId?: string,
  customJob?: JobPosting
): Promise<MatchAnalysisResult> {
  const res = await fetch(`${API_BASE}/api/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resume_text: resumeText,
      job_id: jobId,
      custom_job: customJob,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Matching error" }));
    throw new Error(err.detail || "Failed to match resume");
  }
  return res.json();
}

export async function rankCandidates(
  jobId?: string,
  customJob?: JobPosting
): Promise<{
  job_title: string;
  job_company: string;
  total_candidates: number;
  leaderboard: RecruiterCandidate[];
}> {
  const res = await fetch(`${API_BASE}/api/recruiter/rank`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      job_id: jobId,
      custom_job: customJob,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Ranking error" }));
    throw new Error(err.detail || "Failed to rank candidates");
  }
  return res.json();
}

export async function runAtsAudit(resumeText: string): Promise<ATSAuditReport> {
  const res = await fetch(`${API_BASE}/api/ats-audit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume_text: resumeText }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "ATS audit error" }));
    throw new Error(err.detail || "Failed to evaluate ATS score");
  }
  return res.json();
}
