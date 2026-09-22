import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 sm:py-16 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              Keep your work documents, qualifications and important records
              organised, ready whenever you need them.
            </p>
            <p className="text-xs font-mono text-gray-400">
              WorkerDocs — Worker Document &amp; Compliance System
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-950 font-mono">
              Product
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#how-it-works" className="hover:text-[#0052FF] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#documents" className="hover:text-[#0052FF] transition-colors">
                  Documents
                </Link>
              </li>
              <li>
                <Link href="/#readiness" className="hover:text-[#0052FF] transition-colors">
                  Readiness
                </Link>
              </li>
              <li>
                <Link href="/#security" className="hover:text-[#0052FF] transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#0052FF] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-950 font-mono">
              Account
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-[#0052FF] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#0052FF] transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:text-[#0052FF] transition-colors">
                  Worker Onboarding
                </Link>
              </li>
              <li>
                <Link href="/#hero" className="hover:text-[#0052FF] transition-colors">
                  Worker Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-950 font-mono">
              Support
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#faq" className="hover:text-[#0052FF] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#0052FF] transition-colors">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-950 font-mono">
              Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#0052FF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-[#0052FF] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#0052FF] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 WorkerDocs. All rights reserved.</p>
          <p className="font-mono text-[11px]">
            Connected with the StaffBeacon ecosystem
          </p>
        </div>
      </div>
    </footer>
  );
}

