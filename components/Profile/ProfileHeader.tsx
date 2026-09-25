"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  IconCheckCircle,
  IconDownload,
  IconShieldCheck,
} from "@/components/ui/icons";
import { ProfileData } from "./EditProfileModal";

export interface ProfileHeaderProps {
  profile: ProfileData;
  onEdit: () => void;
  onExportPassport: () => void;
  onShowToast: (msg: string) => void;
}

export default function ProfileHeader({
  profile,
  onEdit,
  onExportPassport,
  onShowToast,
}: ProfileHeaderProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://workerdocs.co.uk/passport/${profile.workerId}?status=verified`
      );
      setCopiedLink(true);
      onShowToast("Demo passport verification link copied to clipboard.");
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      onShowToast("Demo link copied: WRK-8921");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs tech-crosshair-container tech-crosshair-tr">
      {/* Top Banner Accent */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left: Avatar + Details */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative flex h-20 w-20 sm:h-22 sm:w-22 shrink-0 items-center justify-center rounded-2xl bg-[#0052FF] text-2xl sm:text-3xl font-extrabold text-white shadow-md border-2 border-white ring-4 ring-blue-50 select-none">
            LV
            <span
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white text-white"
              title="Identity & RTW Verified"
            >
              <IconShieldCheck size={14} />
            </span>
          </div>

          {/* Persona Identity Block */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-sans">
                {profile.fullName}
              </h1>
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-50 text-[#0052FF] rounded border border-blue-200/70">
                {profile.workerId}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold font-mono uppercase tracking-wide text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Active Verified
              </span>
            </div>

            <p className="mt-1 text-sm font-semibold text-zinc-700 font-sans">
              {profile.role} <span className="text-zinc-400 font-normal">at</span>{" "}
              <span className="text-zinc-900 font-bold">{profile.company}</span>
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-zinc-500 font-sans">
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3.5 w-3.5 text-zinc-400">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {profile.location}
              </span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3.5 w-3.5 text-zinc-400">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Active on WorkerDocs since {profile.startDate}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleShare}
            iconLeft={<IconCheckCircle size={15} className={copiedLink ? "text-emerald-600" : "text-zinc-400"} />}
          >
            {copiedLink ? "Passport Copied!" : "Share Passport"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onExportPassport}
            iconLeft={<IconDownload size={15} />}
          >
            Export PDF
          </Button>
          <Button
            type="button"
            variant="accent"
            size="md"
            onClick={onEdit}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
