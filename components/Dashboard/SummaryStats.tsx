import React from "react";
import { StatCard } from "@/components/ui/stat-card";

export function SummaryStats() {
  const stats = [
    {
      label: "Total Credentials",
      value: "12",
      indicator: "neutral" as const,
      helperText: "Full digital compliance passport",
      tag: "PASSPORT",
    },
    {
      label: "Verified & Cleared",
      value: "9",
      indicator: "success" as const,
      helperText: "Approved by accredited auditors",
      tag: "75% PASSED",
      progressPercent: 75,
    },
    {
      label: "Pending Verification",
      value: "2",
      indicator: "warning" as const,
      helperText: "Under review by site contractors",
      tag: "IN REVIEW",
    },
    {
      label: "Action Required",
      value: "1",
      indicator: "error" as const,
      helperText: "Expiring within next 30 days",
      tag: "ACTION DUE",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <StatCard
          key={idx}
          label={stat.label}
          value={stat.value}
          indicator={stat.indicator}
          helperText={stat.helperText}
          tag={stat.tag}
          progressPercent={stat.progressPercent}
        />
      ))}
    </div>
  );
}

export default SummaryStats;
