import { JobPosting, SampleResume, MatchAnalysisResult, RecruiterCandidate, ATSAuditReport } from "./types";
import {
  FALLBACK_JOBS,
  FALLBACK_RESUMES,
  clientMatchResume,
  clientAuditResume,
  clientExtractSkills,
} from "./clientFallback";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function fetchJobs(): Promise<JobPosting[]> {
  try {
    const res = await fetch(`${API_BASE}/api/jobs`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return await res.json();
  } catch {
    // Graceful fallback for static GitHub Pages hosting
  }
  return FALLBACK_JOBS;
}

export async function fetchSampleResumes(): Promise<SampleResume[]> {
  try {
    const res = await fetch(`${API_BASE}/api/sample-resumes`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return await res.json();
  } catch {
    // Graceful fallback for static GitHub Pages hosting
  }
  return FALLBACK_RESUMES;
}

export async function parseResumeUpload(file?: File, rawText?: string) {
  if (file) {
    // Try backend parse first
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE}/api/parse-resume`, {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) return await res.json();
    } catch {
      // Client-side text reader fallback
    }

    // Fallback: Read file text in browser
    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || "");
      reader.onerror = reject;
      reader.readAsText(file);
    });

    const skills = clientExtractSkills(text);
    return {
      contact: { name: file.name.replace(/\.[^/.]+$/, ""), email: null, phone: null, linkedin: null, github: null },
      raw_text: text,
      skills,
      categorized_skills: {},
      education: [],
      years_of_experience: 2.0,
      total_words: text.split(/\s+/).length,
      sections_found: ["Experience", "Skills"],
    };
  }

  if (rawText) {
    try {
      const formData = new FormData();
      formData.append("raw_text", rawText);
      const res = await fetch(`${API_BASE}/api/parse-resume`, {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) return await res.json();
    } catch {
      // Client-side fallback
    }

    const skills = clientExtractSkills(rawText);
    return {
      contact: { name: "Candidate", email: null, phone: null, linkedin: null, github: null },
      raw_text: rawText,
      skills,
      categorized_skills: {},
      education: [],
      years_of_experience: 2.0,
      total_words: rawText.split(/\s+/).length,
      sections_found: ["Experience", "Skills"],
    };
  }

  throw new Error("Please provide either a file or raw text.");
}

export async function matchResume(
  resumeText: string,
  jobId?: string,
  customJob?: JobPosting
): Promise<MatchAnalysisResult> {
  const targetJob = customJob || FALLBACK_JOBS.find((j) => j.id === jobId) || FALLBACK_JOBS[0];

  try {
    const res = await fetch(`${API_BASE}/api/match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resume_text: resumeText,
        job_id: jobId,
        custom_job: customJob,
      }),
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) return await res.json();
  } catch {
    // Seamless fallback to client-side engine (active on GitHub Pages)
  }

  return clientMatchResume(resumeText, targetJob);
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
  const targetJob = customJob || FALLBACK_JOBS.find((j) => j.id === jobId) || FALLBACK_JOBS[0];

  try {
    const res = await fetch(`${API_BASE}/api/recruiter/rank`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_id: jobId,
        custom_job: customJob,
      }),
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) return await res.json();
  } catch {
    // Seamless fallback to client-side engine (active on GitHub Pages)
  }

  const leaderboard: RecruiterCandidate[] = FALLBACK_RESUMES.map((cand) => {
    const res = clientMatchResume(cand.raw_text, targetJob);
    return {
      candidate_id: cand.id,
      name: cand.name,
      title: cand.title,
      email: cand.email,
      years_experience: cand.years_experience,
      overall_score: res.overall_score,
      skills_score: res.skills_score,
      ats_score: res.ats_score,
      fit_verdict: res.fit_verdict,
      verdict_color: res.verdict_color,
      matched_skills: res.skill_breakdown.matched_skills,
      missing_required_skills: res.skill_breakdown.missing_required_skills,
      summary: res.summary_for_recruiter,
    };
  }).sort((a, b) => b.overall_score - a.overall_score);

  return {
    job_title: targetJob.title,
    job_company: targetJob.company || "Enterprise Corp",
    total_candidates: leaderboard.length,
    leaderboard,
  };
}

export async function runAtsAudit(resumeText: string): Promise<ATSAuditReport> {
  try {
    const res = await fetch(`${API_BASE}/api/ats-audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume_text: resumeText }),
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) return await res.json();
  } catch {
    // Client-side fallback
  }

  return clientAuditResume(resumeText);
}
