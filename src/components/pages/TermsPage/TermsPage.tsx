import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconShieldCheck } from "@/components/ui/icons";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 flex flex-col justify-between selection:bg-[#0052FF] selection:text-white">
      {/* Header */}
      <header className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-zinc-200/60 bg-white/60 backdrop-blur-xs">
        <Logo size="md" />
        <Link
          href="/"
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
        >
          <span>←</span> Back to overview
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Title and Draft Notice */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px] text-[#0052FF] bg-blue-50 border-blue-200">
              LEGAL DOCUMENTATION
            </Badge>
            <Badge variant="warning" className="font-mono text-[10px]">
              DRAFT / PLACEHOLDER
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-sans">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Last Updated: 22 September 2026 · Reference: WD-LEGAL-TERMS-DRAFT
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div
          role="note"
          className="p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3"
        >
          <IconShieldCheck size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Placeholder Terms of Service</p>
            <p className="text-amber-800 leading-relaxed">
              This document is a demonstration placeholder outlining representative workforce terms. Formal commercial, worker liability, and agency agreement conditions will be established by legal counsel prior to production launch.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <Card className="border border-zinc-200/90 shadow-xs bg-white">
          <CardContent className="p-6 sm:p-10 space-y-8 text-sm text-zinc-600 leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                1. Acceptance of Terms
              </h2>
              <p>
                By creating a WorkerDocs account, submitting compliance records, or accessing our credential management repository, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                2. Worker Responsibilities &amp; Document Accuracy
              </h2>
              <p>
                As an account holder, you confirm and warrant that:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-600">
                <li>All personal information, identification cards, and contact details you provide are genuine, accurate, and belong to you.</li>
                <li>Any Right to Work share codes, CSCS cards, trade qualifications, or training diplomas uploaded are authentic and legally valid.</li>
                <li>You will promptly update expired cards or status changes to maintain your verified readiness standing.</li>
                <li>Submitting forged, fraudulent, or altered compliance documents is strictly prohibited and constitutes grounds for immediate account suspension and notification of relevant authorities or placement agencies.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                3. StaffBeacon Ecosystem Integration
              </h2>
              <p>
                WorkerDocs operates as a specialized credential vault connected with StaffBeacon. When you apply for placements or authorize employer verifications, WorkerDocs enables secure transmission of your audit-ready readiness status. WorkerDocs does not directly guarantee employment or contract placement offers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                4. Account Security &amp; Credentials
              </h2>
              <p>
                You are responsible for maintaining the confidentiality of your sign-in credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access or security breach.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                5. Limitation of Liability &amp; Governing Law
              </h2>
              <p>
                To the fullest extent permitted by English law, WorkerDocs shall not be liable for indirect, incidental, or consequential damages resulting from platform downtime or third-party employer hiring decisions. These Terms are governed by the laws of England and Wales.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-zinc-100">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                6. Questions &amp; Support
              </h2>
              <p className="text-xs text-zinc-500">
                For legal inquiries regarding these terms, please contact{" "}
                <span className="font-mono text-zinc-800">legal@workerdocs.co.uk</span>.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-zinc-400 font-mono border-t border-zinc-200/40">
        <p>WorkerDocs — Connected with the StaffBeacon ecosystem</p>
      </footer>
    </div>
  );
}

