import React from "react";
import { SampleResume, JobPosting } from "../types";
import { Zap, User, Briefcase } from "lucide-react";

interface SampleBarProps {
  sampleResumes: SampleResume[];
  jobs: JobPosting[];
  selectedCandId: string;
  selectedJobId: string;
  onSelectCandidate: (cand: SampleResume) => void;
  onSelectJob: (job: JobPosting) => void;
}

export const SampleBar: React.FC<SampleBarProps> = ({
  sampleResumes,
  jobs,
  selectedCandId,
  selectedJobId,
  onSelectCandidate,
  onSelectJob,
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-6 backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Header */}
        <div className="flex items-center space-x-2 text-brand-400 font-medium text-sm">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Quick Demo Profiles (1-Click HR Evaluation):</span>
        </div>

        {/* Candidate Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <User className="w-3 h-3 text-slate-400" /> Candidate:
          </span>
          {sampleResumes.map((cand) => (
            <button
              key={cand.id}
              onClick={() => onSelectCandidate(cand)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                selectedCandId === cand.id
                  ? "bg-brand-500/20 text-brand-300 border-brand-500/50 shadow-sm"
                  : "bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {cand.name} ({cand.years_experience}y exp)
            </button>
          ))}
        </div>

        {/* Job Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-slate-400" /> Target Job:
          </span>
          {jobs.map((job) => (
            <button
              key={job.id}
              onClick={() => onSelectJob(job)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                selectedJobId === job.id
                  ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-sm"
                  : "bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {job.title.split(" ")[0]} {job.title.split(" ")[1] || ""}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
