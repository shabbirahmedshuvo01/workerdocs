# WorkerDocs

A modern, minimalist worker document and compliance management platform built for the UK workforce and aligned with the [StaffBeacon](https://staffbeacon.co.uk/) ecosystem.

---

## Product Overview

**WorkerDocs** is a digital credential and workforce compliance platform designed to help UK contractors, tradespeople, and agency workers maintain an audit-ready, single source of truth for their employment documentation.

Instead of repeatedly searching through emails, rescanning physical cards, or resubmitting identical compliance packets for every new placement or site induction, workers maintain a unified digital record of their verified credentials that can be presented instantly.

---

## Mission

To eliminate the friction of workforce compliance by providing every worker with a secure, organized, and permanent repository for their employment documents, trade qualifications, and compliance records — ensuring they are always ready whenever the next contract opportunity comes.

---

## Vision

To become the primary digital passport for UK workforce compliance: a platform where worker credentials (Right to Work, CSCS cards, DBS disclosures, trade diplomas, and site safety inductions) are verified once, continuously tracked for renewal, and shared with complete worker control across contractors and recruitment platforms.

---

## StaffBeacon Ecosystem

WorkerDocs is purpose-built to operate alongside **StaffBeacon** (`https://staffbeacon.co.uk/`), a leading UK workforce management and recruitment platform.

### Relationship & Separation of Concerns
* **StaffBeacon**: Connects businesses and recruitment agencies with qualified workers, managing shift assignments, placement scheduling, and client workforce requirements.
* **WorkerDocs**: The dedicated worker-facing credential vault. It empowers workers to own, organize, and monitor their compliance documents independently of any single agency.

```
┌─────────────────────────────────────────────────────────┐
│                    StaffBeacon Ecosystem                │
│                                                         │
│   ┌──────────────────┐           ┌──────────────────┐   │
│   │    WorkerDocs    │           │   StaffBeacon    │   │
│   │  (Worker Vault)  │ ────────> │   (Placements)   │   │
│   │  - RTW Sharecode │           │  - Shifts        │   │
│   │  - CSCS Cards    │           │  - Site Clearance│   │
│   │  - DBS Records   │           │  - Client Billing│   │
│   └──────────────────┘           └──────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

> [!NOTE]
> **Foundation State**: At this milestone, WorkerDocs features a StaffBeacon-aligned visual identity, design system, and commercial landing page. Live API integration and automated sync with StaffBeacon are planned for future backend milestones.

---

## Current Product Status

### What Exists Today (Completed Frontend Foundation)
* **Next.js 16 (App Router) Application**: Clean, modern architecture with strict TypeScript configuration and Tailwind CSS v4.
* **Commercial Public Landing Page (`/`)**: StaffBeacon-aligned landing page featuring 10 dedicated sections, high-fidelity UI previews (Liam Vance WRK-8921 profile, 92% readiness preview), and zero horizontal overflow.
* **Internal Design System Showcase (`/design-system`)**: Interactive component workshop featuring live UI primitives, color palettes, typographic scales, technical register marks, and status badge specifications.
* **Standardized Component Hierarchy**: Strict three-tier component separation (`ui/`, `shared/`, `pages/`).
* **Canonical Brand System**: Standardized `Logo` component, StaffBeacon blue accent (`#0052FF`), deep slate typography (`#09090B`), subtle `#F8FAFC` surfaces, and clean 6–10px radii.
* **Accessibility Enhancements**: Semantic HTML, ARIA progressbar attributes on readiness meters, and fully accessible accordion disclosures.

### What is Intentionally NOT Implemented Yet
To preserve architectural purity and prevent premature coupling, the following backend layers are intentionally postponed to subsequent milestones:
* **Authentication**: No login session management, cookies, or JWT verification.
* **Database & ORM**: No Prisma schema, migrations, or PostgreSQL instances.
* **API Endpoints**: No `/api/*` route handlers or mutation actions.
* **File Storage**: No S3/Blob storage uploads or file processing pipelines.
* **Real Verification**: Document statuses displayed in the UI are static demonstration mocks.

---

## Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | **Public** | Primary commercial landing page explaining the value proposition, workflow, document repository, compliance readiness, and ecosystem connection. |
| `/login` | **Public (Presentation)** | Dedicated sign-in entry flow with client-side form validation, focus states, and presentation loading states (no backend). |
| `/register` | **Public (Presentation)** | Dedicated account creation flow with UK trade selection, client-side validation, and compliance consent controls (no backend). |
| `/onboarding` | **Public (Presentation)** | Multi-step worker profile initialization and Right to Work compliance declaration flow (no backend). |
| `/privacy-policy` | **Public (Placeholder)** | Draft placeholder worker privacy policy and UK GDPR data disclosure. |
| `/cookie-policy` | **Public (Placeholder)** | Draft placeholder cookie policy and essential local storage classification. |
| `/terms` | **Public (Placeholder)** | Draft placeholder terms of service for UK worker compliance management. |
| `/design-system` | **Internal / Dev** | Interactive design system showcase and component workbench. **Intentionally hidden from public navigation.** Directly accessible via URL for engineering and design review. |

---

## Architecture & Directory Structure

WorkerDocs enforces a strict architectural boundary separating the routing layer from component composition:

```
workerdocs/
├── app/                               # Next.js App Router (Routing Layer ONLY)
│   ├── favicon.ico
│   ├── globals.css                    # Tailwind CSS v4 theme variables
│   ├── layout.tsx                     # Root layout with Geist & Geist Mono fonts
│   ├── page.tsx                       # Thin route -> delegates to <HomePage />
│   ├── login/
│   │   └── page.tsx                   # Thin route -> delegates to <LoginPage />
│   ├── register/
│   │   └── page.tsx                   # Thin route -> delegates to <RegisterPage />
│   ├── onboarding/
│   │   └── page.tsx                   # Thin route -> delegates to <OnboardingPage />
│   ├── privacy-policy/
│   │   └── page.tsx                   # Thin route -> delegates to <PrivacyPolicyPage />
│   ├── cookie-policy/
│   │   └── page.tsx                   # Thin route -> delegates to <CookiePolicyPage />
│   ├── terms/
│   │   └── page.tsx                   # Thin route -> delegates to <TermsPage />
│   └── design-system/
│       └── page.tsx                   # Thin route -> delegates to <DesignSystemPage />
│
├── components/
│   ├── ui/                            # Generic, headless/reusable UI primitives
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── document-card.tsx
│   │   ├── file-upload.tsx
│   │   ├── icons.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── stat-card.tsx
│   │   ├── status-badge.tsx
│   │   ├── textarea.tsx
│   │   └── index.ts
│   │
│   ├── shared/                        # Application-wide reusable layout & brand components
│   │   ├── Logo.tsx                   # Canonical WorkerDocs mark & typography
│   │   ├── Header.tsx                 # Public header with responsive mobile drawer
│   │   ├── Footer.tsx                 # Public multi-column footer
│   │   ├── AppHeader.tsx              # Authenticated worker navigation bar
│   │   └── index.ts
│   │
│   └── pages/                         # Page-level compositions & isolated subcomponents
│       ├── HomePage/                  # Root landing page composition
│       │   ├── HomePage.tsx           # Server Component composing the page
│       │   ├── Hero.tsx
│       │   ├── HeroComposition.tsx
│       │   ├── TrustStatement.tsx
│       │   ├── HowItWorks.tsx
│       │   ├── DocumentShowcase.tsx
│       │   ├── ReadinessSection.tsx
│       │   ├── SecuritySection.tsx
│       │   ├── StaffBeaconEcosystem.tsx
│       │   ├── FAQ.tsx                # Client leaf (accordion state)
│       │   ├── FinalCta.tsx
│       │   └── index.ts
│       │
│       ├── LoginPage/                 # Sign-in page composition
│       │   ├── LoginPage.tsx          # Server Component wrapper & layout
│       │   ├── LoginForm.tsx          # Client leaf (form validation & loading state)
│       │   └── index.ts
│       │
│       ├── RegisterPage/              # Registration page composition
│       │   ├── RegisterPage.tsx       # Server Component wrapper & layout
│       │   ├── RegisterForm.tsx       # Client leaf (trade select & form validation)
│       │   └── index.ts
│       │
│       ├── OnboardingPage/            # Worker onboarding sequence
│       │   ├── OnboardingPage.tsx     # Server Component wrapper & layout
│       │   ├── OnboardingWizard.tsx   # Client leaf (multi-step wizard & validation)
│       │   ├── StepIndicator.tsx      # Visual & accessible progress bar
│       │   ├── PostponedFieldsNotice.tsx # Deferred items context notice
│       │   └── index.ts
│       │
│       ├── PrivacyPolicyPage/         # Placeholder privacy policy
│       │   ├── PrivacyPolicyPage.tsx  # Server Component layout & draft content
│       │   └── index.ts
│       │
│       ├── CookiePolicyPage/          # Placeholder cookie policy
│       │   ├── CookiePolicyPage.tsx   # Server Component layout & draft content
│       │   └── index.ts
│       │
│       ├── TermsPage/                 # Placeholder terms of service
│       │   ├── TermsPage.tsx          # Server Component layout & draft content
│       │   └── index.ts
│       │
│       └── DesignSystemPage/          # Design system showcase composition
│           ├── DesignSystemPage.tsx   # Interactive client component
│           └── index.ts
│
├── docs/
│   ├── ARCHITECTURE.md                # Comprehensive technical engineering guide
│   └── PRODUCT_FLOW.md                # Product flows & frontend contracts
│
├── public/                            # Static public assets
├── package.json
├── tsconfig.json
└── README.md
```

---

## Component Philosophy: Page-Folder Convention

WorkerDocs adopts a self-contained **Page-Folder Convention**.

Instead of sprawling components across shared directories, every route delegates to a dedicated folder within `components/pages/`:

```tsx
// app/contact-us/page.tsx (Routing Layer: Thin Wrapper)
import { ContactUs } from "@/components/pages/ContactUs";

export default function Page() {
  return <ContactUs />;
}
```

```
components/pages/ContactUs/
├── ContactUs.tsx          # Main page component
├── ContactHero.tsx        # Page-specific section
├── ContactForm.tsx        # Page-specific section
└── index.ts               # Re-exports ContactUs
```

### Why this convention?
1. **Isolated Lifecycles**: A page can be refactored, redesigned, or completely deleted by touching only its dedicated folder and the corresponding route wrapper.
2. **Zero Global Pollution**: Supporting subcomponents that only exist on one page never leak into `components/shared/` or `components/ui/`.
3. **Clear Ownership**: Code reviewers and developers immediately know where a visual section lives.

---

## SSR / CSR Philosophy

WorkerDocs strictly adheres to **Server Components by default**:
* `HomePage.tsx` and 9 of its 10 sections are **React Server Components (RSC)**. They render to static HTML at build time, producing zero client-side JavaScript overhead.
* The `"use client"` directive is restricted to small, isolated leaf nodes that genuinely require browser interaction:
  * `Header.tsx`: Needs client state for the mobile navigation drawer toggle.
  * `FAQ.tsx`: Needs client state for accordion expansion/collapse.
  * `FileUpload.tsx`: Needs browser Drag-and-Drop and FileList event handlers.
  * `DesignSystemPage.tsx`: Interactive preview workshop toggling tabs and dynamic form controls.

```
HomePage (RSC - Server Component)
 ├── Header (Client Leaf: mobile drawer state)
 ├── Hero (RSC)
 ├── TrustStatement (RSC)
 ├── HowItWorks (RSC)
 ├── DocumentShowcase (RSC)
 ├── ReadinessSection (RSC)
 ├── SecuritySection (RSC)
 ├── StaffBeaconEcosystem (RSC)
 ├── FAQ (Client Leaf: accordion state)
 ├── FinalCta (RSC)
 └── Footer (RSC - Server Component)
```

---

## Design System Foundation

The design system reflects Liam's requirements: ultra-clean, white-first, modern, and aligned with StaffBeacon.

* **Primary Accent**: StaffBeacon Blue (`#0052FF`, hover `#0047e0`).
* **Surfaces**: Pure White (`#FFFFFF`), subtle muted canvas (`#FAFAFA`, `#F8FAFC`).
* **Typography**:
  * Body & Headlines: `Geist Sans` (`--font-sans`).
  * Metadata, Codes & Badges: `Geist Mono` (`--font-mono`).
* **Borders & Radii**:
  * Precision borders: 1px hairline zinc/gray (`#E4E4E7`, `#F0F0F2`).
  * Corner radius: Restrained 6px (`rounded-md`), 8px (`rounded-lg`), 12px (`rounded-xl`). No excessive capsule pills.
* **Technical Accents**: Precision corner crosshairs (`+`) and technical labels (`[REF: WD-2026]`, `WORKERDOCS / UK`) used sparingly for an authentic compliance product feel.

---

## Development Setup

### Prerequisites
* Node.js >= 18.18 (Node.js 20+ recommended)
* npm, pnpm, or yarn

### Available Commands

```powershell
# Install dependencies
npm install

# Start local development server (with Turbopack)
npm run dev

# Run ESLint validation
npm run lint

# Build production bundle with type-checking
npm run build

# Start production server
npm start
```

### Windows Shell Notes
When executing commands on Windows PowerShell:
* Use `npm.cmd run build` or `npm run build`.
* Paths in import aliases use forward slashes (`@/components/...`).

---

## Project Roadmap

| Phase | Milestone | Status | Description |
|---|---|---|---|
| **Phase 1** | **Design System & UI Foundation** | Completed | Reusable UI primitives, typographic scale, color tokens, and design showcase. |
| **Phase 2** | **Production Landing Page** | Completed | 10-section commercial landing page aligned with StaffBeacon ecosystem. |
| **Phase 3** | **Architecture & Documentation** | Completed | Thin App Router routes, page-folder pattern, canonical Logo, a11y improvements, and engineering blueprints. |
| **Phase 4** | **Worker Authentication UI** | Completed | Dedicated presentation-only `/login` and `/register` entry flows with form validation and loading states. |
| **Phase 5** | **Worker Onboarding & Compliance** | Completed | Multi-step worker profile initialization, Right to Work statutory declaration, and CSCS input flow. |
| **Phase 6** | **Worker Dashboard & Command Center** | Next | Operational command center, readiness score meter, and action requirement cards. |
| **Phase 7** | **Document Vault & Upload UI** | Upcoming | Document upload interface, category filtering, status review trail, and preview modals. |
| **Phase 8** | **Backend, Prisma & Database** | Future | PostgreSQL schema, Prisma migrations, document file storage, and StaffBeacon API integration. |
