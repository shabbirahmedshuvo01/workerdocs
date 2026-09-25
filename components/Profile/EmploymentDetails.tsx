"use client";

import React from "react";
import { ProfileData } from "./EditProfileModal";

export interface EmploymentDetailsProps {
  profile: ProfileData;
}

export default function EmploymentDetails({ profile }: EmploymentDetailsProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-5">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-zinc-950 font-sans">
            Employment &amp; Placement Details
          </h2>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            Contract details connected with the StaffBeacon ecosystem.
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          CIS REGISTERED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
        {/* Employer */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Employer
          </span>
          <span className="mt-0.5 block font-bold text-zinc-950 font-sans">
            {profile.company}
          </span>
        </div>

        {/* Primary Role */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Job Title / Trade Role
          </span>
          <span className="mt-0.5 block font-semibold text-zinc-900 font-sans">
            {profile.role}
          </span>
        </div>

        {/* Department */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Department / Division
          </span>
          <span className="mt-0.5 block font-medium text-zinc-800 font-sans">
            {profile.department}
          </span>
        </div>

        {/* Employment Status */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Employment Status
          </span>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-emerald-700 font-mono text-[11px]">
              {profile.status}
            </span>
          </div>
        </div>

        {/* Start Date */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Tenure Start Date
          </span>
          <span className="mt-0.5 block font-mono text-zinc-800">
            {profile.startDate}
          </span>
        </div>

        {/* Contract Type */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Contract Classification
          </span>
          <span className="mt-0.5 block font-medium text-zinc-800 font-sans">
            {profile.contractType}
          </span>
        </div>

        {/* Work Location */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Assigned Site Location
          </span>
          <span className="mt-0.5 block font-medium text-zinc-800 font-sans">
            {profile.location}
          </span>
        </div>

        {/* Reporting Supervisor */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Reporting Manager
          </span>
          <span className="mt-0.5 block font-medium text-zinc-800 font-sans">
            {profile.manager}
          </span>
        </div>
      </div>
    </section>
  );
}
