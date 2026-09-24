import React from "react";
import { Hero } from "./Hero";
import { TrustStatement } from "./TrustStatement";
import { HowItWorks } from "./HowItWorks";
import { DocumentShowcase } from "./DocumentShowcase";
import { ReadinessSection } from "./ReadinessSection";
import { SecuritySection } from "./SecuritySection";
import { StaffBeaconEcosystem } from "./StaffBeaconEcosystem";
import { FAQ } from "./FAQ";
import { FinalCta } from "./FinalCta";
import { Footer, Header } from "../../shared";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-950 font-sans selection:bg-[#0052FF] selection:text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStatement />
        <HowItWorks />
        <DocumentShowcase />
        <ReadinessSection />
        <SecuritySection />
        <StaffBeaconEcosystem />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

