"use client";

import { AppHeader } from "@/components/shared";

import React, { useState } from "react";
import {
  Button,
  Badge,
  StatusBadge,
  Input,
  Select,
  Textarea,
  Checkbox,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  DocumentCard,
  StatCard,
  FileUpload,
  IconDownload,
  IconUpload,
  IconPlus,
  IconArrowUpRight,
} from "@/components/ui";

export function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [testInput, setTestInput] = useState("");
  const [testSelect, setTestSelect] = useState("rtw");
  const [testCheckbox, setTestCheckbox] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B]">
      {/* 1. Navigation Prototype */}
      <AppHeader
        currentTab={activeTab}
        onTabChange={setActiveTab}
        workerName="Liam Vance"
        workerCode="WRK-8921"
      />

      {/* Hero Header with subtle futuristic micro-grid */}
      <section className="border-b border-zinc-200 bg-white bg-subtle-grid py-10 sm:py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded">
                  Design System v0.1
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  SYS//SPEC-2026
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-sans">
                WorkerDocs Design System & UI Spec
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
                Ultra-minimalist, modern, and futuristic frontend foundation.
                Built with a white-first aesthetic, crisp typography, precision
                technical register marks, and a single restrained cobalt accent.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant={buttonLoading ? "secondary" : "primary"}
                size="md"
                onClick={() => setButtonLoading(!buttonLoading)}
                iconLeft={buttonLoading ? undefined : <IconPlus size={15} />}
              >
                {buttonLoading ? "Loading State Active" : "Toggle Button Loading"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Showcase Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
        {/* SECTION 1: Summary Metric Cards */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                01 // Summary Metrics
              </span>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 mt-0.5">
                Workforce Readiness Indicators
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline-block">
              [STAT_CARDS]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatCard
              label="Compliance Readiness"
              value="80%"
              indicator="success"
              progressPercent={80}
              tag="TIER-1"
              helperText="4 of 5 mandatory UK workforce documents verified"
            />
            <StatCard
              label="Documents on File"
              value="4 / 5"
              indicator="neutral"
              progressPercent={80}
              tag="AUDIT-OK"
              helperText="Last document verified 2 days ago"
            />
            <StatCard
              label="Action Required"
              value="1 Missing"
              indicator="error"
              progressPercent={20}
              tag="URGENT"
              helperText="Upload valid Driving Licence to reach 100% compliance"
            />
          </div>
        </section>

        {/* SECTION 2: Document Management Cards */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                02 // Core Pattern
              </span>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 mt-0.5">
                Worker Document Cards
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline-block">
              [DOC_VAULT]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DocumentCard
              id="doc-1"
              title="Right to Work (Share Code)"
              category="Home Office Verification"
              refCode="REF: RTW-9021"
              status="complete"
              statusLabel="VERIFIED"
              fileType="PDF"
              fileSize="1.2 MB"
              updatedAt="18 Sep 2026"
              expiresAt="Indefinite"
              onView={() => alert("Previewing Right to Work document")}
              onDownload={() => alert("Downloading document")}
              onUpload={() => alert("Replacing document")}
            />

            <DocumentCard
              id="doc-2"
              title="CSCS Labourer Card"
              category="Construction Skills Certification"
              refCode="REF: CSC-4410"
              status="review"
              statusLabel="RENEWAL DUE"
              fileType="PDF"
              fileSize="840 KB"
              updatedAt="10 Aug 2024"
              expiresAt="24 Oct 2026"
              onView={() => alert("Previewing CSCS card")}
              onUpload={() => alert("Uploading renewal")}
            />

            <DocumentCard
              id="doc-3"
              title="Enhanced DBS Certificate"
              category="Criminal Record Check"
              refCode="REF: DBS-1092"
              status="uploaded"
              fileType="PDF"
              fileSize="3.4 MB"
              updatedAt="Today, 14:20"
              onView={() => alert("Previewing DBS certificate")}
              onUpload={() => alert("Replacing certificate")}
            />

            <DocumentCard
              id="doc-4"
              title="UK Driving Licence (Photocard)"
              category="Identity & Mobility Proof"
              refCode="REF: ID-0014"
              status="missing"
              statusLabel="REQUIRED"
              onUpload={() => alert("Initiate Driving Licence upload")}
            />
          </div>
        </section>

        {/* SECTION 3: Status Language & Badges */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                03 // Compliance Status UI
              </span>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 mt-0.5">
                Technical Status Badges & Pips
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline-block">
              [SEMANTICS]
            </span>
          </div>

          <Card variant="technical">
            <CardHeader>
              <CardTitle>Compliance States Matrix</CardTitle>
              <CardDescription>
                WorkerDocs uses geometric micro-pips and monospace uppercase
                tags for unambiguous, high-trust verification states.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono mb-3">
                    Standard Size
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status="complete" />
                    <StatusBadge status="pending" />
                    <StatusBadge status="missing" />
                    <StatusBadge status="review" />
                    <StatusBadge status="uploaded" />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono mb-3">
                    Compact Size (Tables & Card Headers)
                  </h4>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <StatusBadge status="complete" size="sm" />
                    <StatusBadge status="pending" size="sm" />
                    <StatusBadge status="missing" size="sm" />
                    <StatusBadge status="review" size="sm" />
                    <StatusBadge status="uploaded" size="sm" />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono mb-3">
                    Neutral & Accent System Badges
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="default">SYSTEM DEFAULT</Badge>
                    <Badge variant="accent">COBALT ACCENT</Badge>
                    <Badge variant="neutral">AUDIT LOG</Badge>
                    <Badge variant="outline">EXTERNAL VERIFIER</Badge>
                    <Badge variant="success">PASSED</Badge>
                    <Badge variant="warning">FLAGGED</Badge>
                    <Badge variant="error">REJECTED</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SECTION 4: Interactive Form Controls & Dropzone */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                04 // Form Architecture
              </span>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 mt-0.5">
                Inputs, Dropzone & Form Elements
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline-block">
              [CONTROLS]
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Specimen */}
            <Card variant="technical">
              <CardHeader>
                <CardTitle>Worker Details & Metadata</CardTitle>
                <CardDescription>
                  Clean input fields with 1px hairline borders, crisp focus
                  outlines, and structured helper states.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="National Insurance / Tax Reference"
                  required
                  placeholder="QQ 12 34 56 A"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  helperText="Required for PAYE and HMRC compliance reporting"
                />

                <Input
                  label="Worker System Identifier"
                  prefixText="UK-"
                  placeholder="8921-440"
                  defaultValue="8921-440"
                  helperText="Internal compliance reference code"
                />

                <Select
                  label="Document Category"
                  required
                  value={testSelect}
                  onChange={(e) => setTestSelect(e.target.value)}
                  options={[
                    { value: "rtw", label: "Right to Work Verification" },
                    { value: "cscs", label: "Construction Skills (CSCS/CPCS)" },
                    { value: "dbs", label: "Criminal Record Check (DBS)" },
                    { value: "id", label: "Government Photo ID" },
                  ]}
                />

                <Textarea
                  label="Compliance Notes / Verification Remarks"
                  placeholder="Add any relevant verification notes or exception flags..."
                  rows={3}
                  helperText="Visible to compliance officers and worker"
                />

                <div className="pt-2">
                  <Checkbox
                    id="declaration"
                    label="Worker Declaration"
                    description="I confirm the uploaded documents are genuine and valid under UK workforce compliance regulations."
                    checked={testCheckbox}
                    onChange={(e) => setTestCheckbox(e.target.checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <span className="font-mono text-[11px]">FORM_STATE: VALID</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reset
                  </Button>
                  <Button variant="primary" size="sm">
                    Save Draft
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Dropzone & Error / Disabled States */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Dropzone</CardTitle>
                  <CardDescription>
                    White-first dropzone with drag-over indicator and upload
                    preview state.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    label="Upload Verification Document"
                    helperText="PDF, PNG, or JPG files up to 15MB"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Error & Disabled Input States</CardTitle>
                  <CardDescription>
                    Explicit validation messaging and disabled UI states.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Passport Number (Simulated Error)"
                    defaultValue="INVALID_123"
                    error="Passport number format is invalid (expected 9 digits)"
                  />
                  <Input
                    label="HMRC Gateway Token (Disabled)"
                    defaultValue="RESTRICTED_TOKEN_890"
                    disabled
                    helperText="This field is managed by the organisation administrator"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 5: Button Matrix & Action System */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                05 // Actions
              </span>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 mt-0.5">
                Button Matrix & Interactive States
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline-block">
              [BUTTONS]
            </span>
          </div>

          <Card variant="technical">
            <CardContent className="space-y-6 pt-5">
              {/* Variants */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono mb-3">
                  Button Variants (Medium Size)
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" isLoading={buttonLoading}>
                    Primary Action
                  </Button>
                  <Button variant="secondary" isLoading={buttonLoading}>
                    Secondary Action
                  </Button>
                  <Button variant="outline" isLoading={buttonLoading}>
                    Outline Action
                  </Button>
                  <Button variant="ghost" isLoading={buttonLoading}>
                    Ghost Action
                  </Button>
                  <Button variant="destructive" isLoading={buttonLoading}>
                    Destructive Action
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled Action
                  </Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-4 border-t border-zinc-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono mb-3">
                  Size Hierarchy
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    iconLeft={<IconPlus size={13} />}
                  >
                    Small (32px)
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    iconLeft={<IconPlus size={15} />}
                  >
                    Medium (36px)
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    iconLeft={<IconPlus size={16} />}
                  >
                    Large (44px)
                  </Button>
                </div>
              </div>

              {/* Icon Buttons */}
              <div className="pt-4 border-t border-zinc-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono mb-3">
                  Contextual Actions with Icons
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconLeft={<IconUpload size={13} />}
                  >
                    Upload New
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    iconLeft={<IconDownload size={13} />}
                  >
                    Export ZIP
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconRight={<IconArrowUpRight size={13} />}
                  >
                    Home Office Portal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SECTION 6: Distinctive Futuristic Signature Specimen */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                06 // Identity Signature
              </span>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 mt-0.5">
                Precision Register Marks & Monospace Indexing
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline-block">
              [SIGNATURE]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="technical" className="p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-blue-600 font-semibold">
                  SIGNATURE ELEM 01
                </span>
                <span className="font-mono text-[10px] text-zinc-400">
                  COORDINATE REGISTER
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mt-3 font-sans">
                Hairline Corner Crosshairs
              </h3>
              <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                Subtle hairline &ldquo;+&rdquo; registration markers appear at container
                vertices. This evokes surgical precision, technical compliance,
                and architectural blueprints without cluttering the clean white
                aesthetic.
              </p>
              <div className="mt-5 p-3.5 bg-zinc-50 border border-zinc-200 rounded font-mono text-xs text-zinc-600 flex items-center justify-between">
                <span>CLASS: .tech-crosshair-container</span>
                <span className="text-zinc-400">+</span>
              </div>
            </Card>

            <Card variant="technical" className="p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-blue-600 font-semibold">
                  SIGNATURE ELEM 02
                </span>
                <span className="font-mono text-[10px] text-zinc-400">
                  METRIC INDEX
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mt-3 font-sans">
                Monospace Audit & Document Indexing
              </h3>
              <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                Worker documents, metadata, and status badges utilise Geist
                Mono in restrained micro-tags (e.g. <code>[RTW-9021]</code>).
                This ensures high-contrast clarity and instant scannability for
                workforce compliance audits.
              </p>
              <div className="mt-5 p-3.5 bg-zinc-50 border border-zinc-200 rounded font-mono text-xs text-zinc-600 flex items-center justify-between">
                <span>SPEC: Geist Mono 11px uppercase</span>
                <span className="text-emerald-600 font-semibold">[VERIFIED]</span>
              </div>
            </Card>
          </div>
        </section>

        {/* SECTION 7: Typography & Color Palette Reference */}
        <section className="pb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                07 // Design Tokens
              </span>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 mt-0.5">
                Typography & Color Palette
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline-block">
              [TOKENS]
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Typography Scale */}
            <Card>
              <CardHeader>
                <CardTitle>Typography Scale</CardTitle>
                <CardDescription>
                  Geist Sans for crisp product UI hierarchy; Geist Mono for
                  technical indices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="pb-3 border-b border-zinc-100 flex items-baseline justify-between">
                  <div>
                    <div className="text-2xl font-bold text-zinc-950 font-sans tracking-tight">
                      Page Title H1
                    </div>
                    <div className="text-xs text-zinc-400">28-32px / Bold / -0.02em</div>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">text-3xl</span>
                </div>

                <div className="pb-3 border-b border-zinc-100 flex items-baseline justify-between">
                  <div>
                    <div className="text-xl font-semibold text-zinc-900 font-sans tracking-tight">
                      Section Header H2
                    </div>
                    <div className="text-xs text-zinc-400">20px / Semibold / -0.015em</div>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">text-xl</span>
                </div>

                <div className="pb-3 border-b border-zinc-100 flex items-baseline justify-between">
                  <div>
                    <div className="text-base font-semibold text-zinc-900 font-sans">
                      Card Title H3
                    </div>
                    <div className="text-xs text-zinc-400">16px / Semibold / -0.01em</div>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">text-base</span>
                </div>

                <div className="pb-3 border-b border-zinc-100 flex items-baseline justify-between">
                  <div>
                    <div className="text-sm text-zinc-600 font-sans">
                      Body text for descriptions and guidelines.
                    </div>
                    <div className="text-xs text-zinc-400">14px / Regular / Leading 1.5</div>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">text-sm</span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-xs font-mono font-medium text-zinc-600 uppercase tracking-wider">
                      Technical Label & Metadata
                    </div>
                    <div className="text-xs text-zinc-400">11-12px / Monospace / Tracking 0.05em</div>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">font-mono</span>
                </div>
              </CardContent>
            </Card>

            {/* Color Swatches */}
            <Card>
              <CardHeader>
                <CardTitle>Color Foundations</CardTitle>
                <CardDescription>
                  White-first monochromatic foundation with one restrained
                  precision cobalt accent.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded border border-zinc-100">
                  <div className="h-8 w-14 rounded bg-[#FFFFFF] border border-zinc-300 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-zinc-900">
                      Canvas & Surface White
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500">
                      #FFFFFF / #FAFAFA
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">
                    FOUNDATION
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded border border-zinc-100">
                  <div className="h-8 w-14 rounded bg-[#09090B] shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-zinc-900">
                      Foreground & Primary Near-Black
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500">
                      #09090B (Zinc 950)
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">
                    CONTRAST
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded border border-zinc-100">
                  <div className="h-8 w-14 rounded bg-[#0052FF] shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-zinc-900">
                      Precision Cobalt Accent
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500">
                      #0052FF (Interactive)
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-blue-600 font-semibold">
                    ACCENT
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded border border-zinc-100">
                  <div className="h-8 w-14 rounded bg-[#E4E4E7] shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-zinc-900">
                      Hairline Border Neutral
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500">
                      #E4E4E7 / #F4F4F5
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">
                    STRUCTURE
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Showcase Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500 font-mono">
        WorkerDocs Foundation · Step 1 UI Spec Complete · Next.js 16 App Router
      </footer>
    </div>
  );
}
