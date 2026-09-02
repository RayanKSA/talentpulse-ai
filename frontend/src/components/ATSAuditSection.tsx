import React from "react";
import { ATSAuditReport } from "../types";
import { ShieldCheck, CheckCircle2, XCircle, FileSearch, Zap, BarChart2 } from "lucide-react";

interface ATSAuditSectionProps {
  audit: ATSAuditReport;
}

export const ATSAuditSection: React.FC<ATSAuditSectionProps> = ({ audit }) => {
  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "B":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "C":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      default:
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-white">ATS Compliance & Screening Audit</h3>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">ATS Rating:</span>
          <span className={`px-2.5 py-0.5 rounded-lg border font-bold text-xs ${getGradeBadge(audit.grade)}`}>
            Grade {audit.grade} ({audit.overall_score}/100)
          </span>
        </div>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Quantifiable Metrics</span>
            <strong className="text-sm text-white">{audit.metrics_count} impact points</strong>
          </div>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Action Power Verbs</span>
            <strong className="text-sm text-white">{audit.action_verbs_count} power verbs</strong>
          </div>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <FileSearch className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Section Hierarchy</span>
            <strong className="text-sm text-white">{audit.sections_score}/20 pts</strong>
          </div>
        </div>
      </div>

      {/* Rules Checklist */}
      <div className="space-y-2.5">
        {audit.checks.map((item, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-xl border transition-all ${
              item.passed
                ? "bg-slate-950/40 border-slate-800/80"
                : "bg-rose-950/10 border-rose-500/20"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start space-x-2.5">
                {item.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-white">{item.rule}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        item.impact === "High"
                          ? "bg-rose-500/10 text-rose-300"
                          : item.impact === "Medium"
                          ? "bg-amber-500/10 text-amber-300"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.impact} Impact
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.feedback}</p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span
                  className={`text-xs font-semibold ${
                    item.score === item.max_score
                      ? "text-emerald-400"
                      : item.score > 0
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  {item.score}/{item.max_score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
