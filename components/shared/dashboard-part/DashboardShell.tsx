"use client";

import React, { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenMobile = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleCloseMobile = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50 font-sans text-zinc-900 antialiased">
      {/* Sidebar for Desktop & Mobile Off-canvas Drawer */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={handleCloseMobile}
      />

      {/* Main Column */}
      <div className="flex flex-1 flex-col min-w-0 w-full overflow-hidden">
        <TopNav onOpenMobileMenu={handleOpenMobile} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-zinc-50/60">
          <div className="w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
