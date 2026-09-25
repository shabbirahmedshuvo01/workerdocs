"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  IconShare,
  IconClock,
  IconCheckCircle,
  IconShieldCheck,
  IconCopy,
  IconAlertCircle,
} from "@/components/ui/icons";

export interface EmployerShare {
  id: string;
  recipientName: string;
  recipientOrg: string;
  projectName: string;
  scope: string[];
  createdAt: string;
  expiresAt: string;
  daysRemaining: number;
  viewCount: number;
  status: "active" | "expiring_soon" | "revoked";
  shareUrl: string;
}

export const defaultActiveShares: EmployerShare[] = [
  {
    id: "SHR-BALF-01",
    recipientName: "Balfour Beatty Site Office",
    recipientOrg: "Balfour Beatty plc",
    projectName: "Battersea Power Station Phase 3",
    scope: ["Right to Work & Identity", "SMSTS Supervision", "CSCS Gold Card", "IPAF 3a/3b"],
    createdAt: "20 Sep 2026",
    expiresAt: "20 Oct 2026",
    daysRemaining: 25,
    viewCount: 6,
    status: "active",
    shareUrl: "https://workerdocs.co.uk/passport/WRK-8921?auth=balf-bb921",
  },
  {
    id: "SHR-MACE-02",
    recipientName: "Mace Group Site Access Gate",
    recipientOrg: "Mace Group Limited",
    projectName: "Euston Station Redevelopment",
    scope: ["CSCS Gold Card", "First Aid at Work", "Asbestos Awareness (UKATA)"],
    createdAt: "22 Sep 2026",
    expiresAt: "29 Sep 2026",
    daysRemaining: 4,
    viewCount: 2,
    status: "expiring_soon",
    shareUrl: "https://workerdocs.co.uk/passport/WRK-8921?auth=mace-euston",
  },
  {
    id: "SHR-SB-03",
    recipientName: "StaffBeacon Vetting Desk",
    recipientOrg: "StaffBeacon Commercial Group",
    projectName: "Master Workforce Compliance Roster",
    scope: ["All 12 Verified Credentials", "DBS Disclosure", "Proof of Address & CIS"],
    createdAt: "01 March 2022",
    expiresAt: "Ongoing Master Clearance",
    daysRemaining: 999,
    viewCount: 18,
    status: "active",
    shareUrl: "https://workerdocs.co.uk/passport/WRK-8921?auth=staffbeacon-master",
  },
];

export interface ActiveSharesListProps {
  shares: EmployerShare[];
  onOpenCreateShare: () => void;
  onRevokeShare: (shareId: string) => void;
  onCopyLink: (url: string) => void;
}

export function ActiveSharesList({
  shares,
  onOpenCreateShare,
  onRevokeShare,
  onCopyLink,
}: ActiveSharesListProps) {
  const activeShares = shares.filter((s) => s.status !== "revoked");

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-zinc-950 font-sans">
              Active Employer &amp; Contractor Shares
            </h2>
            <span className="font-mono text-xs font-bold text-[#0052FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {activeShares.length} ACTIVE
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            Real-time control over which principal contractors have permission to verify your credentials.
          </p>
        </div>

        <Button
          type="button"
          variant="accent"
          size="md"
          onClick={onOpenCreateShare}
          iconLeft={<IconShare size={15} />}
          className="shrink-0"
        >
          Create New Share Link
        </Button>
      </div>

      {/* Shares List / Cards */}
      {activeShares.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0052FF] mb-3">
            <IconShare size={20} />
          </div>
          <h3 className="text-sm font-bold text-zinc-900 font-sans">No active shares</h3>
          <p className="mt-1 text-xs text-zinc-500 max-w-sm mx-auto font-sans">
            You currently have no active contractor credential shares. Generate a share link when inducted to a new site.
          </p>
          <Button
            type="button"
            variant="accent"
            size="sm"
            onClick={onOpenCreateShare}
            className="mt-4"
          >
            Create Share Link
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {activeShares.map((share) => (
            <div
              key={share.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors relative"
            >
              {/* Top Row: Contractor & Status */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0052FF] font-mono font-bold text-sm border border-blue-100">
                      {share.recipientOrg.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-zinc-950 font-sans leading-snug truncate">
                        {share.recipientName}
                      </h3>
                      <p className="text-xs text-zinc-500 font-sans truncate">
                        {share.projectName}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {share.status === "expiring_soon" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold font-mono text-amber-700 border border-amber-200 shrink-0">
                      <IconAlertCircle size={11} />
                      Expiring ({share.daysRemaining}d)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold font-mono text-emerald-700 border border-emerald-200 shrink-0">
                      <IconCheckCircle size={11} />
                      Active Access
                    </span>
                  )}
                </div>

                {/* Scope chips */}
                <div className="mt-4 pt-3 border-t border-zinc-100">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Granted Credential Scope
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {share.scope.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-700 border border-zinc-200/80 font-sans"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta details */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-500 bg-zinc-50/70 p-2.5 rounded-xl border border-zinc-100">
                  <div className="flex items-center gap-1.5">
                    <IconClock size={12} className="text-zinc-400" />
                    <span>Expires: {share.expiresAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <IconShieldCheck size={12} className="text-emerald-600" />
                    <span>{share.viewCount} Site Scans</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => onCopyLink(share.shareUrl)}
                  iconLeft={<IconCopy size={13} />}
                >
                  Copy Share URL
                </Button>

                <button
                  type="button"
                  onClick={() => onRevokeShare(share.id)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline py-1.5 px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                >
                  Revoke Access
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActiveSharesList;
