import React from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { IconShieldCheck } from "@/components/ui/icons";

export interface ReadinessBannerProps {
  score?: number;
  verifiedCount?: number;
  totalCount?: number;
  className?: string;
}

export function ReadinessBanner({
  score = 92,
  verifiedCount = 4,
  totalCount = 5,
  className = "",
}: ReadinessBannerProps) {
  const clampedScore = Math.min(100, Math.max(0, score));

  return (
    <section
      aria-labelledby="readiness-heading"
      className={`bg-white border border-zinc-200 rounded-lg p-5 sm:p-6 relative tech-crosshair-container tech-crosshair-tr ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Readiness Info */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              id="readiness-heading"
              className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500"
            >
              Profile Readiness Overview
            </span>
            <StatusBadge status="complete" label="WORK READY" size="sm" />
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-sans tracking-tight">
              {clampedScore}%
            </span>
            <span className="text-xs sm:text-sm font-medium text-zinc-600">
              {verifiedCount} of {totalCount} required documents verified in compliance profile
            </span>
          </div>

          <p className="text-xs text-zinc-500 max-w-2xl leading-relaxed">
            Your profile meets active site readiness standards. Review outstanding document requirements below to maintain uninterrupted compliance.
          </p>
        </div>

        {/* Status Capsule Indicator */}
        <div className="shrink-0 flex items-center gap-2 self-start md:self-center px-3 py-2 bg-emerald-50/70 border border-emerald-200/80 rounded-md text-emerald-900 text-xs font-mono">
          <IconShieldCheck size={16} className="text-emerald-600 shrink-0" />
          <span className="font-semibold">CLEARANCE ACTIVE</span>
        </div>
      </div>

      {/* Accessible Progress Bar */}
      <div className="mt-5 space-y-1.5">
        <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500">
          <span>COMPLIANCE PROGRESS</span>
          <span className="font-semibold text-zinc-700">{clampedScore} / 100</span>
        </div>
        <div
          className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={clampedScore}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Profile compliance readiness score"
        >
          <div
            className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
            style={{ width: `${clampedScore}%` }}
          />
        </div>
      </div>
    </section>
  );
}

