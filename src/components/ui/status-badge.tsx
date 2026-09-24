import React from "react";

export type ComplianceStatus = "complete" | "pending" | "missing" | "review" | "uploaded";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: ComplianceStatus;
  label?: string;
  size?: "sm" | "md";
}

const statusConfig: Record<
  ComplianceStatus,
  {
    defaultLabel: string;
    containerClass: string;
    pipClass: string;
    renderPip: () => React.ReactNode;
  }
> = {
  complete: {
    defaultLabel: "COMPLETE",
    containerClass: "bg-emerald-50/70 text-emerald-900 border-emerald-200/90",
    pipClass: "bg-emerald-600",
    renderPip: () => (
      <span className="relative flex h-2 w-2">
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
      </span>
    ),
  },
  pending: {
    defaultLabel: "PENDING",
    containerClass: "bg-amber-50/70 text-amber-900 border-amber-200/90",
    pipClass: "bg-amber-600",
    renderPip: () => (
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
      </span>
    ),
  },
  missing: {
    defaultLabel: "MISSING",
    containerClass: "bg-rose-50/70 text-rose-900 border-rose-200/90",
    pipClass: "bg-rose-600",
    renderPip: () => (
      <span className="inline-block h-1.5 w-1.5 rounded-[1px] bg-rose-600" />
    ),
  },
  review: {
    defaultLabel: "REVIEW REQUIRED",
    containerClass: "bg-indigo-50/70 text-indigo-900 border-indigo-200/90",
    pipClass: "bg-indigo-600",
    renderPip: () => (
      <span className="inline-block h-2 w-2 rotate-45 rounded-[1px] bg-indigo-600" />
    ),
  },
  uploaded: {
    defaultLabel: "UPLOADED",
    containerClass: "bg-sky-50/70 text-sky-900 border-sky-200/90",
    pipClass: "bg-sky-600",
    renderPip: () => (
      <span className="inline-block h-2 w-2 rounded-full border-[1.5px] border-sky-600" />
    ),
  },
};

export function StatusBadge({
  status,
  label,
  size = "md",
  className = "",
  ...props
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label || config.defaultLabel;

  const sizeClass =
    size === "sm"
      ? "text-[10px] px-2 py-0.5 gap-1.5 tracking-wider"
      : "text-[11px] px-2.5 py-1 gap-2 tracking-wider";

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-md border ${config.containerClass} ${sizeClass} select-none ${className}`}
      {...props}
    >
      {config.renderPip()}
      <span>{displayLabel}</span>
    </span>
  );
}

