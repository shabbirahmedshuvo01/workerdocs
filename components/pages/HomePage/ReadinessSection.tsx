import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  IconShieldCheck,
  IconClock,
  IconCheckCircle,
  IconAlertTriangle,
  IconFileText,
} from "@/components/ui/icons";

export function ReadinessSection() {
  const readinessItems = [
    {
      name: "RIGHT TO WORK",
      detail: "Home Office Share Code verified",
      status: "complete" as const,
      statusLabel: "VERIFIED",
      icon: <IconShieldCheck size={16} className="text-emerald-600" />,
    },
    {
      name: "CSCS CARD",
      detail: "Smart Check renewal notice active",
      status: "pending" as const,
      statusLabel: "RENEWAL DUE",
      icon: <IconClock size={16} className="text-amber-500" />,
    },
    {
      name: "DBS CERTIFICATE",
      detail: "Standard disclosure on file",
      status: "uploaded" as const,
      statusLabel: "UPLOADED",
      icon: <IconCheckCircle size={16} className="text-sky-600" />,
    },
    {
      name: "PASSPORT",
      detail: "Government photo ID confirmed",
      status: "complete" as const,
      statusLabel: "VERIFIED",
      icon: <IconShieldCheck size={16} className="text-emerald-600" />,
    },
    {
      name: "PROOF OF ADDRESS",
      detail: "Recent statement required for induction",
      status: "missing" as const,
      statusLabel: "REQUIRED",
      icon: <IconAlertTriangle size={16} className="text-rose-600" />,
    },
  ];

  return (
    <section id="readiness" className="py-20 sm:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0052FF] font-mono">
              WORK READINESS
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 font-sans leading-tight">
              Know what&apos;s ready before you step on site.
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              WorkerDocs provides clear visibility into your compliance records.
              See at a glance which documents are verified, what is awaiting
              renewal, and what is missing before you arrive at your next
              placement.
            </p>

            {/* Benefit bullets */}
            <div className="space-y-3 pt-2 text-sm text-gray-700 font-medium">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                <span>Immediate status clarity on every uploaded document</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
                <span>Advance notice on card renewals and certificate expiries</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#0052FF]" aria-hidden="true" />
                <span>Less time handling repeated onboarding paperwork</span>
              </div>
            </div>

            <div className="pt-3">
              <Button variant="accent" size="lg" asChild className="font-bold tracking-wide">
                <Link href="#how-it-works">Create Your Profile</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Polished Readiness Panel Mockup */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_16px_40px_rgba(0,0,0,0.06)] overflow-hidden">
              {/* Header */}
              <div className="bg-[#F8FAFC] p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
                    DOCUMENT READINESS
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl font-extrabold text-gray-950 font-sans">
                      80%
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      4 / 5 DOCUMENTS READY
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
                  ACTIVE
                </div>
              </div>

              {/* Progress Bar with accessibility */}
              <div
                className="w-full bg-gray-100 h-1.5 overflow-hidden"
                role="progressbar"
                aria-valuenow={80}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Document readiness percentage"
              >
                <div
                  className="bg-[#0052FF] h-full transition-all duration-500"
                  style={{ width: "80%" }}
                />
              </div>

              {/* Checklist Items */}
              <div className="p-5 sm:p-6 space-y-3 bg-white">
                {readinessItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-gray-150 bg-[#FAFAFA] flex items-center justify-between gap-3 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded bg-white border border-gray-200 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-gray-950 truncate font-sans">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate font-sans">
                          {item.detail}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <StatusBadge
                        status={item.status}
                        label={item.statusLabel}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <IconFileText size={13} className="text-[#0052FF]" />
                  <span>Verified WorkerDocs Profile</span>
                </span>
                <span className="font-mono text-[11px] text-gray-400">
                  REF: WD-READINESS-2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

