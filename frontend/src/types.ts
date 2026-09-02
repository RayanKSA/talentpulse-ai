export interface JobPosting {
  id?: string;
  title: string;
  company?: string;
  department?: string;
  experience_level?: string;
  required_skills: string[];
  preferred_skills: string[];
  description: string;
}

export interface SampleResume {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  years_experience: number;
  raw_text: string;
}

export interface ATSAuditItem {
  rule: string;
  passed: boolean;
  score: number;
  max_score: number;
  feedback: string;
  impact: string;
}

export interface ATSAuditReport {
  overall_score: number;
  grade: string;
  summary: string;
  metrics_count: number;
  action_verbs_count: number;
  sections_score: number;
  checks: ATSAuditItem[];
}

export interface SkillMatchBreakdown {
  matched_skills: string[];
  missing_required_skills: string[];
  missing_preferred_skills: string[];
  bonus_skills: string[];
  match_percentage: number;
}

export interface InterviewQuestion {
  category: string;
  skill_targeted?: string;
  question: string;
  suggested_star_points: string[];
  rationale: string;
}

export interface MatchAnalysisResult {
  candidate_name: string;
  job_title: string;
  overall_score: number;
  fit_verdict: string;
  verdict_color: string;
  skills_score: number;
  experience_score: number;
  ats_score: number;
  semantic_similarity: number;
  skill_breakdown: SkillMatchBreakdown;
  ats_audit: ATSAuditReport;
  interview_questions: InterviewQuestion[];
  summary_for_recruiter: string;
}

export interface RecruiterCandidate {
  candidate_id: string;
  name: string;
  title: string;
  email: string;
  years_experience: number;
  overall_score: number;
  skills_score: number;
  ats_score: number;
  fit_verdict: string;
  verdict_color: string;
  matched_skills: string[];
  missing_required_skills: string[];
  summary: string;
}
