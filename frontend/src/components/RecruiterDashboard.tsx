import React, { useState, useEffect } from "react";
import { JobPosting, RecruiterCandidate } from "../types";
import { rankCandidates } from "../api";
import { Users, Briefcase, ArrowUpDown, Search, Download } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface RecruiterDashboardProps {
  jobs: JobPosting[];
  selectedJobId: string;
  onSelectJob: (job: JobPosting) => void;
  onInspectCandidate: (candidateId: string) => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({
  jobs,
  selectedJobId,
  onSelectJob,
  onInspectCandidate,
}) => {
  const { lang, t } = useLanguage();
  const [leaderboard, setLeaderboard] = useState<RecruiterCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"overall" | "skills" | "ats">("overall");

  const currentJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  useEffect(() => {
    if (currentJob) {
      loadLeaderboard(currentJob.id);
    }
  }, [selectedJobId]);

  const loadLeaderboard = async (jobId?: string) => {
    setIsLoading(true);
    try {
      const data = await rankCandidates(jobId);
      setLeaderboard(data.leaderboard);
    } catch (err) {
      console.error("Failed to load recruiter leaderboard", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCandidates = leaderboard
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.matched_skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "skills") return b.skills_score - a.skills_score;
      if (sortBy === "ats") return b.ats_score - a.ats_score;
      return b.overall_score - a.overall_score;
    });

  const exportCSV = () => {
    const headers = "Rank,Name,Title,Experience (Yrs),Overall Match (%),Skills Score (%),ATS Score (%),Verdict\n";
    const rows = filteredCandidates
      .map(
        (c, idx) =>
          `${idx + 1},"${c.name}","${c.title}",${c.years_experience},${c.overall_score},${c.skills_score},${c.ats_score},"${c.fit_verdict}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `candidate_rankings_${currentJob?.title.replace(/\s+/g, "_") || "job"}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Users className="w-5 h-5 text-brand-400 flex-shrink-0" />
            <h2 className="text-lg font-bold text-white">{t("recruiterDashboardTitle")}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t("recruiterDashboardSub")}
          </p>
        </div>

        {/* Target Job Selector & Export */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={selectedJobId}
              onChange={(e) => {
                const found = jobs.find((j) => j.id === e.target.value);
                if (found) onSelectJob(found);
              }}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id} className="bg-slate-900 text-slate-200">
                  {j.title} ({j.company})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t("exportCsv")}</span>
          </button>
        </div>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 rtl:left-auto rtl:right-3 top-2.5" />
          <input
            type="text"
            placeholder={t("searchCandidateOrSkill")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-slate-400 w-full sm:w-auto justify-end">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>{t("sortBy")}</span>
          <button
            onClick={() => setSortBy("overall")}
            className={`px-2.5 py-1 rounded-lg border transition ${
              sortBy === "overall"
                ? "bg-brand-500/20 text-brand-300 border-brand-500/40 font-medium"
                : "bg-slate-900 border-slate-800 hover:text-white"
            }`}
          >
            {t("sortOverall")}
          </button>
          <button
            onClick={() => setSortBy("skills")}
            className={`px-2.5 py-1 rounded-lg border transition ${
              sortBy === "skills"
                ? "bg-brand-500/20 text-brand-300 border-brand-500/40 font-medium"
                : "bg-slate-900 border-slate-800 hover:text-white"
            }`}
          >
            {t("sortSkills")}
          </button>
          <button
            onClick={() => setSortBy("ats")}
            className={`px-2.5 py-1 rounded-lg border transition ${
              sortBy === "ats"
                ? "bg-brand-500/20 text-brand-300 border-brand-500/40 font-medium"
                : "bg-slate-900 border-slate-800 hover:text-white"
            }`}
          >
            {t("sortAts")}
          </button>
        </div>
      </div>

      {/* Candidate Leaderboard Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
            <p className="text-xs">Computing multi-candidate skill matrix...</p>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            {t("noCandidatesFound")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs text-slate-300">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">{t("colRank")}</th>
                  <th className="py-3.5 px-4">{t("colCandidate")}</th>
                  <th className="py-3.5 px-4 text-center">{t("colExp")}</th>
                  <th className="py-3.5 px-4 text-center">{t("colFit")}</th>
                  <th className="py-3.5 px-4 text-center">{t("colSkillsScore")}</th>
                  <th className="py-3.5 px-4 text-center">{t("colAtsAudit")}</th>
                  <th className="py-3.5 px-4">{t("colCompetencies")}</th>
                  <th className="py-3.5 px-4 text-right rtl:text-left">{t("colAction")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCandidates.map((cand, idx) => {
                  const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}`;
                  return (
                    <tr key={cand.candidate_id} className="hover:bg-slate-800/30 transition">
                      <td className="py-4 px-4 text-center font-bold text-sm text-slate-200">
                        {medal}
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-white text-sm">{cand.name}</div>
                        <div className="text-slate-400 text-[11px]">{cand.title}</div>
                        <div className="text-slate-500 text-[10px]">{cand.email}</div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                          {cand.years_experience} {lang === "ar" ? "سنوات" : "yrs"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span
                            className={`font-bold text-base ${
                              cand.overall_score >= 80
                                ? "text-emerald-400"
                                : cand.overall_score >= 65
                                ? "text-blue-400"
                                : cand.overall_score >= 50
                                ? "text-amber-400"
                                : "text-rose-400"
                            }`}
                          >
                            {cand.overall_score}%
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {cand.fit_verdict}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span className="font-semibold text-slate-200">{cand.skills_score}%</span>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span className="font-semibold text-slate-200">{cand.ats_score}/100</span>
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <div className="space-y-1">
                          {/* Matched */}
                          <div className="flex flex-wrap gap-1">
                            {cand.matched_skills.slice(0, 3).map((s, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px]"
                              >
                                {s}
                              </span>
                            ))}
                            {cand.matched_skills.length > 3 && (
                              <span className="text-[10px] text-slate-500 self-center">
                                +{cand.matched_skills.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Missing */}
                          {cand.missing_required_skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {cand.missing_required_skills.slice(0, 2).map((s, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px]"
                                >
                                  {lang === "ar" ? `فجوة: ${s}` : `Gap: ${s}`}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-right rtl:text-left">
                        <button
                          onClick={() => onInspectCandidate(cand.candidate_id)}
                          className="px-3 py-1.5 rounded-lg bg-brand-600/20 text-brand-300 hover:bg-brand-600 hover:text-white border border-brand-500/30 text-xs font-medium transition"
                        >
                          {t("deepMatchBtn")}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
