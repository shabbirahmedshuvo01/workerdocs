import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { RegisterForm } from "./RegisterForm";

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 flex flex-col justify-between selection:bg-[#0052FF] selection:text-white">
      {/* Top Bar with Home Link */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Logo size="md" />
        <Link
          href="/"
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
        >
          <span>←</span> Back to overview
        </Link>
      </header>

      {/* Main Centered Auth Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-sans">
              Create your Worker Profile
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
              Keep your UK employment documents, CSCS cards, and qualifications ready for your next contract.
            </p>
          </div>

          <Card className="border border-zinc-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] bg-white">
            <CardContent className="p-6 sm:p-8">
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-zinc-400 font-mono">
        <p>WorkerDocs — Connected with the StaffBeacon ecosystem</p>
      </footer>
    </div>
  );
}

