import React from "react";

interface ScoreGaugeProps {
  score: number;
  label: string;
  subtext?: string;
  size?: "sm" | "md" | "lg";
  colorOverride?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  label,
  subtext,
  size = "md",
  colorOverride,
}) => {
  // Determine color theme based on score if not overridden
  const getColor = () => {
    if (colorOverride) return colorOverride;
    if (score >= 80) return "text-emerald-400 stroke-emerald-500";
    if (score >= 65) return "text-blue-400 stroke-blue-500";
    if (score >= 50) return "text-amber-400 stroke-amber-500";
    return "text-rose-400 stroke-rose-500";
  };

  const getTrackColor = () => {
    return "stroke-slate-800";
  };

  const radius = size === "lg" ? 48 : size === "md" ? 38 : 28;
  const strokeWidth = size === "lg" ? 8 : size === "md" ? 6 : 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  const dimension = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center justify-center text-center p-3">
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={dimension}
          height={dimension}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            className={getTrackColor()}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            className={`${getColor()} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className={`font-bold tracking-tight text-white ${size === "lg" ? "text-2xl" : size === "md" ? "text-xl" : "text-sm"}`}>
            {score}%
          </span>
        </div>
      </div>

      <div className="mt-2">
        <p className="font-semibold text-xs text-slate-200">{label}</p>
        {subtext && <p className="text-[11px] text-slate-400 mt-0.5">{subtext}</p>}
      </div>
    </div>
  );
};
