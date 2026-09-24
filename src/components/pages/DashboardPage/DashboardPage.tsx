import React from "react";
import Link from "next/link";
import { AppHeader } from "@/components/shared/AppHeader";
import { StatCard } from "@/components/ui/stat-card";
import { IconShieldCheck, IconArrowUpRight } from "@/components/ui/icons";
import { ReadinessBanner } from "./ReadinessBanner";
import { RequiredActionsPanel } from "./RequiredActionsPanel";
import { RecentActivityList } from "./RecentActivityList";

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 flex flex-col justify-between selection:bg-[#0052FF] selection:text-white">
      {/* 1. Authenticated App Header */}
      <AppHeader
        currentTab="overview"
        workerName="Liam Vance"
        workerCode="WRK-8921"
      />

      {/* 2. Main Dashboard Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Presentation Context Notice */}
        <div
          role="status"
          className="rounded-lg bg-blue-50/70 border border-blue-200/80 p-3 sm:px-4 sm:py-3 text-xs text-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold uppercase text-[10px] bg-white border border-blue-200 px-1.5 py-0.5 rounded shrink-0">
              DEMO PREVIEW
            </span>
            <span className="text-blue-800">
              Worker compliance overview in presentation mode. Displaying sample records for Liam Vance (<span className="font-mono font-medium">WRK-8921</span>).
            </span>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-[#0052FF] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Public Website</span>
            <IconArrowUpRight size={12} />
          </Link>
        </div>

        {/* Page Title & Context Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-zinc-200/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0052FF] font-semibold">
                OPERATIONAL DASHBOARD
              </span>
              <span className="text-zinc-300" aria-hidden="true">•</span>
              <span className="font-mono text-xs text-zinc-500">
                UK Standard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-sans">
              Worker Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed">
              Monitor your document compliance readiness, required actions, and verified credentials across contractor networks.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100/80 border border-zinc-200 rounded-md text-xs font-mono text-zinc-600">
              <IconShieldCheck size={14} className="text-emerald-600" />
              <span>Reference: WRK-8921</span>
            </div>
          </div>
        </div>

        {/* Section 1: Profile Readiness Banner */}
        <ReadinessBanner
          score={92}
          verifiedCount={4}
          totalCount={5}
        />

        {/* Section 2: Summary Statistics Grid */}
        <section aria-labelledby="stats-heading" className="space-y-3">
          <h2 id="stats-heading" className="sr-only">
            Compliance Summary Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Readiness Score"
              value="92%"
              indicator="success"
              progressPercent={92}
              tag="READY"
              helperText="4 of 5 requirements verified"
            />
            <StatCard
              label="Verified Documents"
              value="4 / 5"
              indicator="success"
              tag="VAULT"
              helperText="Active records in compliance vault"
            />
            <StatCard
              label="Approaching Renewals"
              value="1"
              indicator="warning"
              tag="ATTENTION"
              helperText="1 requirement pending update"
            />
            <StatCard
              label="Active Shares"
              value="2"
              indicator="neutral"
              tag="SHARED"
              helperText="Shared with site contractors"
            />
          </div>
        </section>

        {/* Section 3: Required Actions Panel */}
        <RequiredActionsPanel />

        {/* Section 4: Recent Document Activity */}
        <RecentActivityList />
      </main>

      {/* Minimal Dashboard Footer */}
      <footer className="w-full border-t border-zinc-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <p>WorkerDocs — Connected with the StaffBeacon ecosystem</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              Public Overview
            </Link>
            <span className="text-zinc-300" aria-hidden="true">|</span>
            <Link href="/onboarding" className="hover:text-zinc-900 transition-colors">
              Onboarding Flow
            </Link>
            <span className="text-zinc-300" aria-hidden="true">|</span>
            <Link href="/privacy-policy" className="hover:text-zinc-900 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

