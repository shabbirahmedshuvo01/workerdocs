import React from "react";

export interface StatCardProps {
  label: string;
  value: string | number;
  indicator?: "success" | "warning" | "error" | "neutral" | "accent";
  helperText?: string;
  tag?: string;
  progressPercent?: number;
  className?: string;
}

export function StatCard({
  label,
  value,
  indicator = "neutral",
  helperText,
  tag,
  progressPercent,
  className = "",
}: StatCardProps) {
  const indicatorColors = {
    neutral: "bg-zinc-400",
    accent: "bg-blue-600",
    success: "bg-emerald-600",
    warning: "bg-amber-500",
    error: "bg-rose-500",
  };

  return (
    <div
      className={`bg-white border border-zinc-200 rounded-lg p-5 relative tech-crosshair-container tech-crosshair-tr ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono">
          {label}
        </span>
        {tag && (
          <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded border border-zinc-200/60">
            {tag}
          </span>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 font-sans">
          {value}
        </span>
        <span
          className={`inline-block h-2 w-2 rounded-full ${indicatorColors[indicator]}`}
          aria-hidden="true"
        />
      </div>

      {progressPercent !== undefined && (
        <div
          className="mt-3.5 w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.min(100, Math.max(0, progressPercent))}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label} progress`}
        >
          <div
            className={`h-full transition-all duration-300 ${indicator === "success"
                ? "bg-emerald-600"
                : indicator === "warning"
                  ? "bg-amber-500"
                  : indicator === "error"
                    ? "bg-rose-500"
                    : "bg-zinc-900"
              }`}
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
      )}

      {helperText && (
        <p className="mt-2.5 text-xs text-zinc-500 leading-normal">
          {helperText}
        </p>
      )}
    </div>
  );
}

