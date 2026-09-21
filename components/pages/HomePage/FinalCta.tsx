import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-[#0052FF] text-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="font-mono text-xs uppercase tracking-widest text-blue-200 font-semibold">
          WORKERDOCS COMPLIANCE VAULT
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans leading-tight">
          Keep your documents ready for your next opportunity.
        </h2>

        <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
          Create your WorkerDocs profile and keep your important work records
          organized across UK placements and contracts.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            variant="white"
            size="lg"
            asChild
            className="px-8 font-bold text-sm tracking-wide shadow-md"
          >
            <Link href="#how-it-works">CREATE YOUR PROFILE</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="px-8 font-semibold text-sm text-white! border-white/50 hover:bg-white/10! hover:border-white! hover:text-gray-50! transition-colors shadow-md"
          >
            <Link href="#readiness">SIGN IN</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

