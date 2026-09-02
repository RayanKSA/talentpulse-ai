import React from "react";
import { SampleResume, JobPosting } from "../types";
import { Zap, User, Briefcase } from "lucide-react";
import { useLanguage } from "../LanguageContext";

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
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-6 backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Header */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-brand-400 font-medium text-xs">
          <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{t("quickProfiles")}</span>
        </div>

        {/* Candidate Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mx-1">
            <User className="w-3 h-3 text-slate-400" /> {t("profileLabel")}
          </span>
          {sampleResumes.map((cand) => (
            <button
              key={cand.id}
              onClick={() => onSelectCandidate(cand)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                selectedCandId === cand.id
                  ? "bg-brand-500/20 text-brand-300 border-brand-500/50 shadow-sm"
                  : "bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {cand.name} ({cand.years_experience}y exp)
            </button>
          ))}
        </div>

        {/* Popular Job Shortcut Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mx-1">
            <Briefcase className="w-3 h-3 text-slate-400" /> {t("targetRoleLabel")}
          </span>
          {jobs.slice(0, 5).map((job) => (
            <button
              key={job.id}
              onClick={() => onSelectJob(job)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                selectedJobId === job.id
                  ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-sm"
                  : "bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {job.title.split(" ")[0]} {job.title.split(" ")[1] || ""}
            </button>
          ))}
          {jobs.length > 5 && (
            <span className="text-[11px] text-slate-500 self-center px-1">
              +{jobs.length - 5} {t("moreInSelector")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
