import React from "react";
import { SkillMatchBreakdown } from "../types";
import { CheckCircle2, XCircle, AlertTriangle, PlusCircle, Award } from "lucide-react";

interface SkillBreakdownProps {
  breakdown: SkillMatchBreakdown;
}

export const SkillBreakdown: React.FC<SkillBreakdownProps> = ({ breakdown }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-brand-400" />
          <h3 className="font-semibold text-white">Skills Gap & Competency Analysis</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
          Match Ratio: {breakdown.match_percentage}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Matched Skills */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Matched Competencies ({breakdown.matched_skills.length})</span>
            </div>
          </div>
          {breakdown.matched_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {breakdown.matched_skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium flex items-center gap-1 shadow-sm"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No direct required skill matches detected.</p>
          )}
        </div>

        {/* Missing Required Skills */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <XCircle className="w-4 h-4" />
              <span>Missing Core Skills ({breakdown.missing_required_skills.length})</span>
            </div>
            {breakdown.missing_required_skills.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-medium">
                High Priority Gap
              </span>
            )}
          </div>
          {breakdown.missing_required_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {breakdown.missing_required_skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-medium flex items-center gap-1 shadow-sm"
                >
                  <XCircle className="w-3 h-3 text-rose-400" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-400/90 font-medium">
              Candidate fulfills all core mandatory skills!
            </p>
          )}
        </div>

        {/* Missing Preferred Skills */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>Missing Preferred Skills ({breakdown.missing_preferred_skills.length})</span>
          </div>
          {breakdown.missing_preferred_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {breakdown.missing_preferred_skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No missing preferred skills.</p>
          )}
        </div>

        {/* Bonus Skills */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <PlusCircle className="w-4 h-4" />
            <span>Candidate Bonus Skills ({breakdown.bonus_skills.length})</span>
          </div>
          {breakdown.bonus_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {breakdown.bonus_skills.slice(0, 10).map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
              {breakdown.bonus_skills.length > 10 && (
                <span className="text-xs text-slate-500 self-center">
                  +{breakdown.bonus_skills.length - 10} more
                </span>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No additional peripheral skills listed.</p>
          )}
        </div>
      </div>
    </div>
  );
};
