"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconShare } from "@/components/ui/icons";
import { EmployerShare } from "./ActiveSharesList";

export interface CreateShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateShare: (newShare: EmployerShare) => void;
}

const durationOptions = [
  { label: "Immediate site entry", days: 1, text: "24 Hours" },
  { label: "Short contract placement", days: 7, text: "7 Days" },
  { label: "Standard monthly placement", days: 30, text: "30 Days" },
  { label: "Extended project clearance", days: 90, text: "90 Days" },
];

const availableScopes = [
  { id: "rtw", label: "Right to Work & Passport Identity", defaultChecked: true },
  { id: "trade", label: "Trade Cards & Tickets (CSCS Gold Card, IPAF, PASMA)", defaultChecked: true },
  { id: "hs", label: "Health & Safety Accreditations (SMSTS, First Aid, UKATA)", defaultChecked: true },
  { id: "financial", label: "CIS Scheme & Proof of Address Verification", defaultChecked: false },
];

interface InnerFormProps {
  onClose: () => void;
  onCreateShare: (newShare: EmployerShare) => void;
}

function InnerCreateShareForm({ onClose, onCreateShare }: InnerFormProps) {
  const [recipientName, setRecipientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Right to Work & Identity",
    "Trade Cards & Tickets (CSCS, IPAF)",
    "Health & Safety (SMSTS, First Aid)",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleToggleScope = (label: string) => {
    setSelectedScopes((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      setErrorMsg("Please provide a contractor or employer name.");
      return;
    }

    if (selectedScopes.length === 0) {
      setErrorMsg("Please select at least one credential category to grant.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(now.getDate() + selectedDuration);

    const formattedExpiry = expiryDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newShare: EmployerShare = {
      id: `SHR-NEW-${randomSuffix}`,
      recipientName: recipientName.trim(),
      recipientOrg: recipientName.trim(),
      projectName: projectName.trim() || "Commercial Project Site",
      scope: selectedScopes,
      createdAt: "Today",
      expiresAt: formattedExpiry,
      daysRemaining: selectedDuration,
      viewCount: 0,
      status: "active",
      shareUrl: `https://workerdocs.co.uk/passport/WRK-8921?auth=shr-${randomSuffix}`,
    };

    setTimeout(() => {
      onCreateShare(newShare);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      {errorMsg && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-sans">
          {errorMsg}
        </div>
      )}

      {/* Recipient Contractor */}
      <div>
        <label htmlFor="recipient-contractor" className="block text-xs font-semibold text-zinc-800 mb-1.5 font-sans">
          Contractor / Recipient Name <span className="text-rose-500">*</span>
        </label>
        <Input
          id="recipient-contractor"
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          placeholder="e.g., Balfour Beatty Site Induction Office"
          className="text-xs"
          required
        />
      </div>

      {/* Project Site Name */}
      <div>
        <label htmlFor="project-location" className="block text-xs font-semibold text-zinc-800 mb-1.5 font-sans">
          Project Site Location
        </label>
        <Input
          id="project-location"
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="e.g., Battersea Power Station Phase 3"
          className="text-xs"
        />
      </div>

      {/* Duration Selector */}
      <div>
        <label className="block text-xs font-semibold text-zinc-800 mb-1.5 font-sans">
          Access Duration
        </label>
        <div className="grid grid-cols-2 gap-2">
          {durationOptions.map((opt) => (
            <button
              key={opt.days}
              type="button"
              onClick={() => setSelectedDuration(opt.days)}
              className={`rounded-xl border p-2.5 text-left transition-all ${
                selectedDuration === opt.days
                  ? "border-[#0052FF] bg-blue-50/60 ring-1 ring-[#0052FF]"
                  : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/80"
              }`}
            >
              <span className="block text-xs font-bold text-zinc-900 font-sans">
                {opt.text}
              </span>
              <span className="block text-[10px] text-zinc-500 font-sans mt-0.5 leading-tight">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scope Checklist */}
      <div className="pt-2 border-t border-zinc-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 font-mono mb-2">
          Granted Credential Categories
        </label>
        <div className="space-y-2">
          {availableScopes.map((scope) => {
            const isChecked = selectedScopes.includes(scope.label);
            return (
              <label
                key={scope.id}
                className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleScope(scope.label)}
                  className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-[#0052FF] focus:ring-[#0052FF]"
                />
                <span className="text-xs text-zinc-800 font-sans font-medium select-none">
                  {scope.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Modal Actions Footer */}
      <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-end gap-2.5">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="accent"
          size="md"
          isLoading={isSubmitting}
          iconLeft={<IconShare size={15} />}
        >
          Generate Share Link
        </Button>
      </div>
    </form>
  );
}

export function CreateShareModal({
  isOpen,
  onClose,
  onCreateShare,
}: CreateShareModalProps) {
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
        aria-labelledby="create-share-title"
        className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 shadow-2xl animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
          <div>
            <h2 id="create-share-title" className="text-base sm:text-lg font-bold text-zinc-950 font-sans">
              Create Credential Share Link
            </h2>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">
              Grant secure, time-limited verification access to an employer or contractor.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
            aria-label="Close share modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Inner Form */}
        <InnerCreateShareForm
          key={isOpen ? "open" : "closed"}
          onClose={onClose}
          onCreateShare={onCreateShare}
        />
      </div>
    </div>
  );
}

export default CreateShareModal;
