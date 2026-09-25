"use client";

import React from "react";
import { IconCheckCircle } from "@/components/ui/icons";

interface ActivityItem {
  title: string;
  description: string;
  time: string;
  type: "success" | "pending" | "info" | "warning";
}

const activities: ActivityItem[] = [
  {
    title: "Right to Work Sharecode Verified",
    description: "Home Office online digital verification cleared for site deployment",
    time: "Today, 10:42",
    type: "success",
  },
  {
    title: "CSCS Gold Card Renewal Confirmed",
    description: "CITB Construction Skills verified card #849102",
    time: "Yesterday, 16:18",
    type: "success",
  },
  {
    title: "DBS Standard Disclosure Uploaded",
    description: "Disclosure #DBS-291 submitted for contractor vetting review",
    time: "23 Sep, 14:06",
    type: "pending",
  },
  {
    title: "Battersea Phase 3 Site Induction Logged",
    description: "Main contractor induction confirmation recorded",
    time: "22 Sep, 11:34",
    type: "warning",
  },
  {
    title: "Contact & Address Details Synced",
    description: "Residential address and emergency contact updated on profile",
    time: "20 Sep, 09:15",
    type: "info",
  },
];

export default function ProfileActivity() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-zinc-950 font-sans">
            Recent Activity &amp; Audit Trail
          </h2>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            Cryptographic timestamp log of compliance and profile updates.
          </p>
        </div>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          AUDIT LOG
        </span>
      </div>

      <div className="divide-y divide-zinc-100">
        {activities.map((item, index) => (
          <div key={index} className="flex gap-3 py-3.5 first:pt-1 last:pb-1">
            {/* Timeline node */}
            <div className="relative flex w-5 shrink-0 justify-center">
              {index < activities.length - 1 && (
                <span className="absolute top-5 h-full w-px bg-zinc-200" />
              )}
              <span
                className={`relative z-10 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                  item.type === "success"
                    ? "bg-emerald-50 text-emerald-600"
                    : item.type === "warning"
                    ? "bg-amber-50 text-amber-600"
                    : item.type === "pending"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {item.type === "success" ? (
                  <IconCheckCircle size={13} />
                ) : (
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      item.type === "warning"
                        ? "bg-amber-500"
                        : item.type === "pending"
                        ? "bg-[#0052FF]"
                        : "bg-zinc-400"
                    }`}
                  />
                )}
              </span>
            </div>

            {/* Event text */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                <p className="text-xs font-bold text-zinc-900 font-sans">
                  {item.title}
                </p>
                <span className="shrink-0 text-[10px] font-mono text-zinc-400">
                  {item.time}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500 font-sans">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
