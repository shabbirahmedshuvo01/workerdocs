"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { IconUpload, IconCheckCircle } from "@/components/ui/icons";
import { ComplianceStatus } from "@/components/ui/status-badge";

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  refCode: string;
  issuer: string;
  status: ComplianceStatus;
  statusLabel?: string;
  fileType: string;
  fileSize: string;
  updatedAt: string;
  expiresAt: string;
  daysRemaining?: number;
  note?: string;
}

export interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newDoc: DocumentItem) => void;
  targetDoc?: DocumentItem | null;
}

const categoryOptions = [
  { value: "Right to Work & ID", label: "Right to Work & Identity" },
  { value: "Trade Cards & Tickets", label: "Trade Cards & Tickets (CSCS, IPAF, etc.)" },
  { value: "Qualifications & NVQ", label: "Qualifications & Diplomas (NVQ, City & Guilds)" },
  { value: "Health & Safety", label: "Health & Safety (First Aid, Asbestos, Induction)" },
  { value: "Address & Insurance", label: "Address & Insurance Verification" },
];

interface UploadFormProps {
  targetDoc?: DocumentItem | null;
  onClose: () => void;
  onUploadSuccess: (newDoc: DocumentItem) => void;
}

function UploadForm({ targetDoc, onClose, onUploadSuccess }: UploadFormProps) {
  const [title, setTitle] = useState(targetDoc?.title || "");
  const [category, setCategory] = useState(targetDoc?.category || "Trade Cards & Tickets");
  const [refCode, setRefCode] = useState(targetDoc?.refCode || "");
  const [issuer, setIssuer] = useState(targetDoc?.issuer || "");
  const [noExpiry, setNoExpiry] = useState(
    targetDoc?.expiresAt === "Lifetime" || targetDoc?.expiresAt === "No Expiry"
  );
  const [expiresAt, setExpiresAt] = useState(
    targetDoc?.expiresAt && targetDoc.expiresAt !== "Lifetime" && targetDoc.expiresAt !== "No Expiry"
      ? targetDoc.expiresAt
      : ""
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg("Please enter a document title.");
      return;
    }
    if (!refCode.trim()) {
      setErrorMsg("Please provide a reference or registration number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    // Simulate upload processing
    setTimeout(() => {
      const newDocument: DocumentItem = {
        id: targetDoc ? targetDoc.id : `doc-${Date.now()}`,
        title: title.trim(),
        category,
        refCode: refCode.trim().toUpperCase(),
        issuer: issuer.trim() || "Accredited Authority",
        status: "complete",
        statusLabel: "VERIFIED",
        fileType: "PDF",
        fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : "1.8 MB",
        updatedAt: "Just now",
        expiresAt: noExpiry ? "Lifetime" : expiresAt || "24 Sep 2028",
        daysRemaining: noExpiry ? 9999 : 730,
        note: "Audited & timestamped on submission",
      };

      setIsSubmitting(false);
      onUploadSuccess(newDocument);
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      {errorMsg && (
        <div className="rounded-lg bg-rose-50 border border-rose-200/80 p-3 text-xs text-rose-700">
          {errorMsg}
        </div>
      )}

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Credential Category <span className="text-rose-500">*</span>
        </label>
        <Select
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full text-xs"
        />
      </div>

      {/* Title & Reference Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
            Document Title <span className="text-rose-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="e.g. CSCS Gold Card"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
            Reference / Certificate # <span className="text-rose-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="e.g. CITB-849102"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
            required
            className="text-xs font-mono"
          />
        </div>
      </div>

      {/* Issuer & Expiry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
            Issuing Authority / Body
          </label>
          <Input
            type="text"
            placeholder="e.g. CITB, City & Guilds"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            className="text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
            Expiry Date
          </label>
          <Input
            type="text"
            placeholder="e.g. 15 Nov 2027"
            value={noExpiry ? "Lifetime / No Expiry" : expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            disabled={noExpiry}
            className="text-xs"
          />
          <div className="mt-1.5 flex items-center gap-2">
            <input
              type="checkbox"
              id="noExpiryCheck"
              checked={noExpiry}
              onChange={(e) => {
                setNoExpiry(e.target.checked);
                if (e.target.checked) setExpiresAt("");
              }}
              className="rounded border-zinc-300 text-[#0052FF] focus:ring-[#0052FF] h-3.5 w-3.5"
            />
            <label htmlFor="noExpiryCheck" className="text-[11px] text-zinc-600 select-none cursor-pointer">
              Lifetime qualification (No expiration)
            </label>
          </div>
        </div>
      </div>

      {/* File Upload Zone */}
      <div className="pt-1">
        <FileUpload
          label="Select Document File"
          helperText="PDF, PNG, or JPG up to 15MB"
          onFileSelect={(file) => setSelectedFile(file)}
        />
      </div>

      {/* Action Footer */}
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
          iconLeft={<IconCheckCircle size={15} />}
        >
          {targetDoc ? "Save & Verify Document" : "Upload to Vault"}
        </Button>
      </div>
    </form>
  );
}

export default function DocumentUploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
  targetDoc,
}: DocumentUploadModalProps) {
  // Handle Escape key
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

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
        className="relative z-10 w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 fade-in duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0052FF] border border-blue-100">
              <IconUpload size={18} />
            </div>
            <div>
              <h2 id="upload-modal-title" className="text-base sm:text-lg font-bold text-zinc-950 font-sans">
                {targetDoc ? `Replace: ${targetDoc.title}` : "Upload Document Credential"}
              </h2>
              <p className="text-xs text-zinc-500 font-sans mt-0.5">
                Upload certified documentation for automated auditor verification.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
            aria-label="Close upload modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Upload Form (Keyed for instant state reset without useEffect) */}
        <UploadForm
          key={targetDoc ? targetDoc.id : "new-doc"}
          targetDoc={targetDoc}
          onClose={onClose}
          onUploadSuccess={onUploadSuccess}
        />
      </div>
    </div>
  );
}
