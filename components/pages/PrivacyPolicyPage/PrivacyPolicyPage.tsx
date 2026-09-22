import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconShieldCheck } from "@/components/ui/icons";

export function PrivacyPolicyPage() {
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
            Worker Privacy Policy
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Last Updated: 22 September 2026 · Reference: WD-LEGAL-PRIVACY-DRAFT
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div
          role="note"
          className="p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3"
        >
          <IconShieldCheck size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Placeholder Legal Content</p>
            <p className="text-amber-800 leading-relaxed">
              This document contains representative placeholder text for interface demonstration and user testing. Final approved legal, data protection, and UK GDPR compliance copy will be provided by legal counsel prior to commercial launch.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <Card className="border border-zinc-200/90 shadow-xs bg-white">
          <CardContent className="p-6 sm:p-10 space-y-8 text-sm text-zinc-600 leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                1. Overview &amp; Data Protection Principles
              </h2>
              <p>
                WorkerDocs (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting the privacy, confidentiality, and security of all workers, contractors, and individuals who utilize our credential repository services. This policy outlines our handling of personal data, identification records, and statutory compliance submissions in alignment with the UK Data Protection Act 2018 and UK GDPR.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                2. Information We Collect
              </h2>
              <p>
                To provide worker profile management and compliance readiness tracking, we collect and store:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-600">
                <li>
                  <strong>Contact and Identification Data:</strong> Full legal name, date of birth, residential address, email address, and UK contact phone number.
                </li>
                <li>
                  <strong>Statutory Entitlement &amp; Identity Records:</strong> Right to Work share codes, passport numbers, and Home Office residency documentation.
                </li>
                <li>
                  <strong>Professional Accreditations:</strong> CSCS cards, CPCS smart cards, trade diplomas, NVQ certificates, and health &amp; safety training records.
                </li>
                <li>
                  <strong>Usage &amp; Device Information:</strong> Standard audit logs, browser type, and timestamped records of document upload and status change activities.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                3. How We Use Worker Information
              </h2>
              <p>
                Personal documentation is processed strictly to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-600">
                <li>Assemble, maintain, and verify your single worker compliance profile.</li>
                <li>Notify you in advance of expiring trade qualifications and card renewals.</li>
                <li>Enable controlled sharing of compliance readiness summaries with authorized placement agencies within the StaffBeacon ecosystem.</li>
                <li>Comply with UK statutory workforce audit and immigration compliance requirements.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                4. Data Storage &amp; Security Standards
              </h2>
              <p>
                All stored document images, share codes, and credential metadata are protected by encryption at rest (AES-256) and TLS 1.3 in transit. Access is restricted according to the principle of least privilege, ensuring only authorized workforce compliance coordinators can view verified items.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                5. Your Individual Rights (UK GDPR)
              </h2>
              <p>
                As a UK data subject, you hold statutory rights regarding your personal records, including the right of access (Subject Access Request), rectification of inaccurate details, restriction of processing, and erasure subject to regulatory retention mandates for placement and taxation compliance.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-zinc-100">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                6. Contact &amp; Inquiries
              </h2>
              <p className="text-xs text-zinc-500">
                For questions regarding data handling or to submit a privacy query, contact the WorkerDocs Data Protection Liaison at{" "}
                <span className="font-mono text-zinc-800">privacy@workerdocs.co.uk</span> or via your affiliated StaffBeacon workforce administrator.
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

