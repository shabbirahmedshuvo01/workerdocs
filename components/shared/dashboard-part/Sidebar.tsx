"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────
const icons = {
  dashboard: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
    />
  ),
  documents: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  ),
  onboarding: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  designSystem: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
    />
  ),
  audit: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
    />
  ),
  profile: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  ),
  logout: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
    />
  ),
  close: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  ),
};

type IconKey = keyof typeof icons;

function Icon({ name, className = "h-5 w-5" }: { name: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

// ── Nav items ─────────────────────────────────────────────────────────────
const navItems: { label: string; href: string; icon: IconKey; badge?: string }[] = [
  { label: "Overview", href: "/dashboard", icon: "dashboard", badge: "Live" },
  { label: "Document Vault", href: "/dashboard/documents", icon: "documents", badge: "12" },
  { label: "Worker Profile", href: "/profile", icon: "profile" },
  { label: "Audit & Sharing", href: "/audit", icon: "audit", badge: "Sync" },
  { label: "Onboarding Setup", href: "/onboarding", icon: "onboarding" },
  { label: "Design System", href: "/design-system", icon: "designSystem" },
];

export interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const prevPathnameRef = useRef(pathname);

  // Close mobile drawer ONLY when the route actually changes
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (onCloseMobile) {
        onCloseMobile();
      }
    }
  }, [pathname, onCloseMobile]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen && onCloseMobile) {
        onCloseMobile();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, onCloseMobile]);

  // Sidebar content (shared between desktop and mobile)
  const renderContent = (isMobileView: boolean) => {
    const isCollapsed = !isMobileView && collapsed;

    return (
      <div className="flex h-full flex-col justify-between">
        {/* Top brand + Navigation */}
        <div>
          {/* Brand header */}
          <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded-lg"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0052FF] text-sm font-bold text-white shadow-xs"
                aria-hidden="true"
              >
                W<span className="text-blue-200">.</span>
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-[15px] font-extrabold tracking-tight text-white font-sans">
                    Worker<span className="text-[#0052FF]">Docs</span>
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                    Worker Portal
                  </span>
                </div>
              )}
            </Link>

            {/* Mobile close button */}
            {isMobileView && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
                aria-label="Close navigation menu"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 px-3 py-4" aria-label="Main Navigation">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href === "/dashboard" && pathname === "/dashboard");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  onClick={isMobileView ? onCloseMobile : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold transition-all ${
                    active
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-100"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {active && (
                      <span
                        className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-[#0052FF]"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`shrink-0 transition-colors ${
                        active ? "text-[#0052FF]" : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      <Icon name={item.icon} className="h-4.5 w-4.5" />
                    </span>
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!isCollapsed && item.badge && (
                    <span
                      className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                        active
                          ? "bg-[#0052FF]/20 text-blue-300 border border-blue-500/30"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700/50"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile + Logout */}
        <div className="border-t border-zinc-800 p-3 space-y-2">
          {/* Worker profile badge */}
          <div
            className={`flex items-center gap-3 rounded-lg bg-zinc-900/80 p-2 border border-zinc-800/80 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0052FF] text-xs font-bold text-white shadow-xs">
              LV
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-xs font-bold text-white">Liam Vance</p>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">92%</span>
                </div>
                <p className="truncate text-[10px] font-mono text-zinc-400">WRK-8921 • Tier 1</p>
              </div>
            )}
          </div>

          {/* Sign Out link */}
          <Link
            href="/login"
            title={isCollapsed ? "Sign Out" : undefined}
            onClick={isMobileView ? onCloseMobile : undefined}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-colors ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Icon name="logout" className="h-4 w-4 shrink-0 text-rose-400" />
            {!isCollapsed && <span>Sign Out (Demo)</span>}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ── Desktop Sidebar (>= lg) ─────────────────────────────────── */}
      <aside
        className={`relative hidden lg:flex h-screen shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 text-zinc-300 transition-all duration-200 z-30 select-none ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {renderContent(false)}

        {/* Desktop Collapse Toggle Button */}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 shadow-sm transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={`h-3.5 w-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* ── Mobile Drawer (< lg) ────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-40 bg-zinc-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Slide-over Drawer */}
          <aside
            className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-zinc-950 text-zinc-300 shadow-2xl border-r border-zinc-800 animate-in slide-in-from-left duration-200 select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {renderContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}