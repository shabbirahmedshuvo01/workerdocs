import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconShieldCheck } from "@/components/ui/icons";

export function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="text-xs font-mono text-zinc-400">
            Last Updated: 22 September 2026 · Reference: WD-LEGAL-COOKIES-DRAFT
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div
          role="note"
          className="p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3"
        >
          <IconShieldCheck size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Placeholder Cookie Policy</p>
            <p className="text-amber-800 leading-relaxed">
              This policy is a demonstration placeholder. The actual cookie classification, analytics cookies, and consent management tools will be configured when tracking and session storage services are deployed.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <Card className="border border-zinc-200/90 shadow-xs bg-white">
          <CardContent className="p-6 sm:p-10 space-y-8 text-sm text-zinc-600 leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make web applications operate efficiently, preserve session state, and provide reporting insights to site administrators.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                2. How WorkerDocs Uses Cookies
              </h2>
              <p>
                WorkerDocs uses minimal cookies strictly necessary for platform functionality and worker authentication:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-900 font-mono">
                      Strictly Necessary Cookies
                    </span>
                    <Badge variant="outline" className="font-mono text-[9px] bg-white text-zinc-700">
                      ALWAYS ACTIVE
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Essential for secure authentication, CSRF token validation, session preservation, and core application navigation. Without these cookies, services like secure document upload and profile viewing cannot function.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-900 font-mono">
                      Preference &amp; Functionality Cookies
                    </span>
                    <Badge variant="outline" className="font-mono text-[9px] bg-white text-zinc-700">
                      OPTIONAL
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Remember your UI preferences such as expanded accordion states or filter selections between visits.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                3. Third-Party Cookies
              </h2>
              <p>
                WorkerDocs does not utilize third-party advertising cookies or cross-site tracking pixels. Any integration with StaffBeacon utilizes secure API tokens rather than third-party tracking identifiers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                4. Managing Your Cookie Preferences
              </h2>
              <p>
                You can configure your browser to block or alert you about cookies. Note that blocking strictly necessary cookies will prevent you from signing in or viewing protected worker documents.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-zinc-100">
              <h2 className="text-base font-bold text-zinc-950 font-sans tracking-tight">
                5. Contact &amp; Updates
              </h2>
              <p className="text-xs text-zinc-500">
                For questions regarding our cookie practices, please contact{" "}
                <span className="font-mono text-zinc-800">compliance@workerdocs.co.uk</span>.
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

