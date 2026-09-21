import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroComposition } from "./HeroComposition";

export function Hero() {
  return (
    <section id="hero" className="relative bg-white pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0052FF] text-xs font-semibold tracking-wider uppercase font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" aria-hidden="true" />
              Worker Document Management
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-gray-950 font-sans leading-[1.12]">
              Your work documents.{" "}
              <span className="text-[#0052FF]">Always ready.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Keep your employment documents, qualifications and compliance
              records organized in one secure place — ready whenever your next
              opportunity comes.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button variant="accent" size="lg" asChild className="px-7 font-bold tracking-wide">
                <Link href="#how-it-works">Create Your Worker Profile</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild className="px-7 font-semibold">
                <Link href="#readiness">Sign In</Link>
              </Button>
            </div>

            <p className="text-xs text-gray-400 font-sans pt-1">
              Part of the StaffBeacon workforce ecosystem.
            </p>
          </div>

          {/* Right Column: Hero Document Composition */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <HeroComposition />
          </div>
        </div>
      </div>
    </section>
  );
}

