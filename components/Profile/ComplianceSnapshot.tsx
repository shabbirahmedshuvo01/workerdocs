"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconShieldCheck, IconUpload, IconArrowUpRight } from "@/components/ui/icons";

export interface ComplianceSnapshotProps {
  onUploadDoc: () => void;
}

export default function ComplianceSnapshot({ onUploadDoc }: ComplianceSnapshotProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
            <IconShieldCheck size={16} />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-zinc-950 font-sans">
              Compliance &amp; Readiness Status
            </h2>
            <p className="text-xs text-zinc-500 font-sans">
              Live audit readiness across all compliance categories.
            </p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold font-mono uppercase tracking-wide text-emerald-700 border border-emerald-200/80">
          TIER 1 CLEARED
        </span>
      </div>

      {/* Big score meter */}
      <div className="rounded-xl border border-zinc-100 bg-zinc-50/70 p-4 mb-5">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
              Passport Readiness Meter
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-sans">
                92%
              </span>
              <span className="text-xs font-semibold text-emerald-700 font-sans">
                Audit-Ready for Site Dispatch
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-500 font-medium">
            9 of 12 verified
          </span>
        </div>

        {/* Progress Bar */}
        <div
          className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-zinc-200"
          role="progressbar"
          aria-valuenow={92}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Worker compliance readiness percentage"
        >
          <div
            className="h-full rounded-full bg-[#0052FF] transition-all duration-300"
            style={{ width: "92%" }}
          />
        </div>
      </div>

      {/* 4 Summary Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-5">
        <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-2xs">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">Verified</span>
          <span className="text-lg font-bold text-emerald-700 font-sans block mt-0.5">9</span>
          <span className="text-[9px] font-mono text-zinc-500">Active credentials</span>
        </div>

        <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-2xs">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">Expiring</span>
          <span className="text-lg font-bold text-amber-600 font-sans block mt-0.5">2</span>
          <span className="text-[9px] font-mono text-zinc-500">Due in 60 days</span>
        </div>

        <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-2xs">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">Action Due</span>
          <span className="text-lg font-bold text-rose-600 font-sans block mt-0.5">1</span>
          <span className="text-[9px] font-mono text-zinc-500">Missing address doc</span>
        </div>

        <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-2xs">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">Last Sync</span>
          <span className="text-xs font-mono font-bold text-zinc-900 block mt-2">Today, 10:42</span>
          <span className="text-[9px] font-mono text-zinc-500">StaffBeacon ledger</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onUploadDoc}
          iconLeft={<IconUpload size={13} />}
        >
          Upload Credential
        </Button>

        <Link
          href="/dashboard/documents"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0052FF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
        >
          <span>View Document Vault</span>
          <IconArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
