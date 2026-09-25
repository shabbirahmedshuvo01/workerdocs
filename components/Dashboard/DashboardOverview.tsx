"use client";

import React, { useState } from "react";
import Link from "next/link";

import { IconUpload, IconDownload, IconCheckCircle } from "@/components/ui/icons";
import SummaryStats from "./SummaryStats";
import ReadinessCard from "./ReadinessCard";
import RequiredActions from "./RequiredActions";
import RecentActivity from "./RecentActivity";
import ExpirySection from "./ExpirySection";

export function DashboardOverview() {
  const [downloadNotification, setDownloadNotification] = useState<string | null>(
    null
  );

  const handleDownloadPassport = () => {
    setDownloadNotification("Generating WorkerDocs Audit Passport (WRK-8921.pdf)...");
    setTimeout(() => {
      setDownloadNotification("WorkerDocs Passport downloaded successfully.");
      setTimeout(() => setDownloadNotification(null), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Page Header / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-medium">
              Verified Construction Worker
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-sans">
            Welcome back, Liam Vance
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600">
            Passport ID: <strong className="font-mono font-semibold text-zinc-900">WRK-8921</strong> • National Insurance: <strong className="font-mono text-zinc-900">QQ 12 34 56 A</strong>
          </p>
        </div>

        {/* Top actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownloadPassport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
          >
            <IconDownload size={14} className="text-zinc-500" />
            <span>Export Passport (PDF)</span>
          </button>
          <Link
            href="/dashboard/documents"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0052FF] px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600 shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
          >
            <IconUpload size={14} />
            <span>Upload Document</span>
          </Link>
        </div>
      </div>

      {/* Download toast notification */}
      {downloadNotification && (
        <div className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-medium text-white shadow-lg animate-in fade-in slide-in-from-top-2">
          <IconCheckCircle size={15} className="text-emerald-400" />
          <span>{downloadNotification}</span>
        </div>
      )}

      {/* Section 1: Readiness Banner */}
      <ReadinessCard />

      {/* Section 2: Summary Stats */}
      <SummaryStats />

      {/* Section 3: Two-column grid (Required Actions & Recent Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <RequiredActions />
        <RecentActivity />
      </div>

      {/* Section 4: Upcoming Renewals & Expiries */}
      <ExpirySection />
    </div>
  );
}

export default DashboardOverview;

