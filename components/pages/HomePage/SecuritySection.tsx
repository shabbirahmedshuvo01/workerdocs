import React from "react";
import {
  IconLock,
  IconShieldCheck,
  IconFileText,
  IconCheckCircle,
} from "@/components/ui/icons";

export function SecuritySection() {
  const pillars = [
    {
      title: "Organised Records",
      desc: "No more lost paperwork or buried email attachments. All work documents live in one secure digital vault.",
      icon: <IconFileText size={18} className="text-[#0052FF]" />,
    },
    {
      title: "Clear Document Status",
      desc: "Know immediately whether your credentials are verified, active, or approaching expiry.",
      icon: <IconCheckCircle size={18} className="text-[#0052FF]" />,
    },
    {
      title: "Controlled Access",
      desc: "Share verified credential summaries with employers only when needed for site placements.",
      icon: <IconLock size={18} className="text-[#0052FF]" />,
    },
    {
      title: "Compliance Readiness",
      desc: "Keep tickets and identity records prepared ahead of inductions and contract start dates.",
      icon: <IconShieldCheck size={18} className="text-[#0052FF]" />,
    },
  ];

  return (
    <section id="security" className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0052FF] font-mono">
            TRUST &amp; CONTROL
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-950 font-sans mt-1.5 leading-tight">
            Your documents should be ready. <br />
            <span className="text-[#0052FF]">Not scattered.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Take full control of your employment records. Instead of handing over
            physical cards or unorganised photos, present structured, verified
            credentials instantly.
          </p>
        </div>

        {/* 4 Security / Trust Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-100/60 flex items-center justify-center mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-gray-950 font-sans">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-5">
                <span className="font-mono text-[10px] text-gray-400 uppercase">
                  RECORD 0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

