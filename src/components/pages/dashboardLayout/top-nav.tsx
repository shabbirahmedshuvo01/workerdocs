import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export interface TopNavProps {
  children?: React.ReactNode;
}

export function TopNav({ children }: TopNavProps) {
  return (
    <header className="w-full shrink-0">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" />
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/dashboard">Overview</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          {children}
          <Link href="/login">Logout</Link>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
