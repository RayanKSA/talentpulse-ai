import React, { useState } from "react";
import { InterviewQuestion } from "../types";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Target, Compass } from "lucide-react";

interface InterviewSectionProps {
  questions: InterviewQuestion[];
}

export const InterviewSection: React.FC<InterviewSectionProps> = ({ questions }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold text-white">AI-Generated Interview Questions & STAR Rubrics</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 font-medium border border-purple-500/20">
          {questions.length} Probing Questions
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Tailored questions specifically targeting the candidate's skill gaps and verifying depth in core areas.
      </p>

      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              className="bg-slate-950/60 border border-slate-800/80 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-slate-900/40 transition"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                        {q.category}
                      </span>
                      {q.skill_targeted && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-medium flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {q.skill_targeted}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-100 leading-snug">{q.question}</p>
                  </div>
                </div>

                <div className="text-slate-500 flex-shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 bg-slate-950/90 text-xs space-y-3">
                  {/* Rationale */}
                  <div className="flex items-start space-x-2 text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
                    <Compass className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-300 font-medium">Interviewer Goal:</strong> {q.rationale}
                    </div>
                  </div>

                  {/* STAR Answer Rubric */}
                  {q.suggested_star_points && q.suggested_star_points.length > 0 && (
                    <div>
                      <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block mb-2">
                        Expected Candidate Answer Framework (STAR Method):
                      </span>
                      <ul className="space-y-1.5 pl-2">
                        {q.suggested_star_points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start space-x-2 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
