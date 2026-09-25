"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  IconShieldCheck,
  IconShare,
  IconCheckCircle,
  IconCopy,
  IconDownload,
} from "@/components/ui/icons";
import { AuditStats } from "./AuditStats";
import { AuditTrailTable, initialAuditRecords } from "./AuditTrailTable";
import { ActiveSharesList, defaultActiveShares, EmployerShare } from "./ActiveSharesList";
import { CreateShareModal } from "./CreateShareModal";
import { PassportPreviewModal } from "./PassportPreviewModal";

export type AuditTab = "audit_trail" | "active_shares" | "passport";

export function AuditOverview() {
  const [activeTab, setActiveTab] = useState<AuditTab>("audit_trail");
  const [shares, setShares] = useState<EmployerShare[]>(defaultActiveShares);
  const [createShareOpen, setCreateShareOpen] = useState(false);
  const [passportModalOpen, setPassportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3200);
  };

  const handleCreateShare = (newShare: EmployerShare) => {
    setShares((prev) => [newShare, ...prev]);
    setActiveTab("active_shares");
    showToast(`Share link created for ${newShare.recipientName}.`);
  };

  const handleRevokeShare = (shareId: string) => {
    const target = shares.find((s) => s.id === shareId);
    setShares((prev) =>
      prev.map((s) => (s.id === shareId ? { ...s, status: "revoked" } : s))
    );
    showToast(`Access revoked for ${target ? target.recipientName : "contractor"}.`);
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast("Verification URL copied to clipboard.");
    } catch {
      showToast("Share URL copied: WRK-8921");
    }
  };

  const handleExportAuditLog = () => {
    showToast("Demo Mode: Exporting audit ledger (WRK-8921-AuditLog.csv)...");
  };

  const activeSharesCount = shares.filter((s) => s.status !== "revoked").length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-3 text-xs font-medium text-white shadow-2xl animate-in slide-in-from-bottom-3 fade-in duration-200">
          <IconCheckCircle size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs tech-crosshair-container tech-crosshair-tr">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-sans">
                Audit Trail &amp; Credential Sharing
              </h1>
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 bg-blue-50 text-[#0052FF] rounded border border-blue-200/70">
                WRK-8921
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold font-mono uppercase tracking-wide text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Ledger Synced
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-600 font-sans max-w-2xl leading-relaxed">
              Cryptographic verification history, active employer site permissions, and tamper-evident digital worker passport controls.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setPassportModalOpen(true)}
              iconLeft={<IconShieldCheck size={16} />}
            >
              Preview Digital Passport
            </Button>
            <Button
              type="button"
              variant="accent"
              size="md"
              onClick={() => setCreateShareOpen(true)}
              iconLeft={<IconShare size={15} />}
            >
              Create Share Link
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Key Metrics Bar */}
      <AuditStats
        totalEventsCount={initialAuditRecords.length}
        activeSharesCount={activeSharesCount}
        verifiedCredentialsCount={9}
      />

      {/* Main Tab Switcher Bar */}
      <div className="border-b border-zinc-200">
        <div
          role="tablist"
          aria-label="Audit and sharing views"
          className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-px"
        >
          <button
            role="tab"
            id="tab-audit-trail"
            aria-selected={activeTab === "audit_trail"}
            aria-controls="panel-audit-trail"
            onClick={() => setActiveTab("audit_trail")}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold font-sans border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "audit_trail"
                ? "border-[#0052FF] text-[#0052FF]"
                : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300"
            }`}
          >
            <IconShieldCheck size={16} />
            <span>Verification Audit Trail</span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-mono text-zinc-600">
              {initialAuditRecords.length}
            </span>
          </button>

          <button
            role="tab"
            id="tab-active-shares"
            aria-selected={activeTab === "active_shares"}
            aria-controls="panel-active-shares"
            onClick={() => setActiveTab("active_shares")}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold font-sans border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "active_shares"
                ? "border-[#0052FF] text-[#0052FF]"
                : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300"
            }`}
          >
            <IconShare size={16} />
            <span>Active Employer Shares</span>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-mono text-[#0052FF] font-bold">
              {activeSharesCount}
            </span>
          </button>

          <button
            role="tab"
            id="tab-passport"
            aria-selected={activeTab === "passport"}
            aria-controls="panel-passport"
            onClick={() => setActiveTab("passport")}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold font-sans border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "passport"
                ? "border-[#0052FF] text-[#0052FF]"
                : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300"
            }`}
          >
            <IconCheckCircle size={16} />
            <span>Digital Worker Passport</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-mono text-emerald-700 font-bold">
              92% Ready
            </span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {/* Tab 1: Audit Trail */}
        {activeTab === "audit_trail" && (
          <div
            role="region"
            id="panel-audit-trail"
            aria-labelledby="tab-audit-trail"
            className="animate-in fade-in duration-150"
          >
            <AuditTrailTable onExportAuditLog={handleExportAuditLog} />
          </div>
        )}

        {/* Tab 2: Active Employer Shares */}
        {activeTab === "active_shares" && (
          <div
            role="region"
            id="panel-active-shares"
            aria-labelledby="tab-active-shares"
            className="animate-in fade-in duration-150"
          >
            <ActiveSharesList
              shares={shares}
              onOpenCreateShare={() => setCreateShareOpen(true)}
              onRevokeShare={handleRevokeShare}
              onCopyLink={handleCopyLink}
            />
          </div>
        )}

        {/* Tab 3: Digital Worker Passport */}
        {activeTab === "passport" && (
          <div
            role="region"
            id="panel-passport"
            aria-labelledby="tab-passport"
            className="animate-in fade-in duration-150 space-y-6"
          >
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-100 pb-6">
                <div>
                  <h2 className="text-lg font-bold text-zinc-950 font-sans">
                    Digital Worker Verification Passport
                  </h2>
                  <p className="text-xs text-zinc-500 font-sans mt-0.5 max-w-xl">
                    Your tamper-evident digital credential passport. Principal contractors and site managers scan the QR code for instant, cryptographically verified site clearance.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Button
                    type="button"
                    variant="accent"
                    size="md"
                    onClick={() => setPassportModalOpen(true)}
                    iconLeft={<IconShieldCheck size={16} />}
                  >
                    Open Passport Inspector
                  </Button>
                </div>
              </div>

              {/* Passport Live Card Summary */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Visual Passport Card */}
                <div className="rounded-2xl bg-zinc-950 text-white p-6 shadow-xl relative overflow-hidden border border-zinc-800">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-md bg-[#0052FF] flex items-center justify-center font-bold text-xs">
                        W.
                      </div>
                      <span className="font-extrabold text-sm tracking-tight">WorkerDocs</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      TIER 1 CLEARED
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3.5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#0052FF] text-xl font-bold text-white border-2 border-zinc-700">
                      LV
                    </div>
                    <div>
                      <p className="font-bold text-base font-sans leading-tight">Liam Vance</p>
                      <p className="text-xs text-zinc-400 font-sans">Senior Site Supervisor</p>
                      <p className="text-[11px] font-mono text-blue-400 mt-0.5">WRK-8921</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400">
                    <div>
                      <span className="block text-zinc-500">CIS REGISTRY</span>
                      <span className="font-bold text-zinc-200">VERIFIED</span>
                    </div>
                    <div>
                      <span className="block text-zinc-500">SITE READINESS</span>
                      <span className="font-bold text-emerald-400">92% AUDIT READY</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between bg-zinc-900/90 p-3 rounded-xl border border-zinc-800">
                    <span className="text-[10px] font-mono text-zinc-400 truncate">
                      https://workerdocs.co.uk/passport/WRK-8921
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyLink("https://workerdocs.co.uk/passport/WRK-8921?status=verified")}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold shrink-0 ml-2"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Passport Features Details */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono mb-2">
                      Passport Security Features
                    </h3>
                    <ul className="space-y-2 text-xs text-zinc-600 font-sans">
                      <li className="flex items-start gap-2">
                        <IconCheckCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Home Office Digital Sharecode:</strong> Real-time Right to Work clearance status.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <IconCheckCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>CITB Ledger Integration:</strong> Instant validation of CSCS Gold Card &amp; SMSTS certificates.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <IconCheckCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>One-Click Site Revocation:</strong> Revoke contractor access at any time from your dashboard.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCopyLink("https://workerdocs.co.uk/passport/WRK-8921?status=verified")}
                      iconLeft={<IconCopy size={13} />}
                    >
                      Copy Public Passport Link
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => showToast("Demo Mode: Generating passport PDF...")}
                      iconLeft={<IconDownload size={13} />}
                    >
                      Export PDF Summary
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Share Modal */}
      <CreateShareModal
        isOpen={createShareOpen}
        onClose={() => setCreateShareOpen(false)}
        onCreateShare={handleCreateShare}
      />

      {/* Digital Passport Modal */}
      <PassportPreviewModal
        isOpen={passportModalOpen}
        onClose={() => setPassportModalOpen(false)}
        onShowToast={showToast}
      />
    </div>
  );
}

export default AuditOverview;
