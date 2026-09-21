# WorkerDocs — Engineering Architecture Guide

This document outlines the architectural standards, design principles, and component conventions governing the WorkerDocs codebase. All contributors and agents modifying WorkerDocs must follow these specifications.

---

## 1. Core Architectural Principles

1. **Separation of Routing & Composition**: The `app/` directory handles routing, route segments, metadata, and data loading boundaries. It must never contain large visual layouts or direct component styling.
2. **Predictable Component Ownership**: Every component belongs to one of three strictly defined layers: `ui/`, `shared/`, or `pages/`.
3. **Server Components by Default**: All components are React Server Components (RSC) unless dynamic client-side state, event handlers, or browser APIs are strictly required.
4. **Isolated Page Lifecycles**: Each application page resides in a dedicated self-contained folder under `components/pages/`, making pages easy to evolve, test, refactor, or delete without collateral impact.
5. **No Premature Backend Leaks**: Frontend visual layers and presentation components must remain agnostic of backend databases, ORMs, and network drivers.

---

## 2. Directory Hierarchy & Taxonomy

```
workerdocs/
├── app/                      # LAYER 1: Routing Layer (Thin wrappers only)
├── components/
│   ├── ui/                   # LAYER 2: Headless & Generic UI Primitives
│   ├── shared/               # LAYER 3: Application-Wide Layout & Brand Elements
│   └── pages/                # LAYER 4: Page Compositions & Isolated Subcomponents
└── docs/                     # Architectural Documentation
```

### Layer 1: App Router (`app/`)
* **Responsibility**: Defines URL paths, layouts, route segment configs, dynamic parameters, and metadata.
* **Rule**: App Router files (`page.tsx`) must be **thin wrappers** (typically under 20 lines) that delegate directly to a Page Component.
* **Example**:
  ```tsx
  // app/page.tsx
  import { Metadata } from "next";
  import { HomePage } from "@/components/pages/HomePage";

  export const metadata: Metadata = {
    title: "WorkerDocs — Your work documents. Always ready.",
  };

  export default function Page() {
    return <HomePage />;
  }
  ```

### Layer 2: UI Primitives (`components/ui/`)
* **Responsibility**: Low-level, domain-agnostic UI building blocks (design tokens, buttons, form controls, badges, cards).
* **Rule**: Must be generic. **Zero domain business logic** (no knowledge of "Liam Vance", "Right to Work", or specific product workflows).
* **Current Catalog**:
  * `button.tsx` (Button with primary, secondary, accent, white, outline, ghost variants and `asChild` support)
  * `card.tsx` (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
  * `badge.tsx` (Badge with color variants and icon support)
  * `status-badge.tsx` (ComplianceStatus badge with verified, pending, missing, review, uploaded states)
  * `document-card.tsx` (Configurable document record card)
  * `stat-card.tsx` (Metric card with progress indicator)
  * `input.tsx`, `select.tsx`, `textarea.tsx`, `checkbox.tsx`, `label.tsx`
  * `file-upload.tsx` (Drag-and-drop file upload zone)
  * `icons.tsx` (Curated SVG icon set)

### Layer 3: Shared Components (`components/shared/`)
* **Responsibility**: Components that appear across multiple pages and represent persistent global application structures.
* **Rule**: Only place a component here if it is genuinely reused across at least two distinct pages.
* **Current Catalog**:
  * `Logo.tsx`: Canonical brand wordmark and mark with size and variant controls.
  * `Header.tsx`: Public navigation bar with responsive mobile menu.
  * `Footer.tsx`: Public multi-column footer with legal and ecosystem links.
  * `AppHeader.tsx`: Authenticated worker navigation bar with status capsule.

### Layer 4: Page Component Folders (`components/pages/`)
* **Responsibility**: Full page layouts, page narratives, and page-specific subcomponents.
* **Rule**: Each page has a dedicated folder. Supporting subcomponents that only exist on that page must live inside that folder, NOT in `components/shared/`.
* **Current Catalog**:
  * `HomePage/`: The root landing page (`HomePage.tsx`, `Hero.tsx`, `HeroComposition.tsx`, `TrustStatement.tsx`, `HowItWorks.tsx`, `DocumentShowcase.tsx`, `ReadinessSection.tsx`, `SecuritySection.tsx`, `StaffBeaconEcosystem.tsx`, `FAQ.tsx`, `FinalCta.tsx`).
  * `DesignSystemPage/`: The internal design system workshop (`DesignSystemPage.tsx`).
  * `LoginPage/`: Presentation-only sign-in page (`LoginPage.tsx` [RSC], `LoginForm.tsx` [Client leaf], `index.ts`).
  * `RegisterPage/`: Presentation-only account creation page (`RegisterPage.tsx` [RSC], `RegisterForm.tsx` [Client leaf], `index.ts`).
  * `OnboardingPage/`: Presentation-only onboarding sequence (`OnboardingPage.tsx` [RSC], `OnboardingWizard.tsx` [Client leaf], `StepIndicator.tsx`, `PostponedFieldsNotice.tsx`, `index.ts`).

---

## 3. Decision Matrix: Where Does a Component Belong?

When creating or refactoring a component, use this decision tree:

```
Is it a generic, reusable HTML/CSS primitive without product context?
  ├── YES ──> components/ui/ (e.g. Button, Input, StatusBadge)
  └── NO
       │
       Is it an application-wide element used across multiple different pages?
         ├── YES ──> components/shared/ (e.g. Logo, Header, Footer, AppHeader)
         └── NO
              │
              Is it part of a specific page flow or section?
                └── YES ──> components/pages/[PageName]/ (e.g. Hero.tsx, DocumentShowcase.tsx)
```

---

## 4. Server vs. Client Component Rules (SSR / CSR)

WorkerDocs follows the Next.js principle of **pushing client boundaries to leaf nodes**.

| Component Type | Rendering Mode | Directive | When to Use |
|---|---|---|---|
| **Page Wrapper** (`app/**/page.tsx`) | Server Component | None | Always Server Components. Enables static prerendering. |
| **Page Composition** (`components/pages/**/[Page].tsx`) | Server Component | None | Default. Assembles static sections and passes data down. |
| **Static Sections** (`Hero.tsx`, `DocumentShowcase.tsx`) | Server Component | None | Always Server Components. Pure visual rendering. |
| **Interactive Leaf** (`FAQ.tsx`, `Header.tsx`) | Client Component | `"use client"` | When user interaction requires `useState`, `useEffect`, or event listeners. |

### Client Boundary Checklist
1. **Never** put `"use client"` at the top of a page file (`app/page.tsx` or `HomePage.tsx`) just because a single child component has an interactive button.
2. If only one small part of a section is interactive (e.g., mobile hamburger button or accordion), isolate that state into a client leaf node and keep the parent a Server Component.
3. `"use client"` must always be the first line of the file, preceding all imports.

---

## 5. Naming & Import Conventions

### Naming Conventions
* **Directories**:
  * `components/ui/`: `kebab-case.tsx` (`status-badge.tsx`, `document-card.tsx`).
  * `components/shared/`: `PascalCase.tsx` (`Logo.tsx`, `Header.tsx`, `Footer.tsx`).
  * `components/pages/[PageName]/`: `PascalCase` directory (`HomePage/`, `DesignSystemPage/`).
  * Main page file inside folder: Matches folder name exactly (`HomePage.tsx` inside `HomePage/`).
  * Exported component function: Matches file name exactly (`export function HomePage()`).

### Import Conventions
* Always use the root alias `@/`:
  ```tsx
  // Preferred
  import { Button } from "@/components/ui/button";
  import { Logo } from "@/components/shared";
  import { HomePage } from "@/components/pages/HomePage";

  // Disallowed
  import { Button } from "../../ui/button";
  ```
* Barrel files (`index.ts`) are used in `components/shared/`, `components/ui/`, and each `components/pages/[PageName]/` folder for clean public exports.

---

## 6. Accessibility (a11y) Standards

1. **Progress Indicators**:
   * All progress bars (e.g., readiness meter, stat progress) must provide:
     * `role="progressbar"`
     * `aria-valuenow={percentage}`
     * `aria-valuemin={0}`
     * `aria-valuemax={100}`
     * `aria-label="Descriptive name"`
2. **Accordion / Disclosure Components**:
   * Accordion triggers must have:
     * `aria-expanded={isOpen}`
     * `aria-controls={panelId}`
     * Matching `id={triggerId}`
   * Accordion content panels must have:
     * `id={panelId}`
     * `role="region"`
     * `aria-labelledby={triggerId}`
3. **Mobile Menus & Drawers**:
   * Triggers must supply `aria-expanded={isOpen}`, `aria-controls={menuId}`, and a clear `aria-label`.
4. **Decorative Graphics**:
   * All ambient background glows, blur orbs, and decorative icons must carry `aria-hidden="true"`.

---

## 7. How to Add a New Page (Step-by-Step)

Suppose you need to add a **Worker Login** page (`/login`).

### Step 1: Create the Page Component Directory
Create `components/pages/LoginPage/`:
```
components/pages/LoginPage/
├── LoginPage.tsx        # Main page composition
├── LoginForm.tsx        # Isolated page subcomponent
└── index.ts             # Exports LoginPage
```

### Step 2: Implement the Page Component
```tsx
// components/pages/LoginPage/LoginPage.tsx
import React from "react";
import { Header, Footer } from "@/components/shared";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
```

```typescript
// components/pages/LoginPage/index.ts
export * from "./LoginPage";
```

### Step 3: Create the Thin App Router Route
Create `app/login/page.tsx`:
```tsx
// app/login/page.tsx
import { Metadata } from "next";
import { LoginPage } from "@/components/pages/LoginPage";

export const metadata: Metadata = {
  title: "Sign In — WorkerDocs",
  description: "Access your verified worker document profile.",
};

export default function Page() {
  return <LoginPage />;
}
```

---

## 8. How to Safely Remove or Replace a Page

Because of the Page-Folder convention, removing a page is clean and zero-risk:
1. Delete the route segment: `app/[route-name]/`
2. Delete the dedicated page folder: `components/pages/[PageName]/`
3. Verify via `npm run build` and `npm run lint`. No dangling imports will exist because no other page imports from another page's folder.

---

## 9. Future Backend Integration Boundaries

When Prisma, PostgreSQL, and authentication are integrated in future milestones:
* **Server Actions / Route Handlers**: Place mutations and database queries in dedicated action files (e.g., `lib/actions/` or `app/api/`).
* **Data Fetching**: Fetch data inside Server Components at the App Router or Page Component level, then pass plain typed props into presentation subcomponents.
* **Component Purity**: UI primitives in `components/ui/` must remain completely unaware of Prisma models, SQL queries, or session tokens.

