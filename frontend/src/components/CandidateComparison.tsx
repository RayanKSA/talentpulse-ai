import React, { useState, useMemo } from "react";
import { JobPosting, SampleResume } from "../types";
import { clientMatchResume } from "../clientFallback";
import { Scale, CheckCircle2, User, Trophy, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface CandidateComparisonProps {
  jobs: JobPosting[];
  sampleResumes: SampleResume[];
  selectedJobId: string;
}

export const CandidateComparison: React.FC<CandidateComparisonProps> = ({
  jobs,
  sampleResumes,
  selectedJobId,
}) => {
  const { lang, t } = useLanguage();
  const [candAId, setCandAId] = useState<string>(sampleResumes[0]?.id || "cand-1");
  const [candBId, setCandBId] = useState<string>(sampleResumes[1]?.id || "cand-2");
  const [activeJobId, setActiveJobId] = useState<string>(selectedJobId || jobs[0]?.id || "job-1");

  const currentJob = jobs.find((j) => j.id === activeJobId) || jobs[0];
  const candA = sampleResumes.find((c) => c.id === candAId) || sampleResumes[0];
  const candB = sampleResumes.find((c) => c.id === candBId) || sampleResumes[1] || sampleResumes[0];

  // Compute matches for both candidates
  const matchA = useMemo(() => {
    return clientMatchResume(candA.raw_text, currentJob);
  }, [candA, currentJob]);

  const matchB = useMemo(() => {
    return clientMatchResume(candB.raw_text, currentJob);
  }, [candB, currentJob]);

  // Compute skill intersections
  const setA = useMemo(() => new Set(matchA.skill_breakdown.matched_skills), [matchA]);
  const setB = useMemo(() => new Set(matchB.skill_breakdown.matched_skills), [matchB]);

  const sharedSkills = useMemo(() => {
    return matchA.skill_breakdown.matched_skills.filter((s) => setB.has(s));
  }, [matchA, setB]);

  const uniqueA = useMemo(() => {
    return matchA.skill_breakdown.matched_skills.filter((s) => !setB.has(s));
  }, [matchA, setB]);

  const uniqueB = useMemo(() => {
    return matchB.skill_breakdown.matched_skills.filter((s) => !setA.has(s));
  }, [matchB, setA]);

  const winner = matchA.overall_score >= matchB.overall_score ? "A" : "B";

  const getRecommendation = () => {
    const isAr = lang === "ar";
    if (matchA.overall_score === matchB.overall_score) {
      return isAr
        ? `كلا المرشحين يمتلكان درجة تقارب متماثلة (${matchA.overall_score}%). نوصي بالتركيز على أسئلة المقابلة السلوكية لحسم القرار.`
        : `Both candidates show equivalent technical fit (${matchA.overall_score}%). Recommend deep-dive behavioral interviews to evaluate culture fit and communication.`;
    }
    const leadCand = winner === "A" ? candA.name : candB.name;
    const diff = Math.abs(matchA.overall_score - matchB.overall_score);
    const topSkills = winner === "A" ? uniqueA : uniqueB;

    if (isAr) {
      return `يتصدر المرشح ${leadCand} بفارق ${diff}% في المطابقة الإجمالية. يقدم تفوقاً في ${topSkills.slice(0, 3).join(", ") || "الكفاءات الأساسية"} مع توافق أعلى مع معايير الوظيفة.`;
    }
    return `Candidate ${leadCand} leads with a +${diff}% higher fit score. Key differentiator: stronger competency coverage in ${topSkills.slice(0, 3).join(", ") || "core architecture requirements"}.`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 flex-shrink-0">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">{t("compareTitle")}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{t("compareSubtitle")}</p>
            </div>
          </div>

          {/* Job Selector */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">{t("targetRoleLabel")}</span>
            <select
              value={activeJobId}
              onChange={(e) => setActiveJobId(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id} className="bg-slate-900 text-slate-200">
                  {j.title} ({j.company})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Selector Cards for Candidate A and B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidate A Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>{t("candA")}</span>
            </div>
            {winner === "A" && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold flex items-center gap-1">
                <Trophy className="w-3 h-3 text-emerald-400" />
                {lang === "ar" ? "المتصدر الفني" : "Leading Fit"}
              </span>
            )}
          </div>

          <select
            value={candAId}
            onChange={(e) => setCandAId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
          >
            {sampleResumes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} • {c.title} ({c.years_experience}y exp)
              </option>
            ))}
          </select>

          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{t("compositeFit")}</span>
              <strong className="text-base text-indigo-400 font-bold">{matchA.overall_score}%</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{t("skillMatch")}</span>
              <strong className="text-base text-slate-200 font-bold">{matchA.skills_score}%</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{t("atsAuditGauge")}</span>
              <strong className="text-base text-emerald-400 font-bold">{matchA.ats_score}</strong>
            </div>
          </div>
        </div>

        {/* Candidate B Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-purple-400 font-bold text-xs uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>{t("candB")}</span>
            </div>
            {winner === "B" && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold flex items-center gap-1">
                <Trophy className="w-3 h-3 text-emerald-400" />
                {lang === "ar" ? "المتصدر الفني" : "Leading Fit"}
              </span>
            )}
          </div>

          <select
            value={candBId}
            onChange={(e) => setCandBId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-medium"
          >
            {sampleResumes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} • {c.title} ({c.years_experience}y exp)
              </option>
            ))}
          </select>

          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{t("compositeFit")}</span>
              <strong className="text-base text-purple-400 font-bold">{matchB.overall_score}%</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{t("skillMatch")}</span>
              <strong className="text-base text-slate-200 font-bold">{matchB.skills_score}%</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{t("atsAuditGauge")}</span>
              <strong className="text-base text-emerald-400 font-bold">{matchB.ats_score}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Recommendation Banner */}
      <div className="bg-gradient-to-r from-brand-950/40 via-purple-950/30 to-slate-900 border border-brand-500/30 rounded-2xl p-4.5 shadow-md flex items-start space-x-3 rtl:space-x-reverse">
        <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <strong className="text-brand-300 font-bold block mb-1">
            {t("recruiterRecommendation")}
          </strong>
          <p className="text-slate-200 leading-relaxed">{getRecommendation()}</p>
        </div>
      </div>

      {/* Competency & Skill Venn Intersections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Unique to A */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-indigo-400 text-xs font-semibold">
            <Layers className="w-4 h-4 flex-shrink-0" />
            <span>{t("uniqueToA")} ({uniqueA.length})</span>
          </div>
          {uniqueA.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {uniqueA.map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">None</p>
          )}
        </div>

        {/* Shared Common Skills */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{t("skillsOverlap")} ({sharedSkills.length})</span>
          </div>
          {sharedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {sharedSkills.map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No common skills</p>
          )}
        </div>

        {/* Unique to B */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-purple-400 text-xs font-semibold">
            <Layers className="w-4 h-4 flex-shrink-0" />
            <span>{t("uniqueToB")} ({uniqueB.length})</span>
          </div>
          {uniqueB.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {uniqueB.map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">None</p>
          )}
        </div>
      </div>
    </div>
  );
};
