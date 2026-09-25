"use client";

import React from "react";
import { IconShieldCheck, IconShare, IconCheckCircle, IconClock } from "@/components/ui/icons";

export interface AuditStatsProps {
  totalEventsCount: number;
  activeSharesCount: number;
  verifiedCredentialsCount: number;
}

export function AuditStats({
  totalEventsCount,
  activeSharesCount,
  verifiedCredentialsCount,
}: AuditStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {/* 1. Total Audit Events */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
            Audit Ledger Events
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
            <IconClock size={14} />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-sans tracking-tight">
            {totalEventsCount}
          </span>
          <span className="text-[11px] font-mono text-emerald-600 font-semibold">
            Immutable Log
          </span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-500 font-sans truncate">
          Verified timestamp entries
        </p>
      </div>

      {/* 2. Active Contractor Shares */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
            Active Shares
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[#0052FF]">
            <IconShare size={14} />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0052FF] font-sans tracking-tight">
            {activeSharesCount}
          </span>
          <span className="text-[11px] font-mono text-blue-600 font-semibold">
            Site Permissions
          </span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-500 font-sans truncate">
          Principal contractor grants
        </p>
      </div>

      {/* 3. Verified Credentials */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
            Verified Credentials
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <IconCheckCircle size={14} />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-sans tracking-tight">
            {verifiedCredentialsCount}
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            of 12 Total
          </span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-500 font-sans truncate">
          92% Site Readiness Tier 1
        </p>
      </div>

      {/* 4. Ledger Cryptographic Seal */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
            Ledger Hash
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <IconShieldCheck size={14} />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-xs sm:text-sm font-bold font-mono text-zinc-900 truncate">
            0x8F92...B14E
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
        </div>
        <p className="mt-1 text-[11px] text-zinc-500 font-sans truncate">
          StaffBeacon Audit Sync Active
        </p>
      </div>
    </div>
  );
}

export default AuditStats;
