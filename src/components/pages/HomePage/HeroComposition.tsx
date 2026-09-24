import React from "react";
import { IconCheckCircle, IconClock, IconFileText, IconLock, IconShieldCheck, StatusBadge } from "../../ui";


export function HeroComposition() {
  const documents = [
    {
      title: "Right to Work (Share Code)",
      authority: "Home Office Verification",
      ref: "REF: WD-2026-RTW",
      status: "complete" as const,
      statusLabel: "VERIFIED",
      detail: "Permanent clearance",
      icon: <IconShieldCheck size={16} className="text-emerald-600" />,
    },
    {
      title: "CSCS Skilled Worker Card",
      authority: "CITB Construction Skills",
      ref: "REF: WD-2026-CSC",
      status: "complete" as const,
      statusLabel: "VALID",
      detail: "Expires 14 Aug 2028",
      icon: <IconShieldCheck size={16} className="text-emerald-600" />,
    },
    {
      title: "First Aid at Work (EFAW)",
      authority: "HSE Approved Training",
      ref: "REF: WD-2026-FAW",
      status: "pending" as const,
      statusLabel: "RENEWAL DUE",
      detail: "Expires 24 May 2026",
      icon: <IconClock size={16} className="text-amber-500" />,
    },
    {
      title: "Enhanced DBS Disclosure",
      authority: "Disclosure & Barring Service",
      ref: "REF: WD-2026-DBS",
      status: "complete" as const,
      statusLabel: "VERIFIED",
      detail: "Update Service verified",
      icon: <IconCheckCircle size={16} className="text-emerald-600" />,
    },
  ];

  return (
    <div className="relative w-full max-w-lg lg:max-w-none">
      {/* Ambient background accent */}
      <div
        className="absolute -inset-2 bg-linear-to-tr from-blue-500/10 via-[#0052FF]/5 to-transparent rounded-2xl blur-xl -z-10"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_16px_40px_rgba(0,82,255,0.06)] overflow-hidden">
        {/* Top Worker Profile Bar */}
        <div className="bg-[#F8FAFC] px-5 py-4 border-b border-gray-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-mono font-bold text-xs text-[#0052FF]">
              LV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-gray-950 font-sans">
                  Liam Vance
                </span>
                <span className="font-mono text-[10px] text-gray-400 bg-white border border-gray-200 px-1.5 py-0.2 rounded">
                  WRK-8921
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-sans">
                Carpenter &amp; Joiner · Verified Profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
              WORK READY
            </span>
          </div>
        </div>

        {/* Readiness Metric Summary Bar */}
        <div className="px-5 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-semibold">
                DOCUMENT READINESS
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-gray-950 font-sans">
                  92%
                </span>
                <span className="text-xs text-gray-500">
                  · 4 of 5 verified for site clearance
                </span>
              </div>
            </div>

            {/* Security Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/70 border border-blue-100 text-[#0052FF] text-xs font-medium">
              <IconLock size={12} />
              <span className="text-[11px] font-mono">SECURITY || CONTROLLED</span>
            </div>
          </div>

          {/* Progress bar with ARIA accessibility */}
          <div
            className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden"
            role="progressbar"
            aria-valuenow={92}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Worker document readiness percentage"
          >
            <div
              className="bg-[#0052FF] h-full rounded-full transition-all duration-500"
              style={{ width: "92%" }}
            />
          </div>
        </div>

        {/* Stacked Document Rows */}
        <div className="p-4 sm:p-5 space-y-2.5 bg-white">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
              STORED DOCUMENTS
            </span>
            <span className="text-[11px] font-mono text-gray-400">
              AUDIT TRAIL READY
            </span>
          </div>

          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-gray-150 bg-[#FAFAFA] hover:border-blue-200 hover:bg-white transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-blue-200">
                  {doc.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs sm:text-sm font-semibold text-gray-950 truncate">
                      {doc.title}
                    </p>
                    <span className="hidden sm:inline-block font-mono text-[9px] text-gray-400">
                      {doc.ref}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate font-sans">
                    {doc.authority} · {doc.detail}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <StatusBadge
                  status={doc.status}
                  label={doc.statusLabel}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Footer */}
        <div className="px-5 py-3 bg-[#F8FAFC] border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1.5 font-medium text-gray-600">
            <IconFileText size={13} className="text-[#0052FF]" />
            <span>Digital Worker Records</span>
          </span>
          <span className="font-mono text-[11px] text-[#0052FF] font-semibold">
            One Profile · Instant Access
          </span>
        </div>
      </div>
    </div>
  );
}

