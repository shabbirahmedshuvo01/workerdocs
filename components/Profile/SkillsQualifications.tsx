"use client";

import React from "react";
import { IconCheckCircle } from "@/components/ui/icons";

interface SkillItem {
  title: string;
  category: string;
  issuer: string;
  verified: boolean;
  code?: string;
}

const skillsData: SkillItem[] = [
  {
    title: "Site Supervision & Safety (SMSTS)",
    category: "Supervision",
    issuer: "CITB Construction Skills",
    verified: true,
    code: "CITB-SMSTS-921",
  },
  {
    title: "CSCS Gold Card (Skilled Supervisor)",
    category: "Trade Card",
    issuer: "CITB Construction Skills",
    verified: true,
    code: "CITB-849102",
  },
  {
    title: "NVQ Level 3 Wood Occupations",
    category: "Qualification",
    issuer: "City & Guilds London",
    verified: true,
    code: "C&G-3910",
  },
  {
    title: "IPAF 3a & 3b MEWP Operator",
    category: "Machinery Ticket",
    issuer: "IPAF International",
    verified: true,
    code: "IPAF-OP-44192",
  },
  {
    title: "PASMA Mobile Access Towers",
    category: "Machinery Ticket",
    issuer: "PASMA Training",
    verified: true,
    code: "PASMA-883201",
  },
  {
    title: "First Aid at Work (FAW) Level 3",
    category: "Health & Safety",
    issuer: "St John Ambulance",
    verified: true,
    code: "FA-1182-STJ",
  },
  {
    title: "Asbestos Awareness (UKATA)",
    category: "Health & Safety",
    issuer: "UKATA Certified",
    verified: true,
    code: "UKATA-7721",
  },
  {
    title: "18th Edition Wiring Regs (BS 7671)",
    category: "Qualification",
    issuer: "City & Guilds",
    verified: true,
    code: "C&G-2382-22",
  },
  {
    title: "Manual Handling & Ergonomics",
    category: "Health & Safety",
    issuer: "CPD UK Accredited",
    verified: true,
  },
  {
    title: "Fire Marshal & Warden",
    category: "Emergency Protocol",
    issuer: "RoSPA Approved",
    verified: true,
  },
];

export default function SkillsQualifications() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-5">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-zinc-950 font-sans">
            Skills, Tickets &amp; Qualifications
          </h2>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            Trade certifications and accredited safety competencies.
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
          10 ACCREDITATIONS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3.5 hover:bg-zinc-50 hover:border-zinc-200 transition-colors"
          >
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <IconCheckCircle size={13} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-zinc-900 text-xs font-sans leading-snug">
                  {skill.title}
                </p>
                <span className="shrink-0 rounded bg-white px-1.5 py-0.5 font-mono text-[9px] font-semibold text-zinc-600 border border-zinc-200">
                  {skill.category}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] text-zinc-500 font-sans">
                <span className="truncate">{skill.issuer}</span>
                {skill.code && (
                  <span className="font-mono text-[10px] text-zinc-400 shrink-0 ml-1">
                    {skill.code}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
