"use client";

import React, { useState } from "react";
import { IconCheckCircle } from "@/components/ui/icons";
import ProfileHeader from "./ProfileHeader";
import PersonalInformation from "./PersonalInformation";
import EmploymentDetails from "./EmploymentDetails";
import ComplianceSnapshot from "./ComplianceSnapshot";
import SkillsQualifications from "./SkillsQualifications";
import ProfileActivity from "./ProfileActivity";
import EditProfileModal, { ProfileData } from "./EditProfileModal";
import DocumentUploadModal, { DocumentItem } from "@/components/Dashboard/DocumentUploadModal";

const initialProfile: ProfileData = {
  fullName: "Liam Vance",
  preferredName: "Liam",
  workerId: "WRK-8921",
  nino: "QQ 12 34 56 A",
  dob: "14 Aug 1988",
  nationality: "British (UK Citizen)",
  phone: "+44 7700 900142",
  email: "liam.vance@workerdocs-demo.co.uk",
  address: "Flat 4B, 18 Battersea Park Road, London, SW11 4HY",
  emergencyContactName: "Sarah Vance",
  emergencyContactRelation: "Spouse",
  emergencyContactPhone: "+44 7700 900881",
  role: "Senior Site Supervisor",
  company: "StaffBeacon Group",
  department: "Commercial & Civil Contracting",
  status: "Active (Cleared)",
  startDate: "01 March 2022",
  contractType: "Full-time Permanent (CIS Registered)",
  location: "London, UK (Battersea Phase 3)",
  manager: "Marcus Thorne (Regional Contracts Director)",
};

export function WorkerProfile() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3200);
  };

  const handleSaveProfile = (updated: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    showToast("Profile details updated successfully.");
  };

  const handleExportPassport = () => {
    showToast("Demo Mode: Generating sample audit passport PDF (WRK-8921)...");
  };

  const handleUploadSuccess = (doc: DocumentItem) => {
    showToast(`Demo: Document "${doc.title}" submitted to vault.`);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-3 text-xs font-medium text-white shadow-2xl animate-in slide-in-from-bottom-3 fade-in duration-200">
          <IconCheckCircle size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Profile Header Hero */}
      <ProfileHeader
        profile={profile}
        onEdit={() => setEditModalOpen(true)}
        onExportPassport={handleExportPassport}
        onShowToast={showToast}
      />

      {/* 2. Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Main Information) — 7 cols on lg */}
        <div className="lg:col-span-7 space-y-6">
          <PersonalInformation
            profile={profile}
            onEdit={() => setEditModalOpen(true)}
          />

          <EmploymentDetails profile={profile} />

          <SkillsQualifications />
        </div>

        {/* Right Column (Compliance & Activity) — 5 cols on lg */}
        <div className="lg:col-span-5 space-y-6">
          <ComplianceSnapshot
            onUploadDoc={() => setUploadModalOpen(true)}
          />

          <ProfileActivity />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        profileData={profile}
        onSave={handleSaveProfile}
      />

      {/* Upload Document Modal (Reused from Dashboard) */}
      <DocumentUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}

export default WorkerProfile;
