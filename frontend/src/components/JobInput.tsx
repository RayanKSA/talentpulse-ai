import React, { useState, useMemo } from "react";
import { JobPosting } from "../types";
import { Briefcase, Sparkles, Building2, Layers, Search, PlusCircle, RotateCcw, Check } from "lucide-react";
import { useLanguage } from "../LanguageContext";

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
  const { t } = useLanguage();
  const [activeDept, setActiveDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Custom job form state
  const [customTitle, setCustomTitle] = useState("");
  const [customCompany, setCustomCompany] = useState("");
  const [customExpLevel, setCustomExpLevel] = useState("Mid-Level");
  const [customDescription, setCustomDescription] = useState("");

  // Extract unique departments
  const departments = useMemo(() => {
    const depts = new Set<string>();
    jobs.forEach((j) => {
      if (j.department) depts.add(j.department);
    });
    return ["All", ...Array.from(depts)];
  }, [jobs]);

  const getDeptLabel = (dept: string): string => {
    switch (dept) {
      case "All": return t("allDepts");
      case "Engineering": return t("deptEngineering");
      case "Data & AI": return t("deptDataAI");
      case "Cloud & DevOps": return t("deptCloudDevOps");
      case "Mobile": return t("deptMobile");
      case "Security": return t("deptSecurity");
      case "Frontend": return t("deptFrontend");
      case "Product": return t("deptProduct");
      default: return dept;
    }
  };

  // Filter jobs by department and search query
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesDept = activeDept === "All" || job.department === activeDept;
      const matchesQuery =
        searchQuery.trim() === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.company && job.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.required_skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDept && matchesQuery;
    });
  }, [jobs, activeDept, searchQuery]);

  const currentJob = customJob || jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const handleApplyCustomJob = () => {
    if (!customTitle.trim() || !customDescription.trim()) return;
    const newJob: JobPosting = {
      id: "custom-job",
      title: customTitle.trim(),
      company: customCompany.trim() || "Custom Organization",
      department: "Custom",
      experience_level: customExpLevel,
      required_skills: [],
      preferred_skills: [],
      description: customDescription.trim(),
    };
    setCustomJob(newJob);
    setIsCustomMode(false);
  };

  const handleResetToPreset = () => {
    setCustomJob(null);
    setIsCustomMode(false);
    if (jobs.length > 0) {
      onSelectJob(jobs[0]);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col h-full shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Briefcase className="w-5 h-5 text-indigo-400 flex-shrink-0" />
          <h2 className="font-semibold text-white">{t("jobTitle")}</h2>
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {customJob ? (
            <button
              onClick={handleResetToPreset}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t("resetPresetsButton")}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsCustomMode(!isCustomMode)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isCustomMode ? t("viewCatalogButton") : t("customJobButton")}</span>
            </button>
          )}
        </div>
      </div>

      {isCustomMode ? (
        /* Custom Job Creation Mode */
        <div className="flex-1 flex flex-col space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">{t("customJobTitle")}</label>
              <input
                type="text"
                placeholder="e.g. Senior Security Architect"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">{t("customCompany")}</label>
              <input
                type="text"
                placeholder="e.g. Enterprise Corp"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">{t("customSeniority")}</label>
            <select
              value={customExpLevel}
              onChange={(e) => setCustomExpLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Entry / Junior">Entry / Junior (0-2 years)</option>
              <option value="Mid-Level">Mid-Level (2-5 years)</option>
              <option value="Senior">Senior (5+ years)</option>
              <option value="Lead / Staff">Lead / Staff (8+ years)</option>
            </select>
          </div>

          <div className="flex-1 flex flex-col min-h-[120px]">
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              {t("customDesc")}
            </label>
            <textarea
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder="Paste custom job description, responsibilities, and required qualifications..."
              className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono resize-none leading-relaxed"
            />
          </div>

          <button
            onClick={handleApplyCustomJob}
            disabled={!customTitle.trim() || !customDescription.trim()}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 rtl:space-x-reverse transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{t("applyCustomJob")}</span>
          </button>
        </div>
      ) : (
        /* Predefined Catalog Mode */
        <div className="flex-1 flex flex-col space-y-3">
          {/* Department Filter Pills */}
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse overflow-x-auto pb-1 text-xs">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition text-[11px] ${
                  activeDept === dept
                    ? "bg-indigo-600 text-white font-medium shadow-sm"
                    : "bg-slate-950/70 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
              >
                {getDeptLabel(dept)}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 rtl:left-auto rtl:right-3 top-2.5" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 rtl:pl-3 rtl:pr-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Role Dropdown */}
          <select
            value={customJob ? "custom" : selectedJobId}
            onChange={(e) => {
              if (e.target.value === "custom") return;
              const found = jobs.find((j) => j.id === e.target.value);
              if (found) {
                setCustomJob(null);
                onSelectJob(found);
              }
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {customJob && <option value="custom">Custom: {customJob.title}</option>}
            {filteredJobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title} • {j.company} ({j.experience_level})
              </option>
            ))}
          </select>

          {/* Active Job Details Card */}
          {currentJob && (
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-200">{currentJob.company}</span>
                </div>
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-medium">
                    {getDeptLabel(currentJob.department || "")}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-medium">
                    {currentJob.experience_level}
                  </span>
                </div>
              </div>

              {currentJob.required_skills.length > 0 && (
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Layers className="w-3 h-3 text-slate-400" /> {t("coreSkills")}
                  </span>
                  {currentJob.required_skills.slice(0, 6).map((skill, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {skill}
                    </span>
                  ))}
                  {currentJob.required_skills.length > 6 && (
                    <span className="text-slate-500 text-[10px]">
                      +{currentJob.required_skills.length - 6} {t("moreSkills")}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Description snippet */}
          <div className="flex-1 bg-slate-950/40 border border-slate-800/60 rounded-xl p-3 text-xs text-slate-400 overflow-y-auto max-h-[140px] leading-relaxed select-none">
            {currentJob?.description || t("noDesc")}
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="pt-4 mt-auto">
        <button
          onClick={onRunAnalysis}
          disabled={!canAnalyze || isLoading}
          className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-lg transition-all ${
            !canAnalyze || isLoading
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white hover:opacity-95 shadow-brand-500/20 active:scale-[0.99]"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{t("evaluatingButton")}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t("evaluateButton")}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
