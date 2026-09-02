import React, { useState } from "react";
import { MatchAnalysisResult } from "../types";
import { DollarSign, TrendingUp, Award, CheckCircle } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface SalaryBenchmarkProps {
  analysisResult: MatchAnalysisResult;
}

export const SalaryBenchmark: React.FC<SalaryBenchmarkProps> = ({ analysisResult }) => {
  const { lang, t } = useLanguage();
  const [currency, setCurrency] = useState<"USD" | "SAR">("USD");

  const rate = currency === "SAR" ? 3.75 : 1;
  const currSymbol = currency === "SAR" ? "ر.س" : "$";

  // Base estimation algorithm based on score, seniority, and skills
  const matchedCount = analysisResult.skill_breakdown.matched_skills.length;
  const isSenior = analysisResult.job_title.toLowerCase().includes("senior") || analysisResult.job_title.toLowerCase().includes("lead");

  let baseUsd = isSenior ? 140000 : 95000;
  baseUsd += Math.min(35000, matchedCount * 4500);
  baseUsd += Math.round((analysisResult.overall_score / 100) * 15000);

  const p25 = Math.round((baseUsd * 0.85 * rate) / 1000) * 1000;
  const p50 = Math.round((baseUsd * rate) / 1000) * 1000;
  const p75 = Math.round((baseUsd * 1.18 * rate) / 1000) * 1000;
  const p90 = Math.round((baseUsd * 1.35 * rate) / 1000) * 1000;

  // Premium skills detection
  const premiums: { skill: string; boost: string }[] = [];
  const skillsList = analysisResult.skill_breakdown.matched_skills;

  if (skillsList.includes("Kubernetes") || skillsList.includes("Distributed Systems")) {
    premiums.push({ skill: "Kubernetes & Orchestration", boost: "+15% premium" });
  }
  if (skillsList.includes("PyTorch") || skillsList.includes("NLP") || skillsList.includes("Machine Learning")) {
    premiums.push({ skill: "Applied AI & PyTorch", boost: "+18% premium" });
  }
  if (skillsList.includes("Application Security") || skillsList.includes("OWASP")) {
    premiums.push({ skill: "DevSecOps & Application Security", boost: "+14% premium" });
  }
  if (skillsList.includes("Snowflake") || skillsList.includes("Apache Spark")) {
    premiums.push({ skill: "Big Data & Distributed Pipelines", boost: "+12% premium" });
  }
  if (skillsList.includes("FastAPI") || skillsList.includes("React Native")) {
    premiums.push({ skill: "Modern Microservices Architecture", boost: "+10% premium" });
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white">{t("salaryTitle")}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{t("salarySubtitle")}</p>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
          <button
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1 rounded-lg transition font-medium ${
              currency === "USD" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            {t("currencyUsd")}
          </button>
          <button
            onClick={() => setCurrency("SAR")}
            className={`px-3 py-1 rounded-lg transition font-medium ${
              currency === "SAR" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            {t("currencySar")}
          </button>
        </div>
      </div>

      {/* Primary Percentile Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
          <span className="text-[10px] text-slate-400 block mb-1">25th Percentile</span>
          <strong className="text-base font-bold text-slate-300">
            {currSymbol} {p25.toLocaleString()}
          </strong>
        </div>

        <div className="bg-emerald-950/20 rounded-xl p-3 border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 font-semibold block mb-1">
            {t("medianMarket")}
          </span>
          <strong className="text-lg font-bold text-emerald-400">
            {currSymbol} {p50.toLocaleString()}
          </strong>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
          <span className="text-[10px] text-slate-400 block mb-1">75th Percentile</span>
          <strong className="text-base font-bold text-slate-300">
            {currSymbol} {p75.toLocaleString()}
          </strong>
        </div>

        <div className="bg-indigo-950/20 rounded-xl p-3 border border-indigo-500/30">
          <span className="text-[10px] text-indigo-400 font-semibold block mb-1">
            {t("topPercentile")}
          </span>
          <strong className="text-lg font-bold text-indigo-300">
            {currSymbol} {p90.toLocaleString()}
          </strong>
        </div>
      </div>

      {/* Visual Range Distribution Bar */}
      <div className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/60 space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>{currSymbol} {p25.toLocaleString()}</span>
          <span className="text-emerald-400 font-bold">{t("estimatedRange")}</span>
          <span>{currSymbol} {p90.toLocaleString()}</span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
          <div className="w-[30%] bg-slate-600/50" />
          <div className="w-[45%] bg-gradient-to-r from-emerald-500 to-teal-400" />
          <div className="w-[25%] bg-indigo-500" />
        </div>
      </div>

      {/* Skill Premiums */}
      {premiums.length > 0 && (
        <div>
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-semibold text-slate-300 mb-2">
            <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{t("topSkillPremiums")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {premiums.map((p, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center space-x-1.5 rtl:space-x-reverse"
              >
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>{p.skill}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-semibold">
                  {p.boost}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
