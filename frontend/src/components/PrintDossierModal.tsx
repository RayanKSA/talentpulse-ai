import React from "react";
import { MatchAnalysisResult } from "../types";
import { Printer, X, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface PrintDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: MatchAnalysisResult;
}

export const PrintDossierModal: React.FC<PrintDossierModalProps> = ({ isOpen, onClose, result }) => {
  const { lang, t } = useLanguage();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:p-0">
        {/* Action buttons (hidden on print) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <div>
            <h2 className="text-lg font-bold text-white">{t("printDossierTitle")}</h2>
            <p className="text-xs text-slate-400">{t("officialReport")}</p>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center space-x-1.5 rtl:space-x-reverse transition shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>{t("printAction")}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Header */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400 block mb-1">
                TALENTPULSE AI &bull; CANDIDATE EVALUATION REPORT
              </span>
              <h1 className="text-2xl font-bold text-white">{result.candidate_name}</h1>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">{result.job_title}</p>
            </div>
            <div className="text-right rtl:text-left text-xs text-slate-400">
              <div>Date: {new Date().toLocaleDateString()}</div>
              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold">
                {result.fit_verdict}
              </span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{t("compositeFit")}</span>
              <strong className="text-xl text-brand-400 font-bold">{result.overall_score}%</strong>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{t("skillMatch")}</span>
              <strong className="text-xl text-slate-200 font-bold">{result.skills_score}%</strong>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{t("atsAuditGauge")}</span>
              <strong className="text-xl text-emerald-400 font-bold">
                Grade {result.ats_audit.grade} ({result.ats_score})
              </strong>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{t("expFit")}</span>
              <strong className="text-xl text-indigo-400 font-bold">{result.experience_score}%</strong>
            </div>
          </div>

          {/* Executive Brief */}
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-brand-300 font-bold block mb-1">{t("recruiterBrief")}</strong>
            {result.summary_for_recruiter}
          </div>
        </div>

        {/* Competencies Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {t("skillsTitle")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t("matchedCompetencies")} ({result.skill_breakdown.matched_skills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.skill_breakdown.matched_skills.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-rose-400 font-semibold flex items-center gap-1.5 mb-2">
                <XCircle className="w-3.5 h-3.5" />
                {t("missingCore")} ({result.skill_breakdown.missing_required_skills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.skill_breakdown.missing_required_skills.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px]">
                    {s}
                  </span>
                ))}
                {result.skill_breakdown.missing_required_skills.length === 0 && (
                  <span className="text-emerald-400 font-medium">All core skills satisfied.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tailored Interview Probes */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {t("interviewTitle")}
          </h3>
          <div className="space-y-2.5">
            {result.interview_questions.map((q, idx) => (
              <div key={idx} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <div className="font-semibold text-white">
                  Q{idx + 1}: {q.question}
                </div>
                <div className="text-slate-400 text-[11px]">
                  <strong>Goal:</strong> {q.rationale}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
