"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Documents", href: "/#documents" },
    { label: "Onboarding", href: "/onboarding" },
    { label: "Security", href: "/#security" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Logo size="md" />

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#0052FF] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="accent" size="sm" asChild className="px-4 font-semibold">
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <Button variant="accent" size="sm" asChild className="h-8 px-3 text-xs">
            <Link href="/register">Register</Link>
          </Button>
          <button
            type="button"
            id="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-600 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          aria-labelledby="mobile-menu-button"
          className="sm:hidden border-t border-gray-100 bg-white px-4 py-5 space-y-3 shadow-lg"
        >
          <nav className="space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-gray-700 hover:text-[#0052FF] py-2 border-b border-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 flex gap-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
            </Button>
            <Button variant="accent" size="sm" className="w-full" asChild>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

