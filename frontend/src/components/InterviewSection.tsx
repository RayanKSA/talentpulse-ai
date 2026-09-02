import React, { useState, useEffect } from "react";
import { InterviewQuestion } from "../types";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Target,
  Compass,
  Copy,
  Check,
  Volume2,
  Clock,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface InterviewSectionProps {
  questions: InterviewQuestion[];
}

export const InterviewSection: React.FC<InterviewSectionProps> = ({ questions }) => {
  const { lang, t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // STAR Practice Timer state (120 seconds default)
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [activeTimerQIdx, setActiveTimerQIdx] = useState<number | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleCopyQuestions = () => {
    const formatted = questions
      .map(
        (q, idx) =>
          `Q${idx + 1} (${q.category}${q.skill_targeted ? ` - ${q.skill_targeted}` : ""}):\n${q.question}\nRationale: ${q.rationale}\n`
      )
      .join("\n");
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playTTS = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "ar" ? "ar-SA" : "en-US";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleToggleTimer = (idx: number) => {
    if (activeTimerQIdx === idx && timerActive) {
      setTimerActive(false);
    } else {
      setActiveTimerQIdx(idx);
      setTimeLeft(120);
      setTimerActive(true);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <HelpCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <h3 className="font-semibold text-white">{t("interviewTitle")}</h3>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button
            onClick={handleCopyQuestions}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 rtl:space-x-reverse transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">{t("copied")}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>{t("copyQuestions")}</span>
              </>
            )}
          </button>
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 font-medium border border-purple-500/20">
            {questions.length} {t("probingQuestions")}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        {t("interviewSubtitle")}
      </p>

      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isExpanded = expandedIndex === idx;
          const isTimingThis = activeTimerQIdx === idx;

          return (
            <div
              key={idx}
              className="bg-slate-950/60 border border-slate-800/80 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full text-left rtl:text-right p-4 flex items-start justify-between gap-3 hover:bg-slate-900/40 transition"
              >
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
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
                  {/* Action Bar: TTS Audio + Practice Timer */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-b border-slate-800/60 pb-2.5">
                    <button
                      onClick={() => playTTS(q.question)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 rtl:space-x-reverse transition"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>{t("listenQuestion")}</span>
                    </button>

                    {/* Interactive Timer Controls */}
                    <div className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-mono text-xs font-semibold text-slate-200">
                        {isTimingThis ? formatTime(timeLeft) : "02:00"}
                      </span>
                      <button
                        onClick={() => handleToggleTimer(idx)}
                        className="text-[11px] text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10"
                      >
                        {isTimingThis && timerActive ? (
                          <>
                            <Pause className="w-3 h-3" />
                            <span>{t("pauseTimer")}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3" />
                            <span>{t("startTimer")}</span>
                          </>
                        )}
                      </button>
                      {isTimingThis && (
                        <button
                          onClick={() => {
                            setTimeLeft(120);
                            setTimerActive(false);
                          }}
                          className="text-slate-400 hover:text-white"
                          title="Reset"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Rationale */}
                  <div className="flex items-start space-x-2 rtl:space-x-reverse text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
                    <Compass className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-300 font-medium">{t("interviewerGoal")}</strong> {q.rationale}
                    </div>
                  </div>

                  {/* STAR Answer Rubric */}
                  {q.suggested_star_points && q.suggested_star_points.length > 0 && (
                    <div>
                      <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block mb-2">
                        {t("starFramework")}
                      </span>
                      <ul className="space-y-1.5 pl-2 rtl:pl-0 rtl:pr-2">
                        {q.suggested_star_points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start space-x-2 rtl:space-x-reverse text-slate-300">
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
