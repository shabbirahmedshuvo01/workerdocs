"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { IconEye, IconEyeOff, IconCheckCircle, IconAlertCircle } from "@/components/ui/icons";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  // Field validation errors
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = "Email or worker reference code is required.";
    } else if (email.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSuccess(false);

    if (!validate()) return;

    setIsLoading(true);

    // Presentation simulation: shows loading state then demonstrates success response
    setTimeout(() => {
      setIsLoading(false);
      setDemoSuccess(true);
    }, 900);
  };

  return (
    <div className="w-full space-y-6">
      {/* Presentation Demo Banner */}
      {/* <div className="rounded-lg bg-blue-50/80 border border-blue-100 p-3.5 text-xs text-[#0052FF] flex items-start gap-2.5">
        <span className="font-mono font-bold uppercase text-[10px] bg-white border border-blue-200/80 px-1.5 py-0.5 rounded shrink-0">
          UI PREVIEW
        </span>
        <p className="leading-relaxed">
          Presentation-only authentication flow. Demonstrates form validation, focus states, and loading behavior without backend credentials.
        </p>
      </div> */}

      {/* Success alert message for demo */}
      {demoSuccess && (
        <div
          role="status"
          className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-900 flex items-start gap-3"
        >
          <IconCheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Frontend Validation Passed</p>
            <p className="text-emerald-700 mt-0.5">
              Inputs are valid. In the backend milestone, this will establish a verified worker session.
            </p>
            <div className="mt-3">
              <Button
                variant="accent"
                size="sm"
                asChild
                className="text-xs font-semibold shadow-xs"
              >
                <Link href="/onboarding">
                  Proceed to Worker Onboarding →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Notice Modal / Callout */}
      {showForgotNotice && (
        <div
          role="alert"
          className="rounded-lg bg-zinc-50 border border-zinc-200 p-4 text-xs text-zinc-700 flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-2.5">
            <IconAlertCircle size={16} className="text-zinc-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-zinc-900">Password Reset Entry Point</p>
              <p className="text-zinc-500 mt-0.5">
                Automated self-service reset will be enabled when the email delivery service is configured. Contact your placement agency administrator for support.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowForgotNotice(false)}
            className="text-zinc-400 hover:text-zinc-700 font-mono text-sm leading-none p-1"
            aria-label="Close notice"
          >
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email or Worker ID */}
        <div>
          <Input
            id="login-email"
            type="text"
            label="Email Address or Worker ID"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="e.g. liam.vance@example.co.uk or WRK-8921"
            error={errors.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "login-email-error" : undefined}
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="block text-xs font-semibold text-zinc-800 tracking-tight select-none"
            >
              Password <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotNotice(true)}
              className="text-xs text-[#0052FF] hover:text-[#0047e0] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative flex items-center">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="••••••••••••"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "login-password-error" : undefined}
              className={`w-full h-10 pl-3 pr-10 text-sm bg-white text-zinc-900 border rounded-md transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 ${
                errors.password
                  ? "border-rose-500 focus:border-rose-600 focus:ring-rose-500"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
            </button>
          </div>

          {errors.password && (
            <p id="login-password-error" className="mt-1.5 text-xs font-mono text-rose-600 flex items-center gap-1">
              <span>•</span> {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="pt-1">
          <Checkbox
            id="remember-me"
            label="Remember this device"
            description="Keep your credentials remembered on this browser"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </div>

        {/* Primary CTA */}
        <div className="pt-2">
          <Button
            variant="accent"
            size="lg"
            type="submit"
            isLoading={isLoading}
            className="w-full font-bold tracking-wide shadow-sm"
          >
            Sign In
          </Button>
        </div>
      </form>

      {/* Switch to Register and Onboarding links */}
      <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-600 space-y-1.5">
        <div>
          Don&apos;t have a WorkerDocs profile?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#0052FF] hover:text-[#0047e0] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
          >
            Create an account
          </Link>
        </div>
        <div>
          Testing onboarding flow?{" "}
          <Link
            href="/onboarding"
            className="font-medium text-zinc-500 hover:text-[#0052FF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
          >
            Go to Worker Onboarding →
          </Link>
        </div>
      </div>
    </div>
  );
}
