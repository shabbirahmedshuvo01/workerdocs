import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared";
import { OnboardingWizard } from "./OnboardingWizard";

export function OnboardingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 flex flex-col justify-between selection:bg-[#0052FF] selection:text-white">
      {/* Top Bar with Home Link */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Logo size="md" />
        <Link
          href="/"
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
        >
          <span>←</span> Back to overview
        </Link>
      </header>

      {/* Main Wizard Area */}
      <main className="flex-1 flex items-start justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0052FF] font-semibold">
              WORKER PROFILE SETUP
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-sans">
              Worker Profile Onboarding
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
              Complete your core worker details and professional qualifications to prepare your document readiness vault.
            </p>
          </div>

          <OnboardingWizard />
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-zinc-400 font-mono">
        <p>WorkerDocs — Connected with the StaffBeacon ecosystem</p>
      </footer>
    </div>
  );
}

