import React from "react";
import { Sparkles, Users, UserCheck, Code2, Globe, Scale, Wand2 } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export type NavTabType = "candidate" | "recruiter" | "compare" | "optimizer";

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { lang, toggleLang, t } = useLanguage();

  const navItems = [
    { id: "candidate", label: t("candidateView"), icon: UserCheck },
    { id: "recruiter", label: t("recruiterView"), icon: Users },
    { id: "compare", label: t("compareView"), icon: Scale },
    { id: "optimizer", label: t("optimizerView"), icon: Wand2 },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20 flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white block">{t("brandTitle")}</span>
            <p className="text-[11px] text-slate-400 hidden sm:block leading-tight">{t("brandTagline")}</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as NavTabType)}
                className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Language Toggle + Live Status + GitHub */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-slate-400">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLang}
            className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm font-medium"
            title="Toggle Arabic / English"
          >
            <Globe className="w-3.5 h-3.5 text-brand-400" />
            <span className="font-semibold text-xs">{lang === "en" ? "العربية" : "English"}</span>
          </button>

          <a
            href="https://github.com/RayanKSA"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
