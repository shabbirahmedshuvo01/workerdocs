import React from "react";
import { DocumentCard } from "@/components/ui/document-card";

export function DocumentShowcase() {
  const documents = [
    {
      id: "doc-rtw",
      title: "Right to Work (Share Code)",
      category: "Home Office Online Check",
      refCode: "REF: WD-2026-RTW",
      status: "complete" as const,
      statusLabel: "VERIFIED",
      fileType: "PDF",
      fileSize: "1.4 MB",
      updatedAt: "12 Mar 2026",
      expiresAt: "Indefinite",
    },
    {
      id: "doc-id",
      title: "Passport / Photo ID",
      category: "Identity Verification Record",
      refCode: "REF: WD-2026-PID",
      status: "complete" as const,
      statusLabel: "VERIFIED",
      fileType: "PDF",
      fileSize: "2.1 MB",
      updatedAt: "08 Jan 2026",
      expiresAt: "18 Nov 2031",
    },
    {
      id: "doc-cscs",
      title: "CSCS Skilled Worker Card",
      category: "CITB Construction Skill Smart Card",
      refCode: "REF: WD-2026-CSC",
      status: "pending" as const,
      statusLabel: "RENEWAL DUE",
      fileType: "PDF",
      fileSize: "840 KB",
      updatedAt: "10 Feb 2024",
      expiresAt: "24 Oct 2026",
    },
    {
      id: "doc-dbs",
      title: "Enhanced DBS Certificate",
      category: "Disclosure & Barring Service",
      refCode: "REF: WD-2026-DBS",
      status: "uploaded" as const,
      statusLabel: "UPLOADED",
      fileType: "PDF",
      fileSize: "3.2 MB",
      updatedAt: "15 Jan 2026",
    },
    {
      id: "doc-nvq",
      title: "NVQ Level 3 Trade Qualification",
      category: "City & Guilds Vocational Diploma",
      refCode: "REF: WD-2026-NVQ",
      status: "complete" as const,
      statusLabel: "VERIFIED",
      fileType: "PDF",
      fileSize: "1.8 MB",
      updatedAt: "14 Jun 2022",
    },
    {
      id: "doc-poa",
      title: "Proof of Address Statement",
      category: "Council Tax / Utility Record",
      refCode: "REF: WD-2026-POA",
      status: "missing" as const,
      statusLabel: "REQUIRED",
    },
  ];

  return (
    <section id="documents" className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0052FF] font-mono">
            DOCUMENT REPOSITORY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-950 font-sans mt-1.5 leading-tight">
            Everything important. <br />
            <span className="text-[#0052FF]">In one place.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Essential UK contracting, trade, and compliance credentials structured into an audit-ready digital profile.
          </p>
        </div>

        {/* Sophisticated 2-column or 3-column Grid composition */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}

