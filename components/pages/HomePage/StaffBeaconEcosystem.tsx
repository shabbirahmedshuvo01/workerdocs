import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  IconUser,
  IconFileText,
  IconShieldCheck,
  IconArrowUpRight,
} from "@/components/ui/icons";

export function StaffBeaconEcosystem() {
  const steps = [
    {
      title: "Worker Profile",
      desc: "Maintain your contact details, primary trade, and verification status in one central profile.",
      icon: <IconUser size={18} className="text-[#0052FF]" />,
    },
    {
      title: "Documents",
      desc: "Store verified Right to Work share codes, CSCS cards, and identity files ready for check.",
      icon: <IconFileText size={18} className="text-[#0052FF]" />,
    },
    {
      title: "Qualifications",
      desc: "Keep vocational trade certificates, NVQs, and health & safety records together.",
      icon: <IconShieldCheck size={18} className="text-[#0052FF]" />,
    },
    {
      title: "Opportunities",
      desc: "Step onto new contract placements and site inductions cleared and ready to work.",
      icon: <IconArrowUpRight size={18} className="text-emerald-600" />,
    },
  ];

  return (
    <section id="ecosystem" className="py-20 sm:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0052FF] text-xs font-semibold font-mono tracking-wider uppercase">
            <span>STAFFBEACON ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 font-sans">
            Built for the StaffBeacon workforce ecosystem.
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            WorkerDocs connects seamlessly with the StaffBeacon workforce platform,
            keeping worker credentials verified and organised between contract placements.
          </p>
        </div>

        {/* Progression Chain */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] border border-gray-200/80 rounded-xl p-6 flex flex-col justify-between hover:border-blue-300 hover:bg-white transition-all shadow-sm group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#0052FF] bg-blue-50/80 border border-blue-100 px-2 py-0.5 rounded">
                    0{idx + 1}
                  </span>
                  <div className="h-8 w-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-gray-950 font-sans">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 mt-4 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>STAGE 0{idx + 1}</span>
                {idx < 3 ? <span>→ NEXT</span> : <span className="text-emerald-600 font-semibold">● ACTIVE</span>}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button variant="accent" size="lg" asChild className="font-bold tracking-wide">
            <Link href="/register">Create Your Worker Profile</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

