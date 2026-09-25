"use client";

import React from "react";
import { ProfileData } from "./EditProfileModal";

export interface PersonalInformationProps {
  profile: ProfileData;
  onEdit: () => void;
}

export default function PersonalInformation({
  profile,
  onEdit,
}: PersonalInformationProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-5">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-zinc-950 font-sans">
            Personal &amp; Contact Details
          </h2>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            Verified identity records and primary contact details.
          </p>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold text-[#0052FF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
        >
          Edit Details
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
        {/* Full Legal Name */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Full Legal Name
          </span>
          <span className="mt-0.5 block font-semibold text-zinc-900 font-sans">
            {profile.fullName}
          </span>
        </div>

        {/* Preferred Name */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Preferred Name
          </span>
          <span className="mt-0.5 block font-semibold text-zinc-900 font-sans">
            {profile.preferredName}
          </span>
        </div>

        {/* Worker Reference ID */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            WorkerDocs ID
          </span>
          <span className="mt-0.5 block font-mono font-bold text-[#0052FF]">
            {profile.workerId}
          </span>
        </div>

        {/* National Insurance Number */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            National Insurance (NINO)
          </span>
          <span className="mt-0.5 block font-mono font-bold text-zinc-900">
            {profile.nino}
          </span>
        </div>

        {/* Date of Birth */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Date of Birth
          </span>
          <span className="mt-0.5 block font-medium text-zinc-800 font-sans">
            {profile.dob}
          </span>
        </div>

        {/* Nationality */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Nationality &amp; RTW
          </span>
          <span className="mt-0.5 block font-medium text-zinc-800 font-sans">
            {profile.nationality}
          </span>
        </div>

        {/* Primary Phone */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Contact Mobile
          </span>
          <span className="mt-0.5 block font-mono font-medium text-zinc-800">
            {profile.phone}
          </span>
        </div>

        {/* Primary Email */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Email Address
          </span>
          <span className="mt-0.5 block font-mono font-medium text-zinc-800 truncate">
            {profile.email}
          </span>
        </div>

        {/* Residential Address */}
        <div className="sm:col-span-2 pt-2 border-t border-zinc-100">
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Residential Address
          </span>
          <span className="mt-0.5 block font-medium text-zinc-800 font-sans">
            {profile.address}
          </span>
        </div>

        {/* Emergency Contact */}
        <div className="sm:col-span-2 pt-2 border-t border-zinc-100">
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Emergency Contact
          </span>
          <div className="mt-0.5 flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-zinc-900 font-sans">
              {profile.emergencyContactName}{" "}
              <span className="text-zinc-500 font-normal">({profile.emergencyContactRelation})</span>
            </span>
            <span className="font-mono text-zinc-700">
              {profile.emergencyContactPhone}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
