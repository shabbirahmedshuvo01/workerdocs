"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  IconCheckCircle,
  IconShieldCheck,
  IconCopy,
  IconDownload,
} from "@/components/ui/icons";

export interface PassportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

const verifiedCredentials = [
  { name: "Right to Work in UK", authority: "Home Office Digital", ref: "HO-RTW-9921", date: "Verified Active" },
  { name: "CSCS Gold Card (Supervisor)", authority: "CITB Skills", ref: "CITB-849102", date: "Expires Nov 2027" },
  { name: "SMSTS Site Safety Management", authority: "CITB Skills", ref: "SMSTS-921", date: "Expires Mar 2027" },
  { name: "IPAF 3a & 3b MEWP Operator", authority: "IPAF International", ref: "IPAF-44192", date: "Expires Aug 2027" },
  { name: "First Aid at Work (FAW) Level 3", authority: "St John Ambulance", ref: "FA-1182", date: "Expires Feb 2028" },
  { name: "Asbestos Awareness", authority: "UKATA Certified", ref: "UKATA-7721", date: "Expires Jan 2027" },
];

export function PassportPreviewModal({
  isOpen,
  onClose,
  onShowToast,
}: PassportPreviewModalProps) {
  const [copied, setCopied] = useState(false);

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

  const passportUrl = "https://workerdocs.co.uk/passport/WRK-8921?status=verified";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(passportUrl);
      setCopied(true);
      onShowToast("Passport verification URL copied to clipboard.");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onShowToast("Passport URL copied: WRK-8921");
    }
  };

  const handleExportPDF = () => {
    onShowToast("Demo Mode: Generating official WorkerDocs Digital Passport PDF...");
  };

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
        aria-labelledby="passport-modal-title"
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 shadow-2xl animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0052FF] text-white shadow-xs">
              <IconShieldCheck size={18} />
            </div>
            <div>
              <h2 id="passport-modal-title" className="text-base sm:text-lg font-bold text-zinc-950 font-sans">
                WorkerDocs Digital Passport
              </h2>
              <p className="text-xs text-zinc-500 font-sans">
                Official contractor verification card &amp; cryptographic credentials.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
            aria-label="Close passport modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Passport Content Body */}
        <div className="mt-5 space-y-5">
          {/* Card Hero Banner */}
          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 text-white shadow-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0052FF] text-2xl font-extrabold text-white border-2 border-zinc-700">
                  LV
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold font-sans">Liam Vance</h3>
                    <span className="font-mono text-xs font-bold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                      WRK-8921
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans mt-0.5">
                    Senior Site Supervisor • StaffBeacon Group
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold font-mono text-emerald-400 border border-emerald-500/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      ACTIVE TIER 1 VERIFIED
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      Site-Cleared
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code Specimen Box */}
              <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl shadow-xs text-zinc-900 shrink-0 self-center sm:self-auto">
                <div className="h-20 w-20 bg-zinc-950 rounded-lg flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                    {/* Stylized QR Code Matrix representation */}
                    <rect x="0" y="0" width="30" height="30" fill="white" />
                    <rect x="6" y="6" width="18" height="18" fill="black" />
                    <rect x="10" y="10" width="10" height="10" fill="white" />
                    <rect x="70" y="0" width="30" height="30" fill="white" />
                    <rect x="76" y="6" width="18" height="18" fill="black" />
                    <rect x="80" y="10" width="10" height="10" fill="white" />
                    <rect x="0" y="70" width="30" height="30" fill="white" />
                    <rect x="6" y="76" width="18" height="18" fill="black" />
                    <rect x="10" y="80" width="10" height="10" fill="white" />
                    <rect x="40" y="10" width="20" height="10" fill="white" />
                    <rect x="40" y="40" width="20" height="20" fill="white" />
                    <rect x="70" y="40" width="10" height="20" fill="white" />
                    <rect x="10" y="40" width="10" height="20" fill="white" />
                    <rect x="40" y="70" width="20" height="20" fill="white" />
                    <rect x="70" y="70" width="20" height="10" fill="white" />
                  </svg>
                </div>
                <span className="mt-1 text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-tight">
                  Scan to Verify
                </span>
              </div>
            </div>

            {/* Background subtle technical grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          </div>

          {/* 92% Compliance Snapshot bar */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-900 font-sans">
                Live Audit Compliance Score
              </span>
              <span className="font-mono font-bold text-[#0052FF]">
                92% (Audit-Ready)
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-200"
              role="progressbar"
              aria-valuenow={92}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Worker compliance readiness percentage"
            >
              <div className="h-full rounded-full bg-[#0052FF]" style={{ width: "92%" }} />
            </div>
          </div>

          {/* Verified Credentials Checklist */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-zinc-700 font-mono mb-2.5">
              Verified Credentials Snapshot (6 of 12)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {verifiedCredentials.map((cred, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3 text-xs"
                >
                  <IconCheckCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-zinc-900 font-sans truncate">{cred.name}</p>
                    <p className="text-[10px] text-zinc-500 font-sans">{cred.authority}</p>
                    <div className="mt-1 flex items-center justify-between font-mono text-[9px] text-zinc-400">
                      <span>{cred.ref}</span>
                      <span className="text-emerald-700 font-medium">{cred.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification URL box */}
          <div className="rounded-xl border border-zinc-200 bg-white p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] font-mono text-zinc-400 uppercase">
                Public Verification URL
              </span>
              <span className="block font-mono text-xs text-zinc-800 truncate select-all">
                {passportUrl}
              </span>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCopyLink}
              iconLeft={<IconCopy size={13} />}
              className="shrink-0"
            >
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            type="button"
            variant="accent"
            size="md"
            onClick={handleExportPDF}
            iconLeft={<IconDownload size={15} />}
          >
            Export Passport PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PassportPreviewModal;
