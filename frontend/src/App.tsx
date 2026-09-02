import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { SampleBar } from "./components/SampleBar";
import { ResumeInput } from "./components/ResumeInput";
import { JobInput } from "./components/JobInput";
import { ScoreGauge } from "./components/ScoreGauge";
import { SkillBreakdown } from "./components/SkillBreakdown";
import { ATSAuditSection } from "./components/ATSAuditSection";
import { InterviewSection } from "./components/InterviewSection";
import { RecruiterDashboard } from "./components/RecruiterDashboard";
import { JobPosting, SampleResume, MatchAnalysisResult } from "./types";
import { fetchJobs, fetchSampleResumes, parseResumeUpload, matchResume } from "./api";
import { AlertCircle, Award, ShieldCheck, HelpCircle, Download } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function App() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"candidate" | "recruiter">("candidate");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [sampleResumes, setSampleResumes] = useState<SampleResume[]>([]);

  const [selectedCandId, setSelectedCandId] = useState<string>("cand-1");
  const [selectedJobId, setSelectedJobId] = useState<string>("job-1");
  const [customJob, setCustomJob] = useState<JobPosting | null>(null);

  const [resumeText, setResumeText] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<MatchAnalysisResult | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<"skills" | "ats" | "interview">("skills");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize jobs and sample resumes on load
  useEffect(() => {
    async function initData() {
      try {
        const [jobsData, resumesData] = await Promise.all([
          fetchJobs(),
          fetchSampleResumes(),
        ]);
        setJobs(jobsData);
        setSampleResumes(resumesData);

        // Pre-populate with first candidate and first job for immediate interactive delight
        if (resumesData.length > 0) {
          setSelectedCandId(resumesData[0].id);
          setResumeText(resumesData[0].raw_text);
        }
        if (jobsData.length > 0) {
          setSelectedJobId(jobsData[0].id || "job-1");
        }
      } catch (err) {
        console.error("Initialization error", err);
      }
    }
    initData();
  }, []);

  // Handle selecting candidate sample
  const handleSelectCandidate = (cand: SampleResume) => {
    setSelectedCandId(cand.id);
    setResumeText(cand.raw_text);
    setFileName(null);
    setAnalysisResult(null);
    setErrorMsg(null);
  };

  // Handle selecting job profile
  const handleSelectJob = (job: JobPosting) => {
    setSelectedJobId(job.id || "");
    setCustomJob(null);
    setAnalysisResult(null);
    setErrorMsg(null);
  };

  // Handle file upload (PDF or TXT)
  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const parsed = await parseResumeUpload(file);
      setResumeText(parsed.raw_text);
      setFileName(file.name);
      setSelectedCandId("");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process uploaded file");
    } finally {
      setIsLoading(false);
    }
  };

  // Run full match and ATS audit
  const handleRunAnalysis = async () => {
    if (!resumeText.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await matchResume(
        resumeText,
        customJob ? undefined : selectedJobId,
        customJob || undefined
      );
      setAnalysisResult(result);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to evaluate match");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-run analysis when candidate or job is clicked from sample bar
  useEffect(() => {
    if (resumeText.trim() && selectedJobId) {
      handleRunAnalysis();
    }
  }, [selectedCandId, selectedJobId]);

  // Recruiter table deep match inspection
  const handleInspectCandidateFromRecruiter = (candidateId: string) => {
    const found = sampleResumes.find((c) => c.id === candidateId);
    if (found) {
      setSelectedCandId(found.id);
      setResumeText(found.raw_text);
      setFileName(null);
      setActiveTab("candidate");
      handleRunAnalysis();
    }
  };

  // Export structured candidate match dossier
  const handleExportReport = () => {
    if (!analysisResult) return;
    const isAr = lang === "ar";
    const report = `=====================================================
${isAr ? "منصة تالنت بلس - التقرير الشامل لتقييم السيرة الذاتية وفحص ATS" : "TALENTPULSE AI - CANDIDATE MATCH & ATS DOSSIER"}
=====================================================

${isAr ? "اسم المرشح" : "CANDIDATE"}: ${analysisResult.candidate_name}
${isAr ? "الوظيفة المستهدفة" : "TARGET ROLE"}: ${analysisResult.job_title}
${isAr ? "تاريخ الإصدار" : "DATE GENERATED"}: ${new Date().toLocaleDateString()}

${isAr ? "الملخص التنفيذي لمسؤول التوظيف" : "EXECUTIVE SUMMARY"}:
${analysisResult.summary_for_recruiter}

-----------------------------------------------------
${isAr ? "مؤشرات التقييم الرقمية" : "EVALUATION METRICS"}
-----------------------------------------------------
${isAr ? "نسبة المطابقة الإجمالية" : "Composite Fit Score"}:      ${analysisResult.overall_score}/100 (${analysisResult.fit_verdict})
${isAr ? "تطابق المهارات التقنية" : "Skill Taxonomy Match"}:     ${analysisResult.skills_score}%
${isAr ? "التطابق الدلالي" : "Semantic Relevance"}:       ${Math.round(analysisResult.semantic_similarity * 100)}%
${isAr ? "تقييم نظام ATS" : "ATS Compliance Grade"}:     Grade ${analysisResult.ats_audit.grade} (${analysisResult.ats_audit.overall_score}/100)
${isAr ? "ملاءمة سنوات الخبرة" : "Experience Level Fit"}:     ${analysisResult.experience_score}%

-----------------------------------------------------
${isAr ? "تفاصيل الكفاءات والمهارات" : "COMPETENCY BREAKDOWN"}
-----------------------------------------------------
${isAr ? "المهارات المتطابقة" : "Matched Skills"} (${analysisResult.skill_breakdown.matched_skills.length}):
${analysisResult.skill_breakdown.matched_skills.map((s) => `  [+] ${s}`).join("\n")}

${isAr ? "المهارات الأساسية المطلوبة المفقودة" : "Missing Core Skills"} (${analysisResult.skill_breakdown.missing_required_skills.length}):
${analysisResult.skill_breakdown.missing_required_skills.map((s) => `  [-] ${s}`).join("\n")}

${isAr ? "مهارات إضافية يمتلكها المرشح" : "Bonus Candidate Skills"} (${analysisResult.skill_breakdown.bonus_skills.length}):
${analysisResult.skill_breakdown.bonus_skills.map((s) => `  [*] ${s}`).join("\n")}

-----------------------------------------------------
${isAr ? "تدقيق معايير نظام الفرز ATS" : "ATS COMPLIANCE AUDIT"}
-----------------------------------------------------
${analysisResult.ats_audit.checks.map((c) => `[${c.passed ? "PASS" : "FAIL"}] ${c.rule} (${c.score}/${c.max_score} pts)\n  Feedback: ${c.feedback}`).join("\n\n")}

-----------------------------------------------------
${isAr ? "أسئلة المقابلة الذكية المقترحة (منهجية STAR)" : "TAILORED INTERVIEW PROBES & STAR RUBRICS"}
-----------------------------------------------------
${analysisResult.interview_questions.map((q, i) => `Question ${i + 1} (${q.category}${q.skill_targeted ? ` - ${q.skill_targeted}` : ""}):
${q.question}
Rationale: ${q.rationale}
STAR Framework:
${q.suggested_star_points.map((p) => `  * ${p}`).join("\n")}`).join("\n\n")}
`;

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Candidate_Dossier_${analysisResult.candidate_name.replace(/\s+/g, "_")}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Sample Bar for Instant 1-Click Evaluation */}
        <SampleBar
          sampleResumes={sampleResumes}
          jobs={jobs}
          selectedCandId={selectedCandId}
          selectedJobId={selectedJobId}
          onSelectCandidate={handleSelectCandidate}
          onSelectJob={handleSelectJob}
        />

        {errorMsg && (
          <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 text-xs text-rose-300 flex items-center space-x-2 rtl:space-x-reverse">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* View Mode: Candidate & ATS Match */}
        {activeTab === "candidate" ? (
          <div className="space-y-6">
            {/* Top Row: Input panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResumeInput
                resumeText={resumeText}
                setResumeText={setResumeText}
                fileName={fileName}
                setFileName={setFileName}
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
              />

              <JobInput
                jobs={jobs}
                selectedJobId={selectedJobId}
                onSelectJob={handleSelectJob}
                customJob={customJob}
                setCustomJob={setCustomJob}
                onRunAnalysis={handleRunAnalysis}
                isLoading={isLoading}
                canAnalyze={Boolean(resumeText.trim())}
              />
            </div>

            {/* Analysis Results Display */}
            {analysisResult && (
              <div className="space-y-6 pt-2">
                {/* Executive Score Card */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Header info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
                          {analysisResult.fit_verdict}
                        </span>
                        <span className="text-xs text-slate-400">
                          {t("semanticRelevance")}: {Math.round(analysisResult.semantic_similarity * 100)}%
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mt-1">
                        {analysisResult.candidate_name} &bull; {analysisResult.job_title}
                      </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 max-w-lg leading-relaxed">
                        <strong className="text-brand-400 font-semibold block mb-0.5">{t("recruiterBrief")}</strong>
                        {analysisResult.summary_for_recruiter}
                      </div>

                      <button
                        onClick={handleExportReport}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center space-x-1.5 rtl:space-x-reverse transition shadow-sm self-stretch sm:self-auto justify-center"
                      >
                        <Download className="w-4 h-4 text-brand-400" />
                        <span>{t("exportDossier")}</span>
                      </button>
                    </div>
                  </div>

                  {/* Circular Score Gauges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                    <ScoreGauge
                      score={analysisResult.overall_score}
                      label={t("compositeFit")}
                      subtext={t("compositeFitSub")}
                      size="lg"
                    />
                    <ScoreGauge
                      score={analysisResult.skills_score}
                      label={t("skillMatch")}
                      subtext={`${analysisResult.skill_breakdown.matched_skills.length} ${t("skillMatchSub")}`}
                      size="md"
                    />
                    <ScoreGauge
                      score={analysisResult.ats_score}
                      label={`${t("atsAuditGauge")} (${lang === "ar" ? `المستوى ${analysisResult.ats_audit.grade}` : `Grade ${analysisResult.ats_audit.grade}`})`}
                      subtext={t("atsAuditGaugeSub")}
                      size="md"
                    />
                    <ScoreGauge
                      score={analysisResult.experience_score}
                      label={t("expFit")}
                      subtext={t("expFitSub")}
                      size="md"
                    />
                  </div>
                </div>

                {/* Sub-view Navigation Tabs */}
                <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-slate-800 pb-2 overflow-x-auto">
                  <button
                    onClick={() => setActiveResultTab("skills")}
                    className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition ${
                      activeResultTab === "skills"
                        ? "bg-brand-600/20 text-brand-300 border border-brand-500/40"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>{t("tabSkills")} ({analysisResult.skill_breakdown.matched_skills.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveResultTab("ats")}
                    className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition ${
                      activeResultTab === "ats"
                        ? "bg-brand-600/20 text-brand-300 border border-brand-500/40"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t("tabAts")} ({analysisResult.ats_score}/100)</span>
                  </button>

                  <button
                    onClick={() => setActiveResultTab("interview")}
                    className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition ${
                      activeResultTab === "interview"
                        ? "bg-brand-600/20 text-brand-300 border border-brand-500/40"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{t("tabInterview")} ({analysisResult.interview_questions.length})</span>
                  </button>
                </div>

                {/* Tab content rendering */}
                {activeResultTab === "skills" && (
                  <SkillBreakdown breakdown={analysisResult.skill_breakdown} />
                )}

                {activeResultTab === "ats" && (
                  <ATSAuditSection audit={analysisResult.ats_audit} />
                )}

                {activeResultTab === "interview" && (
                  <InterviewSection questions={analysisResult.interview_questions} />
                )}
              </div>
            )}
          </div>
        ) : (
          /* Recruiter Leaderboard View */
          <RecruiterDashboard
            jobs={jobs}
            selectedJobId={selectedJobId}
            onSelectJob={handleSelectJob}
            onInspectCandidate={handleInspectCandidateFromRecruiter}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="font-semibold text-slate-300">{t("footerBrand")}</span>
            <span>&bull; {t("footerDesc")}</span>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse text-[11px] text-slate-400">
            <span>{t("backendTech")}</span>
            <span>&bull;</span>
            <span>{t("frontendTech")}</span>
            <span>&bull;</span>
            <span>{t("nlpTech")}</span>
            <span>&bull;</span>
            <span>{t("dockerTech")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
