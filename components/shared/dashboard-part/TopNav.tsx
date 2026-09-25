"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconShieldCheck,
  IconUser,
  IconClock,
} from "@/components/ui/icons";

export interface TopNavProps {
  onOpenMobileMenu?: () => void;
}

export default function TopNav({ onOpenMobileMenu }: TopNavProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setNotifOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const notifications = [
    {
      title: "Right-to-Work Sharecode Verified",
      time: "2 hours ago",
      type: "success",
    },
    {
      title: "CSCS Gold Card renewal due in 45 days",
      time: "1 day ago",
      type: "warning",
    },
    {
      title: "Balfour Beatty requested site induction verification",
      time: "3 days ago",
      type: "info",
    },
  ];

  return (
    <header className="flex h-16 lg:h-18 w-full shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-3 sm:px-6 lg:px-8 select-none">
      {/* Left section: Mobile hamburger + Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden -ml-1 p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] shrink-0"
          aria-label="Open navigation menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Breadcrumb Path */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm min-w-0 truncate">
          <span className="font-mono text-zinc-400 font-medium hidden sm:inline shrink-0">
            WorkerDocs
          </span>
          <span className="text-zinc-300 hidden sm:inline shrink-0" aria-hidden="true">
            /
          </span>
          <span className="font-semibold text-zinc-900 font-sans truncate">
            Overview
          </span>
          <span className="ml-1.5 hidden md:inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-mono font-medium text-[#0052FF] border border-blue-200/60 shrink-0">
            Audit-Ready (92%)
          </span>
        </div>
      </div>

      {/* Right section: Search bar (desktop) + Notifications + Profile dropdown */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Desktop Quick Search Preview */}
        <div className="hidden md:flex items-center relative w-56 lg:w-64">
          <IconSearch
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search credentials..."
            aria-label="Search credentials"
            className="w-full rounded-md border border-zinc-200 bg-zinc-50/70 py-1.5 pl-8 pr-3 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-[#0052FF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0052FF] font-sans transition-all"
          />
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative shrink-0" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
            aria-label="View notifications"
            aria-expanded={notifOpen}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4.5 w-4.5"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#0052FF] ring-2 ring-white" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 z-50 mt-2 w-[calc(100vw-1.5rem)] sm:w-88 max-w-sm rounded-xl border border-zinc-200 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 font-mono">
                  Notifications
                </span>
                <span className="text-[10px] font-mono bg-blue-50 text-[#0052FF] px-1.5 py-0.5 rounded border border-blue-200">
                  3 New
                </span>
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-zinc-100">
                {notifications.map((item, idx) => (
                  <li key={idx} className="flex gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        item.type === "success"
                          ? "bg-emerald-500"
                          : item.type === "warning"
                          ? "bg-amber-500"
                          : "bg-[#0052FF]"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-zinc-900 leading-snug">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[10px] text-zinc-400 font-mono">
                        {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-2 text-center rounded-b-xl">
                <span className="text-[11px] font-medium text-zinc-500 font-mono">
                  All compliance records audit-synced
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="h-5 w-px bg-zinc-200 shrink-0" aria-hidden="true" />

        {/* Profile Avatar & Dropdown */}
        <div className="relative shrink-0" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-1.5 sm:pr-2 hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
            aria-label="User account menu"
            aria-expanded={profileOpen}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0052FF] text-xs font-bold text-white shadow-xs">
              LV
            </div>
            <div className="hidden sm:block text-left min-w-0">
              <p className="text-xs font-bold text-zinc-900 leading-tight truncate">
                Liam Vance
              </p>
              <p className="text-[10px] font-mono text-zinc-500 leading-tight truncate">
                WRK-8921
              </p>
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`hidden sm:block h-3.5 w-3.5 text-zinc-400 transition-transform shrink-0 ${
                profileOpen ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {profileOpen && (
            <div className="absolute right-0 z-50 mt-2 w-[calc(100vw-1.5rem)] sm:w-64 max-w-xs rounded-xl border border-zinc-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-100">
              {/* User overview block */}
              <div className="border-b border-zinc-100 px-3 py-2.5">
                <p className="text-xs font-bold text-zinc-950 font-sans">
                  Liam Vance
                </p>
                <p className="text-[11px] font-mono text-zinc-500">
                  WRK-8921 • UK Trade Worker
                </p>
                <div className="mt-2 flex items-center justify-between rounded bg-zinc-50 px-2 py-1 border border-zinc-200/70">
                  <span className="text-[10px] font-mono text-zinc-500">
                    Readiness
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-600">
                    92% Audit-Ready
                  </span>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <IconUser size={14} className="text-zinc-400" />
                    My Profile
                  </span>
                  <span className="text-[10px] font-mono text-[#0052FF] font-medium">WRK-8921</span>
                </Link>

                <Link
                  href="/dashboard#compliance"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <IconShieldCheck size={14} className="text-zinc-400" />
                    Compliance Records
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">4/5</span>
                </Link>

                <Link
                  href="/onboarding"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <IconClock size={14} className="text-zinc-400" />
                    Onboarding Setup
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600">Complete</span>
                </Link>
              </div>

              {/* Log out item */}
              <div className="border-t border-zinc-100 pt-1">
                <Link
                  href="/login"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Sign Out (Demo)</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}