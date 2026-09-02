import React, { useState } from "react";
import { Sparkles, ArrowRight, Copy, Check, Wand2, Lightbulb, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface PresetBullet {
  label: string;
  text: string;
  alternativesEn: string[];
  alternativesAr: string[];
}

const PRESET_BULLETS: PresetBullet[] = [
  {
    label: "Backend & API Performance",
    text: "Worked on the backend and made APIs faster with Python and caching.",
    alternativesEn: [
      "Architected high-throughput RESTful microservices in Python & FastAPI, reducing P99 latency by 45% through Redis caching and query optimization.",
      "Engineered distributed async API endpoints serving 2.5M+ daily requests, improving system response times from 340ms to 42ms.",
      "Spearheaded backend redesign using Python and connection pooling, boosting peak transaction capacity by 60% without infrastructure cost increases."
    ],
    alternativesAr: [
      "بناء وتصميم خدمات برمجية مصغرة (Microservices) فائقة السرعة باستخدام بايثون وFastAPI، مما أسهم في خفض زمن الاستجابة بنسبة 45% عبر التخزين المؤقت في Redis وتحسين الاستعلامات.",
      "تطوير نقاط اتصال API غير متزامنة تعالج أكثر من 2.5 مليون طلب يومياً، محققاً تسريعاً لزمن استجابة النظام من 340 إلى 42 ميلي ثانية.",
      "قيادة إعادة هيكلة الأنظمة الخلفية عبر تقنيات Connection Pooling، مما رفع الطاقة الاستيعابية للعمليات بنسبة 60% دون زيادة التكاليف السحابية."
    ]
  },
  {
    label: "Frontend & User Interface",
    text: "Created user interface components with React and fixed frontend bugs.",
    alternativesEn: [
      "Engineered 30+ reusable, accessible design components using React & TypeScript, accelerating frontend sprint velocity across 3 engineering pods by 35%.",
      "Revamped core customer checkout flow with React & Tailwind CSS, slashing page load times by 52% and boosting checkout conversions by 14%.",
      "Architected reactive state management layer with Redux Toolkit, eliminating 90% of redundant re-renders and resolving 40+ legacy UX regressions."
    ],
    alternativesAr: [
      "برمجة أكثر من 30 مكون واجهة مستخدم متوافق مع معايير الوصول العالمية باستخدام React وTypeScript، مما سرّع وتيرة إنجاز مهام الواجهات بنسبة 35% عبر 3 فرق تطوير.",
      "تطوير مسار الدفع الرئيسي للمستخدمين بواسطة React وTailwind CSS، محققاً تقليصاً لزمن تحميل الصفحة بنسبة 52% وزيادة معدل إتمام العمليات بنسبة 14%.",
      "تصميم معمارية إدارة الحالة بواسطة Redux Toolkit، مما أزال 90% من عمليات إعادة الرسم الزائدة وقضى على أكثر من 40 مشكلة برمجية سابقة."
    ]
  },
  {
    label: "DevOps & CI/CD Pipeline",
    text: "Helped deploy code and set up Docker containers for the team.",
    alternativesEn: [
      "Orchestrated automated multi-stage CI/CD pipelines via GitHub Actions & Docker, reducing deployment cycle times from 45 minutes to under 6 minutes.",
      "Containerized 15+ production microservices with Docker & Kubernetes, achieving 99.98% platform uptime and eliminating environment drift across teams.",
      "Implemented automated vulnerability scanning (Trivy) and zero-downtime rolling deploys, achieving zero rollbacks across 120+ consecutive releases."
    ],
    alternativesAr: [
      "أتمتة خطوط التكامل والنشر المستمر (CI/CD) بالكامل باستخدام GitHub Actions وDocker، مما قلص مدة نشر التحديثات من 45 دقيقة إلى أقل من 6 دقائق.",
      "حزم ونشر أكثر من 15 خدمة مصغرة في بيئات إنتاجية باستخدام Docker وKubernetes، محققاً استقراراً للخدمة بنسبة 99.98% وتطابقاً تاماً بين بيئات العمل.",
      "تطبيق الفحص الأمني التلقائي للثغرات البرمجية والتحديث التدريجي بدون انقطاع، محققاً أكثر من 120 عملية إطلاق متتالية دون الحاجة لأي تراجع طارئ."
    ]
  },
  {
    label: "Database & Query Optimization",
    text: "Wrote SQL queries and worked on database tables in PostgreSQL.",
    alternativesEn: [
      "Optimized complex PostgreSQL queries and designed targeted composite B-tree indexes, shrinking average query execution time from 4.2s to 180ms.",
      "Architected relational schema migrations and data partitioning for 10M+ transaction records, unlocking 4x throughput scaling under peak loads.",
      "Automated database backup snapshots and zero-data-loss failover procedures, achieving an RPO under 1 minute and RTO under 5 minutes."
    ],
    alternativesAr: [
      "تحسين استعلامات PostgreSQL المعقدة وهندسة فهارس B-Tree متعددة الأعمدة، مما خفض متوسط زمن تنفيذ الاستعلامات من 4.2 ثانية إلى 180 ميلي ثانية.",
      "تصميم هيكلة الجداول وترحيل البيانات وتجزئة السجلات لأكثر من 10 ملايين عملية، مما رفع قدرة استيعاب الأحمال الذروية بمقدار 4 أضعاف.",
      "أتمتة النسخ الاحتياطي اللحظي وإجراءات استعادة الخدمة عند الطوارئ، محققاً استعادة كاملة للبيانات بزمن RPO أقل من دقيقة وRTO أقل من 5 دقائق."
    ]
  }
];

export const BulletOptimizer: React.FC = () => {
  const { lang, t } = useLanguage();
  const [inputText, setInputText] = useState(PRESET_BULLETS[0].text);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>(
    lang === "ar" ? PRESET_BULLETS[0].alternativesAr : PRESET_BULLETS[0].alternativesEn
  );

  const handleSelectPreset = (preset: PresetBullet) => {
    setInputText(preset.text);
    setSuggestions(lang === "ar" ? preset.alternativesAr : preset.alternativesEn);
  };

  const handleOptimize = () => {
    if (!inputText.trim()) return;

    // Smart heuristic generator applying Google XYZ formula
    const lower = inputText.toLowerCase();
    const isAr = lang === "ar";

    if (isAr) {
      setSuggestions([
        `إعادة هيكلة وتطوير الأنظمة بنجاح محققاً تحسناً في الأداء بنسبة 40%، من خلال أتمتة الإجراءات وتطبيق أفضل المعايير الهندسية (${inputText.trim().slice(0, 40)}...).`,
        `قيادة تطبيق حلول تقنية متقدمة خفضت وقت المعالجة من عدة دقائق إلى ثوانٍ معدودة، عبر دمج التقنيات الحديثة وإزالة الاختناقات البرمجية.`,
        `تصميم وتنفيذ بنية برمجية قوية رفعت موثوقية العمليات لنسبة 99.9%، من خلال كتابة اختبارات شاملة وإعادة كتابة الأجزاء الحيوية.`
      ]);
    } else {
      let verb1 = "Architected & deployed";
      let verb2 = "Engineered scalable";
      let verb3 = "Spearheaded end-to-end overhaul of";

      if (lower.includes("test") || lower.includes("qa") || lower.includes("bug")) {
        verb1 = "Automated test suites and QA pipelines for";
        verb2 = "Engineered regression testing frameworks for";
        verb3 = "Revamped defect prevention workflows across";
      } else if (lower.includes("data") || lower.includes("sql") || lower.includes("pipeline")) {
        verb1 = "Architected high-throughput data processing workflows for";
        verb2 = "Engineered reliable streaming and analytics pipelines for";
        verb3 = "Optimized complex query execution and data modeling for";
      }

      setSuggestions([
        `${verb1} solutions for "${inputText.trim()}", driving a 45% increase in operational throughput and eliminating production bottlenecks.`,
        `${verb2} systems, reducing P99 latency by 38% and saving 15+ engineering hours per sprint through automated tooling.`,
        `${verb3} core infrastructure, achieving 99.95% service reliability while processing over 1.2M daily events with zero data loss.`
      ]);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 flex-shrink-0">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{t("optimizerTitle")}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{t("optimizerSubtitle")}</p>
          </div>
        </div>

        {/* Formula Explanation Pill */}
        <div className="mt-4 bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center space-x-3 rtl:space-x-reverse text-xs text-slate-300">
          <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong className="text-purple-300 font-semibold">
              {lang === "ar" ? "معادلة جوجل القياسية (XYZ):" : "Google XYZ Standard Formula:"}
            </strong>{" "}
            {lang === "ar"
              ? "«حقق [الإنجاز والمشروع] مقاساً بـ [النسبة أو الرقم المحدد] من خلال تنفيذ [التقنية والإجراء الهندسي]»"
              : "“Accomplished [X], as measured by [Y], by doing [Z]”"}
          </span>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            {t("inputBulletLabel")}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t("bulletPlaceholder")}
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-mono leading-relaxed"
          />
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-[11px] font-medium text-slate-400 block mb-2">
            {t("presetExamples")}
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_BULLETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optimize Button */}
        <button
          onClick={handleOptimize}
          disabled={!inputText.trim()}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-md shadow-purple-600/20 transition"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{t("generateOptimized")}</span>
        </button>
      </div>

      {/* Output / Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t("optimizedSuggestions")}</span>
          </h3>

          <div className="space-y-3">
            {suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-4.5 transition-all shadow-md flex items-start justify-between gap-4"
              >
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans select-all">
                    {suggestion}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(suggestion, idx)}
                  className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex-shrink-0 transition"
                >
                  {copiedIdx === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{t("copied")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t("copyBullet")}</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
