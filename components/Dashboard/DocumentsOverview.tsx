"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { DocumentCard } from "@/components/ui/document-card";
import {
  IconUpload,
  IconDownload,
  IconSearch,
  IconFileText,
  IconCheckCircle,
  IconEye,
} from "@/components/ui/icons";
import DocumentUploadModal, { DocumentItem } from "./DocumentUploadModal";
import DocumentPreviewModal from "./DocumentPreviewModal";

const initialDocuments: DocumentItem[] = [
  {
    id: "doc-1",
    title: "Right to Work Sharecode",
    category: "Right to Work & ID",
    refCode: "HO-RTW-8921-X",
    issuer: "UK Home Office",
    status: "complete",
    statusLabel: "VERIFIED",
    fileType: "PDF",
    fileSize: "1.2 MB",
    updatedAt: "Today, 10:42",
    expiresAt: "23 Oct 2026",
    daysRemaining: 28,
    note: "Digital verification cleared via Home Office online system",
  },
  {
    id: "doc-2",
    title: "UK Passport (Biometric)",
    category: "Right to Work & ID",
    refCode: "GBR-918234-A",
    issuer: "HM Passport Office",
    status: "complete",
    statusLabel: "VERIFIED",
    fileType: "PDF",
    fileSize: "2.4 MB",
    updatedAt: "15 Sep 2026",
    expiresAt: "14 Mar 2031",
    daysRemaining: 1630,
    note: "Primary identity document verified",
  },
  {
    id: "doc-3",
    title: "CSCS Skilled Worker Gold Card",
    category: "Trade Cards & Tickets",
    refCode: "CITB-849102",
    issuer: "CITB Construction Skills",
    status: "complete",
    statusLabel: "VERIFIED",
    fileType: "PDF",
    fileSize: "1.8 MB",
    updatedAt: "Yesterday, 16:18",
    expiresAt: "07 Nov 2026",
    daysRemaining: 43,
    note: "Advanced Carpentry & Joinery (Level 3)",
  },
  {
    id: "doc-4",
    title: "IPAF 3a & 3b MEWP Operator",
    category: "Trade Cards & Tickets",
    refCode: "IPAF-OP-44192",
    issuer: "IPAF International",
    status: "complete",
    statusLabel: "VERIFIED",
    fileType: "PDF",
    fileSize: "1.1 MB",
    updatedAt: "02 Aug 2026",
    expiresAt: "12 Aug 2028",
    daysRemaining: 686,
    note: "Mobile Vertical (3a) & Mobile Boom (3b)",
  },
  {
    id: "doc-5",
    title: "PASMA Mobile Access Towers",
    category: "Trade Cards & Tickets",
    refCode: "PASMA-883201",
    issuer: "PASMA Training",
    status: "pending",
    statusLabel: "UNDER REVIEW",
    fileType: "PDF",
    fileSize: "940 KB",
    updatedAt: "22 Sep 2026",
    expiresAt: "22 Sep 2028",
    daysRemaining: 727,
    note: "Uploaded renewal certificate awaiting auditor sign-off",
  },
  {
    id: "doc-6",
    title: "NVQ Level 3 Wood Occupations",
    category: "Qualifications & NVQ",
    refCode: "C&G-NVQ-3910",
    issuer: "City & Guilds London",
    status: "complete",
    statusLabel: "LIFETIME",
    fileType: "PDF",
    fileSize: "3.5 MB",
    updatedAt: "10 Jun 2025",
    expiresAt: "Lifetime",
    daysRemaining: 9999,
    note: "Ofqual accredited vocational qualification",
  },
  {
    id: "doc-7",
    title: "City & Guilds 18th Edition Wiring",
    category: "Qualifications & NVQ",
    refCode: "C&G-2382-22",
    issuer: "City & Guilds London",
    status: "complete",
    statusLabel: "LIFETIME",
    fileType: "PDF",
    fileSize: "2.1 MB",
    updatedAt: "14 Jan 2026",
    expiresAt: "Lifetime",
    daysRemaining: 9999,
    note: "BS 7671:2018+A2:2022 Requirements",
  },
  {
    id: "doc-8",
    title: "First Aid at Work (FAW) Level 3",
    category: "Health & Safety",
    refCode: "FA-1182-STJ",
    issuer: "St John Ambulance",
    status: "complete",
    statusLabel: "VERIFIED",
    fileType: "PDF",
    fileSize: "1.4 MB",
    updatedAt: "12 Dec 2025",
    expiresAt: "14 Dec 2026",
    daysRemaining: 80,
    note: "HSE approved 3-day emergency workplace certification",
  },
  {
    id: "doc-9",
    title: "Asbestos Awareness (UKATA)",
    category: "Health & Safety",
    refCode: "UKATA-ASB-7721",
    issuer: "UKATA Certified",
    status: "complete",
    statusLabel: "VERIFIED",
    fileType: "PDF",
    fileSize: "850 KB",
    updatedAt: "28 Feb 2026",
    expiresAt: "28 Feb 2027",
    daysRemaining: 156,
    note: "Annual refresher compliance record",
  },
  {
    id: "doc-10",
    title: "Battersea Phase 3 Site Induction",
    category: "Health & Safety",
    refCode: "IND-BAT-P3-09",
    issuer: "Balfour Beatty",
    status: "review",
    statusLabel: "ACTION DUE",
    fileType: "PDF",
    fileSize: "1.6 MB",
    updatedAt: "22 Sep 2026",
    expiresAt: "Before Site Arrival",
    daysRemaining: 3,
    note: "Main contractor induction confirmation required",
  },
  {
    id: "doc-11",
    title: "Public Liability Insurance (£5M)",
    category: "Address & Insurance",
    refCode: "POL-AV-994102",
    issuer: "Aviva Commercial",
    status: "complete",
    statusLabel: "VERIFIED",
    fileType: "PDF",
    fileSize: "1.9 MB",
    updatedAt: "01 Sep 2026",
    expiresAt: "01 Sep 2027",
    daysRemaining: 341,
    note: "Includes £5,000,000 public and products liability",
  },
  {
    id: "doc-12",
    title: "Proof of Address (Council Tax)",
    category: "Address & Insurance",
    refCode: "LBW-CTX-2026",
    issuer: "London Borough of Wandsworth",
    status: "missing",
    statusLabel: "REQUIRED",
    fileType: "—",
    fileSize: "—",
    updatedAt: "—",
    expiresAt: "Must be within 3 months",
    daysRemaining: 0,
    note: "Required to maintain Tier 1 site dispatch status",
  },
];

const categories = [
  "All Documents",
  "Right to Work & ID",
  "Trade Cards & Tickets",
  "Qualifications & NVQ",
  "Health & Safety",
  "Address & Insurance",
];

export function DocumentsOverview() {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Documents");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"recent" | "expiry" | "name">("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modals state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [targetDocForUpload, setTargetDocForUpload] = useState<DocumentItem | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Summary Metrics calculations
  const totalCount = documents.length;
  const verifiedCount = documents.filter((d) => d.status === "complete").length;
  const expiringSoonCount = documents.filter(
    (d) => d.daysRemaining !== undefined && d.daysRemaining <= 60 && d.status !== "missing"
  ).length;
  const actionRequiredCount = documents.filter(
    (d) => d.status === "missing" || d.status === "review"
  ).length;

  // Filtered & Sorted documents
  const filteredDocuments = useMemo(() => {
    return documents
      .filter((doc) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = doc.title.toLowerCase().includes(q);
          const matchRef = doc.refCode.toLowerCase().includes(q);
          const matchIssuer = doc.issuer.toLowerCase().includes(q);
          const matchCategory = doc.category.toLowerCase().includes(q);
          if (!matchTitle && !matchRef && !matchIssuer && !matchCategory) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== "All Documents" && doc.category !== selectedCategory) {
          return false;
        }

        // Status filter
        if (selectedStatus !== "all") {
          if (selectedStatus === "complete" && doc.status !== "complete") return false;
          if (selectedStatus === "pending" && doc.status !== "pending") return false;
          if (selectedStatus === "review" && doc.status !== "review") return false;
          if (selectedStatus === "missing" && doc.status !== "missing") return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "expiry") {
          return (a.daysRemaining ?? 9999) - (b.daysRemaining ?? 9999);
        }
        // default recent
        return 0;
      });
  }, [documents, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Actions
  const handleOpenUpload = (docToReplace?: DocumentItem) => {
    setTargetDocForUpload(docToReplace || null);
    setUploadModalOpen(true);
  };

  const handleUploadSuccess = (newDoc: DocumentItem) => {
    setDocuments((prev) => {
      const existsIndex = prev.findIndex((d) => d.id === newDoc.id);
      if (existsIndex >= 0) {
        const copy = [...prev];
        copy[existsIndex] = newDoc;
        return copy;
      }
      return [newDoc, ...prev];
    });
    showToast(`Document "${newDoc.title}" uploaded & verified successfully.`);
  };

  const handleOpenPreview = (doc: DocumentItem) => {
    setPreviewDoc(doc);
    setPreviewModalOpen(true);
  };

  const handleDownload = (doc: DocumentItem) => {
    showToast(`Downloading credential file "${doc.title}.pdf"...`);
  };

  const handleExportAll = () => {
    showToast("Generating WorkerDocs Audit Vault bundle (WRK-8921-Vault.zip)...");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Documents");
    setSelectedStatus("all");
    setSortBy("recent");
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-medium">
              Verified Credential Repository
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-sans">
            Documents Vault
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600">
            Manage, verify, and export your digital compliance credentials. Connected with StaffBeacon ledger.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleExportAll}
            iconLeft={<IconDownload size={14} />}
          >
            Export All (ZIP)
          </Button>
          <Button
            type="button"
            variant="accent"
            size="md"
            onClick={() => handleOpenUpload()}
            iconLeft={<IconUpload size={14} />}
          >
            Upload Document
          </Button>
        </div>
      </div>

      {/* Document Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Credentials"
          value={totalCount}
          indicator="neutral"
          helperText="All records in your vault"
          tag="PASSPORT"
        />
        <StatCard
          label="Verified &amp; Active"
          value={verifiedCount}
          indicator="success"
          helperText="Cleared for site deployment"
          tag="75% PASSED"
          progressPercent={Math.round((verifiedCount / totalCount) * 100)}
        />
        <StatCard
          label="Expiring Soon"
          value={expiringSoonCount}
          indicator="warning"
          helperText="Renewal due within 60 days"
          tag="ACTION DUE"
        />
        <StatCard
          label="Action Required"
          value={actionRequiredCount}
          indicator="error"
          helperText="Missing or induction review"
          tag="ATTENTION"
        />
      </div>

      {/* Search & Filters Card */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top filter row: Search input + Status dropdown + Sort + View mode */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 min-w-0">
            <IconSearch
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search by document name, card number, issuing body..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search documents"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50/60 py-2 pl-9 pr-8 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#0052FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0052FF] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 text-xs"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status & Sort controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Status Select */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter by compliance status"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 focus:border-[#0052FF] focus:outline-none focus:ring-1 focus:ring-[#0052FF]"
            >
              <option value="all">All Statuses</option>
              <option value="complete">Verified (Complete)</option>
              <option value="pending">Pending Review</option>
              <option value="review">Review Required</option>
              <option value="missing">Missing / Required</option>
            </select>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "expiry" | "name")}
              aria-label="Sort documents"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 focus:border-[#0052FF] focus:outline-none focus:ring-1 focus:ring-[#0052FF]"
            >
              <option value="recent">Recently Updated</option>
              <option value="expiry">Expiry (Earliest First)</option>
              <option value="name">Document Name (A-Z)</option>
            </select>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
                aria-label="Grid view"
                title="Grid view"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
                aria-label="Table list view"
                title="Table list view"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === "All Documents"
                ? documents.length
                : documents.filter((d) => d.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all select-none ${
                  isSelected
                    ? "bg-zinc-950 text-white shadow-xs"
                    : "bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-950"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isSelected
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-zinc-200/80 text-zinc-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-semibold text-zinc-600 font-mono">
          Showing <span className="text-zinc-950 font-bold">{filteredDocuments.length}</span> of{" "}
          <span className="text-zinc-950 font-bold">{documents.length}</span> credentials
        </p>

        {(searchQuery || selectedCategory !== "All Documents" || selectedStatus !== "all") && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-medium text-[#0052FF] hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Documents Display: Grid View vs Table View */}
      {filteredDocuments.length === 0 ? (
        /* Empty State */
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
            <IconFileText size={24} />
          </div>
          <h3 className="mt-4 text-sm font-bold text-zinc-900 font-sans">
            No matching documents found
          </h3>
          <p className="mt-1 text-xs text-zinc-500 max-w-sm mx-auto">
            We couldn&apos;t find any documents matching your current search criteria. Try adjusting your query or filters.
          </p>
          <div className="mt-5 flex justify-center gap-2.5">
            <Button variant="secondary" size="sm" onClick={clearFilters}>
              Reset Filters
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => handleOpenUpload()}
              iconLeft={<IconUpload size={13} />}
            >
              Upload New Document
            </Button>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4.5">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              title={doc.title}
              category={doc.category}
              refCode={doc.refCode}
              status={doc.status}
              statusLabel={doc.statusLabel}
              fileType={doc.fileType}
              fileSize={doc.fileSize}
              updatedAt={doc.updatedAt}
              expiresAt={doc.expiresAt}
              variant="technical"
              onView={() => handleOpenPreview(doc)}
              onDownload={() => handleDownload(doc)}
              onUpload={() => handleOpenUpload(doc)}
            />
          ))}
        </div>
      ) : (
        /* Table / List View */
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/80 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  <th scope="col" className="px-5 py-3.5 font-semibold">Document</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Category</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Reference</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Expiration</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Updated</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans">
                {filteredDocuments.map((doc) => {
                  const isMissing = doc.status === "missing";

                  return (
                    <tr key={doc.id} className="hover:bg-zinc-50/60 transition-colors">
                      {/* Document Name & Issuer */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                              isMissing
                                ? "bg-zinc-50 border-dashed border-zinc-300 text-zinc-400"
                                : "bg-blue-50/60 border-blue-100 text-[#0052FF]"
                            }`}
                          >
                            <IconFileText size={15} />
                          </div>
                          <div>
                            <p className="font-bold text-zinc-950 font-sans leading-tight">
                              {doc.title}
                            </p>
                            <p className="text-[11px] text-zinc-500 mt-0.5 font-sans">
                              {doc.issuer}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4 text-zinc-600 text-xs">
                        {doc.category}
                      </td>

                      {/* Reference Code */}
                      <td className="px-4 py-4 font-mono text-[11px] text-zinc-800">
                        <span className="bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200/70">
                          {doc.refCode}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-4">
                        <StatusBadge status={doc.status} label={doc.statusLabel} size="sm" />
                      </td>

                      {/* Expiration */}
                      <td className="px-4 py-4 font-mono text-xs">
                        <span
                          className={
                            doc.daysRemaining !== undefined && doc.daysRemaining <= 30 && !isMissing
                              ? "text-rose-600 font-bold"
                              : doc.daysRemaining !== undefined && doc.daysRemaining <= 60 && !isMissing
                              ? "text-amber-600 font-semibold"
                              : "text-zinc-700"
                          }
                        >
                          {doc.expiresAt}
                        </span>
                      </td>

                      {/* Updated */}
                      <td className="px-4 py-4 text-zinc-500 text-[11px] font-mono">
                        {doc.updatedAt}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {!isMissing && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleOpenPreview(doc)}
                                className="p-1.5 text-zinc-500 hover:text-zinc-950 rounded hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
                                title={`Preview ${doc.title}`}
                                aria-label={`Preview ${doc.title}`}
                              >
                                <IconEye size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDownload(doc)}
                                className="p-1.5 text-zinc-500 hover:text-zinc-950 rounded hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
                                title={`Download ${doc.title}`}
                                aria-label={`Download ${doc.title}`}
                              >
                                <IconDownload size={14} />
                              </button>
                            </>
                          )}
                          <Button
                            variant={isMissing ? "accent" : "secondary"}
                            size="sm"
                            onClick={() => handleOpenUpload(doc)}
                          >
                            {isMissing ? "Upload" : "Replace"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload & Replace Modal */}
      <DocumentUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
        targetDoc={targetDocForUpload}
      />

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        doc={previewDoc}
        onDownload={handleDownload}
        onReplace={(doc) => {
          setPreviewModalOpen(false);
          handleOpenUpload(doc);
        }}
      />
    </div>
  );
}

export default DocumentsOverview;
