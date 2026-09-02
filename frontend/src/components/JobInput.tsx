import React, { useState } from "react";
import { JobPosting } from "../types";
import { Briefcase, ChevronDown, ChevronUp, Sparkles, Building2, Layers } from "lucide-react";

interface JobInputProps {
  jobs: JobPosting[];
  selectedJobId: string;
  onSelectJob: (job: JobPosting) => void;
  customJob: JobPosting | null;
  setCustomJob: (job: JobPosting | null) => void;
  onRunAnalysis: () => void;
  isLoading: boolean;
  canAnalyze: boolean;
}

export const JobInput: React.FC<JobInputProps> = ({
  jobs,
  selectedJobId,
  onSelectJob,
  customJob,
  setCustomJob,
  onRunAnalysis,
  isLoading,
  canAnalyze,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const currentJob = customJob || jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const handleDescChange = (text: string) => {
    if (currentJob) {
      setCustomJob({
        ...currentJob,
        description: text,
      });
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col h-full shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-indigo-400" />
          <h2 className="font-semibold text-white">2. Target Job Profile</h2>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
        >
          <span>{isEditing ? "Done Editing" : "Edit Job Specs"}</span>
          {isEditing ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Preset Selector */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Select Role Profile</label>
        <select
          value={selectedJobId}
          onChange={(e) => {
            const found = jobs.find((j) => j.id === e.target.value);
            if (found) {
              setCustomJob(null);
              onSelectJob(found);
            }
          }}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title} • {j.company} ({j.experience_level})
            </option>
          ))}
        </select>
      </div>

      {/* Role Details Badges */}
      {currentJob && (
        <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 mb-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium">{currentJob.company}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
              {currentJob.experience_level}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-400" /> Core Skills:
            </span>
            {currentJob.required_skills.slice(0, 6).map((skill, i) => (
              <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                {skill}
              </span>
            ))}
            {currentJob.required_skills.length > 6 && (
              <span className="text-slate-500 text-[11px]">
                +{currentJob.required_skills.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Description view / edit */}
      <div className="flex-1 flex flex-col min-h-[140px]">
        {isEditing ? (
          <textarea
            value={currentJob?.description || ""}
            onChange={(e) => handleDescChange(e.target.value)}
            placeholder="Paste custom job description..."
            className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono resize-none leading-relaxed"
          />
        ) : (
          <div className="flex-1 bg-slate-950/40 border border-slate-800/60 rounded-xl p-3 text-xs text-slate-400 overflow-y-auto max-h-[160px] leading-relaxed select-none">
            {currentJob?.description || "No description provided."}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-4 mt-auto">
        <button
          onClick={onRunAnalysis}
          disabled={!canAnalyze || isLoading}
          className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 shadow-lg transition-all ${
            !canAnalyze || isLoading
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white hover:opacity-95 shadow-brand-500/20 active:scale-[0.99]"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Match & ATS Compliance...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Evaluate Match & Run ATS Audit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
