"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  IconFileText,
  IconDownload,
  IconUpload,
  IconShieldCheck,
  IconCheckCircle,
} from "@/components/ui/icons";
import { DocumentItem } from "./DocumentUploadModal";

export interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  doc: DocumentItem | null;
  onDownload: (doc: DocumentItem) => void;
  onReplace: (doc: DocumentItem) => void;
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  doc,
  onDownload,
  onReplace,
}: DocumentPreviewModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !doc) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://workerdocs.co.uk/verify/${doc.refCode}?worker=WRK-8921`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const isMissing = doc.status === "missing";

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
        aria-labelledby="preview-modal-title"
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 shadow-2xl animate-in zoom-in-95 fade-in duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0052FF] border border-blue-100">
              <IconFileText size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="preview-modal-title" className="text-base sm:text-lg font-bold text-zinc-950 font-sans tracking-tight truncate">
                  {doc.title}
                </h2>
                <StatusBadge status={doc.status} label={doc.statusLabel} size="sm" />
              </div>
              <p className="text-xs text-zinc-500 font-sans mt-0.5">
                {doc.category} • Ref: <span className="font-mono font-medium text-zinc-800">{doc.refCode}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
            aria-label="Close preview modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Visual Document Verification Card Preview */}
        <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 sm:p-5 relative overflow-hidden tech-crosshair-container tech-crosshair-tr">
          <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
            <div className="flex items-center gap-2">
              <IconShieldCheck size={16} className="text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 font-mono">
                StaffBeacon Verified Digital Credential
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              HASH: 8f2a...c901
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Issuing Authority</span>
              <span className="font-semibold text-zinc-900">{doc.issuer}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Registration Code</span>
              <span className="font-mono font-bold text-zinc-900">{doc.refCode}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Validity &amp; Expiration</span>
              <span className="font-semibold text-zinc-900">
                {doc.expiresAt} {doc.daysRemaining && doc.daysRemaining < 999 ? `(${doc.daysRemaining} days remaining)` : ""}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Audit Status</span>
              <span className="font-medium text-emerald-700">
                {isMissing ? "Action Required" : "Cleared for Site Dispatch"}
              </span>
            </div>
          </div>

          {doc.note && (
            <div className="mt-3.5 pt-3 border-t border-zinc-200/60 text-[11px] text-zinc-500 font-sans">
              <strong>Audit Note:</strong> {doc.note}
            </div>
          )}
        </div>

        {/* Detailed Metadata Grid */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 border border-zinc-100 rounded-xl p-3.5 bg-white text-xs">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 block">File Type</span>
            <span className="font-semibold text-zinc-800 uppercase">{doc.fileType}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-400 block">File Size</span>
            <span className="font-mono text-zinc-800">{doc.fileSize}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-400 block">Last Synced</span>
            <span className="text-zinc-800">{doc.updatedAt}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-400 block">Worker Passport</span>
            <span className="font-mono font-bold text-[#0052FF]">WRK-8921</span>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
          >
            <IconCheckCircle size={14} className={copiedLink ? "text-emerald-600" : "text-zinc-400"} />
            <span>{copiedLink ? "Verification Link Copied!" : "Copy Verification URL"}</span>
          </button>

          <div className="flex items-center gap-2">
            {!isMissing && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => onDownload(doc)}
                iconLeft={<IconDownload size={14} />}
              >
                Download PDF
              </Button>
            )}
            <Button
              variant="accent"
              size="md"
              onClick={() => onReplace(doc)}
              iconLeft={<IconUpload size={14} />}
            >
              {isMissing ? "Upload Document" : "Replace Version"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
