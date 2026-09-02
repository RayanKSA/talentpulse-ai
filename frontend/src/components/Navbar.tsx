import React from "react";
import { Sparkles, Users, UserCheck, Code2, Briefcase } from "lucide-react";

interface NavbarProps {
  activeTab: "candidate" | "recruiter";
  setActiveTab: (tab: "candidate" | "recruiter") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">TalentPulse</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                Enterprise ATS Platform
              </span>
            </div>
            <p className="text-xs text-slate-400">Intelligent Resume Screening & Career Match Intelligence</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("candidate")}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "candidate"
                ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Candidate & ATS Match</span>
          </button>
          <button
            onClick={() => setActiveTab("recruiter")}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "recruiter"
                ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Recruiter Leaderboard</span>
          </button>
        </div>

        {/* Meta links */}
        <div className="hidden md:flex items-center space-x-3 text-xs text-slate-400">
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Live AI Matcher</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
