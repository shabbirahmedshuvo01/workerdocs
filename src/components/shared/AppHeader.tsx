"use client";

import React from "react";
import { IconShieldCheck, IconUser } from "@/components/ui/icons";
import { Logo } from "./Logo";

export interface NavItem {
  id: string;
  label: string;
  active?: boolean;
}

export interface AppHeaderProps {
  currentTab?: string;
  onTabChange?: (id: string) => void;
  workerName?: string;
  workerCode?: string;
  className?: string;
}

export function AppHeader({
  currentTab = "overview",
  onTabChange,
  workerName = "Liam Vance",
  workerCode = "WRK-8921",
  className = "",
}: AppHeaderProps) {
  const tabs: NavItem[] = [
    { id: "overview", label: "Overview", active: currentTab === "overview" },
    { id: "documents", label: "Documents", active: currentTab === "documents" },
    { id: "profile", label: "Worker Profile", active: currentTab === "profile" },
    {
      id: "trail",
      label: "Audit & Compliance",
      active: currentTab === "trail",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity with canonical Logo */}
        <div className="flex items-center gap-6">
          <Logo size="sm" tag="UK//2026" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-4" aria-label="Worker Navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange && onTabChange(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  tab.active
                    ? "bg-zinc-100 text-zinc-950 font-semibold"
                    : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Authenticated Worker Profile Capsule */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-zinc-50 border border-zinc-200 rounded-md">
            <span className="text-emerald-600 flex items-center" aria-hidden="true">
              <IconShieldCheck size={13} />
            </span>
            <span className="font-mono text-[11px] font-medium text-zinc-700">
              {workerCode}
            </span>
            <span className="text-zinc-300" aria-hidden="true">|</span>
            <span className="font-sans text-xs text-zinc-600 font-medium">
              {workerName}
            </span>
          </div>

          <div
            className="h-8 w-8 rounded-full border border-zinc-200 bg-zinc-100 text-zinc-700 flex items-center justify-center text-xs font-medium font-sans"
            aria-label={`Signed in as ${workerName}`}
          >
            <IconUser size={15} />
          </div>
        </div>
      </div>
    </header>
  );
}

