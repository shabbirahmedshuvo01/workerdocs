"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  IconSearch,
  IconDownload,
  IconShieldCheck,
  IconCheckCircle,
  IconClock,
  IconLock,
  IconShare,
} from "@/components/ui/icons";

export type EventCategory =
  | "all"
  | "verification"
  | "employer_access"
  | "document_sync"
  | "security";

export interface AuditRecord {
  id: string;
  timestamp: string;
  formattedDate: string;
  category: "verification" | "employer_access" | "document_sync" | "security";
  title: string;
  description: string;
  actor: string;
  actorRole: string;
  credentialCode?: string;
  hash: string;
  status: "complete" | "review" | "pending" | "uploaded";
  statusLabel?: string;
}

export const initialAuditRecords: AuditRecord[] = [
  {
    id: "AUD-9901",
    timestamp: "2026-09-25T10:42:00Z",
    formattedDate: "Today, 10:42",
    category: "verification",
    title: "Right to Work Sharecode Verified",
    description: "Home Office digital verification cleared for Battersea Phase 3 deployment",
    actor: "Home Office & StaffBeacon Vetting",
    actorRole: "Automated Agency Clearance",
    credentialCode: "HO-RTW-9921",
    hash: "0x8f92a11b0e",
    status: "complete",
    statusLabel: "VERIFIED",
  },
  {
    id: "AUD-9902",
    timestamp: "2026-09-24T16:18:00Z",
    formattedDate: "Yesterday, 16:18",
    category: "verification",
    title: "CSCS Gold Card Renewal Validated",
    description: "CITB Construction Skills ledger verified card validity through 15 Nov 2027",
    actor: "CITB Construction Skills",
    actorRole: "Accreditation Authority",
    credentialCode: "CITB-849102",
    hash: "0x4e21c88a10",
    status: "complete",
    statusLabel: "VALIDATED",
  },
  {
    id: "AUD-9903",
    timestamp: "2026-09-24T11:05:00Z",
    formattedDate: "Yesterday, 11:05",
    category: "employer_access",
    title: "Contractor Credential Inspection",
    description: "Balfour Beatty Site Office reviewed SMSTS and IPAF operator qualifications",
    actor: "Balfour Beatty (Battersea Site Office)",
    actorRole: "Principal Contractor",
    credentialCode: "WRK-8921-Passport",
    hash: "0x77d0f912be",
    status: "complete",
    statusLabel: "CLEARED",
  },
  {
    id: "AUD-9904",
    timestamp: "2026-09-23T14:06:00Z",
    formattedDate: "23 Sep, 14:06",
    category: "document_sync",
    title: "DBS Standard Disclosure Uploaded",
    description: "Criminal record disclosure certificate #DBS-291 submitted for client compliance",
    actor: "Liam Vance (Worker Portal)",
    actorRole: "Worker Self-Service",
    credentialCode: "DBS-29104",
    hash: "0x11ab4490cd",
    status: "review",
  },
  {
    id: "AUD-9905",
    timestamp: "2026-09-22T15:30:00Z",
    formattedDate: "22 Sep, 15:30",
    category: "employer_access",
    title: "Site Access Grant Created",
    description: "Generated 7-day share link for Mace Group Site Office (Euston Station Redevelopment)",
    actor: "Liam Vance (Worker Portal)",
    actorRole: "Worker Share Authorization",
    credentialCode: "SHR-MACE-221",
    hash: "0x66c891f04b",
    status: "uploaded",
  },
  {
    id: "AUD-9906",
    timestamp: "2026-09-21T09:15:00Z",
    formattedDate: "21 Sep, 09:15",
    category: "security",
    title: "Worker Profile Contact Synced",
    description: "Emergency contact details and residential address verified with StaffBeacon registry",
    actor: "StaffBeacon Compliance Core",
    actorRole: "Identity Governance",
    credentialCode: "WRK-8921",
    hash: "0x99e410bbf3",
    status: "complete",
    statusLabel: "SYNCED",
  },
  {
    id: "AUD-9907",
    timestamp: "2026-09-18T13:40:00Z",
    formattedDate: "18 Sep, 13:40",
    category: "verification",
    title: "First Aid at Work (FAW) Level 3 Cleared",
    description: "St John Ambulance certified 3-day occupational qualification validated",
    actor: "St John Ambulance Vetting",
    actorRole: "Accreditation Authority",
    credentialCode: "FA-1182-STJ",
    hash: "0x33e8a941f1",
    status: "complete",
    statusLabel: "CLEARED",
  },
  {
    id: "AUD-9908",
    timestamp: "2026-09-15T08:20:00Z",
    formattedDate: "15 Sep, 08:20",
    category: "employer_access",
    title: "Access Revoked for Legacy Placement",
    description: "Kier Construction temporary placement access expired and automatically revoked",
    actor: "StaffBeacon Access Sentinel",
    actorRole: "Automated Access Expiry",
    credentialCode: "SHR-KIER-904",
    hash: "0x22c19a40aa",
    status: "complete",
    statusLabel: "REVOKED",
  },
];

export interface AuditTrailTableProps {
  onExportAuditLog: () => void;
}

export function AuditTrailTable({ onExportAuditLog }: AuditTrailTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("all");

  const filteredRecords = useMemo(() => {
    return initialAuditRecords.filter((record) => {
      const matchesCategory =
        selectedCategory === "all" || record.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        record.title.toLowerCase().includes(query) ||
        record.description.toLowerCase().includes(query) ||
        record.actor.toLowerCase().includes(query) ||
        (record.credentialCode && record.credentialCode.toLowerCase().includes(query)) ||
        record.id.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryIcon = (category: AuditRecord["category"]) => {
    switch (category) {
      case "verification":
        return <IconShieldCheck size={14} className="text-emerald-600" />;
      case "employer_access":
        return <IconShare size={14} className="text-[#0052FF]" />;
      case "document_sync":
        return <IconClock size={14} className="text-amber-600" />;
      case "security":
        return <IconLock size={14} className="text-purple-600" />;
    }
  };

  const getCategoryBadgeLabel = (category: AuditRecord["category"]) => {
    switch (category) {
      case "verification":
        return "VERIFICATION";
      case "employer_access":
        return "CONTRACTOR ACCESS";
      case "document_sync":
        return "DOCUMENT SYNC";
      case "security":
        return "SECURITY & AUDIT";
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls: Search + Filter + Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <IconSearch
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <Input
            type="text"
            placeholder="Search audit trail by actor, credential, or event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
            aria-label="Search audit trail"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium font-mono transition-colors whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              All Events ({initialAuditRecords.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("verification")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium font-mono transition-colors whitespace-nowrap ${
                selectedCategory === "verification"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              Verifications
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("employer_access")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium font-mono transition-colors whitespace-nowrap ${
                selectedCategory === "employer_access"
                  ? "bg-[#0052FF] text-white"
                  : "bg-blue-50 text-[#0052FF] hover:bg-blue-100"
              }`}
            >
              Contractor Access
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("document_sync")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium font-mono transition-colors whitespace-nowrap ${
                selectedCategory === "document_sync"
                  ? "bg-amber-600 text-white"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
            >
              Document Sync
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("security")}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium font-mono transition-colors whitespace-nowrap ${
                selectedCategory === "security"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }`}
            >
              Security
            </button>
          </div>

          {/* Export Action */}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onExportAuditLog}
            iconLeft={<IconDownload size={14} />}
            className="shrink-0 w-full sm:w-auto mt-1 sm:mt-0"
          >
            Export Ledger (CSV)
          </Button>
        </div>
      </div>

      {/* Audit Log Container */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-xs overflow-hidden">
        {/* Header summary */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3.5 bg-zinc-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-900 font-sans">
              Immutable Verification Ledger
            </span>
            <span className="font-mono text-[10px] text-zinc-400 bg-white px-2 py-0.5 rounded border border-zinc-200">
              {filteredRecords.length} records shown
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1">
            <IconCheckCircle size={12} />
            Cryptographically Synced
          </span>
        </div>

        {/* Empty State */}
        {filteredRecords.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 mb-3">
              <IconSearch size={18} />
            </div>
            <p className="text-sm font-bold text-zinc-900 font-sans">No matching audit events</p>
            <p className="text-xs text-zinc-500 font-sans mt-1">
              Try adjusting your search terms or event category filter.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop Table (Hidden on small mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-700">
                <thead className="border-b border-zinc-100 bg-zinc-50/70 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-medium select-none">
                  <tr>
                    <th scope="col" className="py-3 pl-5 pr-3">
                      Event / Description
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Actor &amp; Authority
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Credential / Ref
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Timestamp
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Hash
                    </th>
                    <th scope="col" className="py-3 pl-3 pr-5 text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-zinc-50/80 transition-colors"
                    >
                      {/* Event details */}
                      <td className="py-3.5 pl-5 pr-3 max-w-xs">
                        <div className="flex items-start gap-2.5">
                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-100 border border-zinc-200/60">
                            {getCategoryIcon(record.category)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-zinc-900 font-sans leading-snug">
                                {record.title}
                              </span>
                            </div>
                            <p className="mt-0.5 text-[11px] text-zinc-500 font-sans leading-relaxed line-clamp-1">
                              {record.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Actor & Authority */}
                      <td className="px-3 py-3.5 whitespace-nowrap">
                        <p className="font-semibold text-zinc-900 font-sans text-xs">
                          {record.actor}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-400">
                          {record.actorRole}
                        </p>
                      </td>

                      {/* Credential Code */}
                      <td className="px-3 py-3.5 whitespace-nowrap font-mono">
                        {record.credentialCode ? (
                          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-700 border border-zinc-200">
                            {record.credentialCode}
                          </span>
                        ) : (
                          <span className="text-zinc-400 text-[10px]">—</span>
                        )}
                      </td>

                      {/* Timestamp */}
                      <td className="px-3 py-3.5 whitespace-nowrap font-mono text-[11px] text-zinc-600">
                        {record.formattedDate}
                      </td>

                      {/* Cryptographic Hash */}
                      <td className="px-3 py-3.5 whitespace-nowrap font-mono text-[10px] text-zinc-400">
                        <span className="rounded bg-zinc-50 px-1.5 py-0.5 border border-zinc-200/50">
                          {record.hash}
                        </span>
                      </td>

                      {/* Status badge */}
                      <td className="py-3.5 pl-3 pr-5 text-right whitespace-nowrap">
                        <StatusBadge status={record.status} label={record.statusLabel} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Card View (< md) */}
            <div className="md:hidden divide-y divide-zinc-100">
              {filteredRecords.map((record) => (
                <div key={record.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-100 border border-zinc-200">
                        {getCategoryIcon(record.category)}
                      </div>
                      <span className="text-[9px] font-mono uppercase font-bold text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                        {getCategoryBadgeLabel(record.category)}
                      </span>
                    </div>
                    <StatusBadge status={record.status} label={record.statusLabel} />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-zinc-950 font-sans leading-snug">
                      {record.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-zinc-500 leading-relaxed font-sans">
                      {record.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3 pt-2 border-t border-zinc-100 text-[10px] font-mono text-zinc-500">
                    <span className="truncate">By {record.actor}</span>
                    <span className="text-zinc-400 shrink-0">{record.formattedDate}</span>
                  </div>

                  {record.credentialCode && (
                    <div className="flex items-center justify-between text-[10px] font-mono bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
                      <span className="text-zinc-500">Ref: {record.credentialCode}</span>
                      <span className="text-zinc-400">{record.hash}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AuditTrailTable;
