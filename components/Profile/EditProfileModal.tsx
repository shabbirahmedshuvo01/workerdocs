"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconCheckCircle } from "@/components/ui/icons";

export interface ProfileData {
  fullName: string;
  preferredName: string;
  workerId: string;
  nino: string;
  dob: string;
  nationality: string;
  phone: string;
  email: string;
  address: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  role: string;
  company: string;
  department: string;
  status: string;
  startDate: string;
  contractType: string;
  location: string;
  manager: string;
}

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onSave: (updated: Partial<ProfileData>) => void;
}

interface EditFormProps {
  profileData: ProfileData;
  onClose: () => void;
  onSave: (updated: Partial<ProfileData>) => void;
}

function EditForm({ profileData, onClose, onSave }: EditFormProps) {
  const [preferredName, setPreferredName] = useState(profileData.preferredName);
  const [phone, setPhone] = useState(profileData.phone);
  const [address, setAddress] = useState(profileData.address);
  const [emergencyContactName, setEmergencyContactName] = useState(profileData.emergencyContactName);
  const [emergencyContactRelation, setEmergencyContactRelation] = useState(profileData.emergencyContactRelation);
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(profileData.emergencyContactPhone);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave({
        preferredName: preferredName.trim() || profileData.preferredName,
        phone: phone.trim() || profileData.phone,
        address: address.trim() || profileData.address,
        emergencyContactName: emergencyContactName.trim() || profileData.emergencyContactName,
        emergencyContactRelation: emergencyContactRelation.trim() || profileData.emergencyContactRelation,
        emergencyContactPhone: emergencyContactPhone.trim() || profileData.emergencyContactPhone,
      });
      setIsSaving(false);
      onClose();
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
            Preferred Name
          </label>
          <Input
            type="text"
            value={preferredName}
            onChange={(e) => setPreferredName(e.target.value)}
            className="text-xs"
            placeholder="Liam"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
            Mobile Phone
          </label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-xs font-mono"
            placeholder="+44 7700 900142"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Residential Address
        </label>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="text-xs"
          placeholder="Flat 4B, 18 Battersea Park Road, London, SW11 4HY"
        />
        <p className="mt-1 text-[11px] text-zinc-400 font-sans">
          Changing your address will require an updated Proof of Address document on file.
        </p>
      </div>

      <div className="pt-2 border-t border-zinc-100">
        <span className="block text-xs font-bold uppercase tracking-wider text-zinc-700 font-mono mb-3">
          Emergency Contact
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Contact Name
            </label>
            <Input
              type="text"
              value={emergencyContactName}
              onChange={(e) => setEmergencyContactName(e.target.value)}
              className="text-xs"
              placeholder="Sarah Vance"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Relationship
            </label>
            <Input
              type="text"
              value={emergencyContactRelation}
              onChange={(e) => setEmergencyContactRelation(e.target.value)}
              className="text-xs"
              placeholder="Spouse"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Emergency Phone Number
          </label>
          <Input
            type="tel"
            value={emergencyContactPhone}
            onChange={(e) => setEmergencyContactPhone(e.target.value)}
            className="text-xs font-mono"
            placeholder="+44 7700 900881"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-end gap-2.5">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onClose}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="accent"
          size="md"
          isLoading={isSaving}
          iconLeft={<IconCheckCircle size={15} />}
        >
          Save Profile Changes
        </Button>
      </div>
    </form>
  );
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profileData,
  onSave,
}: EditProfileModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 shadow-2xl animate-in zoom-in-95 fade-in duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
          <div>
            <h2 id="edit-profile-title" className="text-base sm:text-lg font-bold text-zinc-950 font-sans">
              Edit Worker Profile
            </h2>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">
              Update your preferred name, contact details, and emergency contact.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
            aria-label="Close edit profile modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form keyed by phone/preferredName to reset instantly */}
        <EditForm
          key={`${profileData.preferredName}-${profileData.phone}-${profileData.address}`}
          profileData={profileData}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
