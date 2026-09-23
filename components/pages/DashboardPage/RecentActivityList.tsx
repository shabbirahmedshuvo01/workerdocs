import React from "react";
import { StatusBadge, ComplianceStatus } from "@/components/ui/status-badge";
import { IconFileText } from "@/components/ui/icons";

export interface ActivityItem {
  id: string;
  documentTitle: string;
  category: string;
  status: ComplianceStatus;
  statusLabel?: string;
  note: string;
  updatedLabel: string;
}

const defaultActivityItems: ActivityItem[] = [
  {
    id: "act-1",
    documentTitle: "Passport / Photo Identification",
    category: "Identity & Verification",
    status: "complete",
    statusLabel: "VERIFIED",
    note: "Document recorded in compliance vault",
    updatedLabel: "Current Record",
  },
  {
    id: "act-2",
    documentTitle: "CSCS Skilled Worker Card",
    category: "Trade Cards & Tickets",
    status: "complete",
    statusLabel: "VERIFIED",
    note: "Trade registration verified",
    updatedLabel: "Current Record",
  },
  {
    id: "act-3",
    documentTitle: "Site Safety Awareness Certificate",
    category: "Health & Safety",
    status: "complete",
    statusLabel: "VERIFIED",
    note: "Safety training logged",
    updatedLabel: "Current Record",
  },
  {
    id: "act-4",
    documentTitle: "Proof of Residential Address",
    category: "Address Verification",
    status: "review",
    statusLabel: "REVIEW REQUIRED",
    note: "Pending updated proof document",
    updatedLabel: "Action Pending",
  },
];

export interface RecentActivityListProps {
  items?: ActivityItem[];
  className?: string;
}

export function RecentActivityList({
  items = defaultActivityItems,
  className = "",
}: RecentActivityListProps) {
  return (
    <section aria-labelledby="activity-heading" className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h2
          id="activity-heading"
          className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900"
        >
          Recent Document Activity
        </h2>
        <span className="text-[11px] font-mono text-zinc-500">
          Last 4 compliance updates
        </span>
      </div>

      <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden relative tech-crosshair-container tech-crosshair-tr">
        <div className="divide-y divide-zinc-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/50 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className="text-zinc-400 mt-0.5 sm:mt-0 shrink-0 p-1.5 bg-zinc-100/80 rounded" aria-hidden="true">
                  <IconFileText size={16} />
                </span>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs sm:text-sm font-semibold text-zinc-900 leading-snug">
                      {item.documentTitle}
                    </p>
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.2 rounded border border-zinc-200/50">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    {item.note}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pl-9 sm:pl-0">
                <span className="text-[11px] font-mono text-zinc-400">
                  {item.updatedLabel}
                </span>
                <StatusBadge
                  status={item.status}
                  label={item.statusLabel}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

