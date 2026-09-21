"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { IconEye, IconEyeOff, IconCheckCircle } from "@/components/ui/icons";

const tradeOptions = [
  { value: "", label: "Select your primary trade / role" },
  { value: "carpenter", label: "Carpenter & Joiner" },
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber / Pipefitter" },
  { value: "bricklayer", label: "Bricklayer" },
  { value: "site_supervisor", label: "Site Supervisor / Manager" },
  { value: "general_operative", label: "General Construction Operative" },
  { value: "plant_operator", label: "Plant / Machine Operator" },
  { value: "painter", label: "Painter & Decorator" },
  { value: "scaffolder", label: "Scaffolder" },
  { value: "welder", label: "Welder / Fabricator" },
  { value: "other", label: "Other Technical Trade" },
];

export function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [trade, setTrade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [consent, setConsent] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  // Field validation errors
  const [errors, setErrors] = useState<{
    fullName?: string;
    trade?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    consent?: string;
  }>({});

  const validate = () => {
    const nextErrors: typeof errors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Full legal name is required.";
    } else if (fullName.trim().length < 2) {
      nextErrors.fullName = "Name must be at least 2 characters.";
    }

    if (!trade) {
      nextErrors.trade = "Please select your primary trade or occupation.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!consent) {
      nextErrors.consent = "You must agree to the Terms of Service and Worker Privacy Policy.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSuccess(false);

    if (!validate()) return;

    setIsLoading(true);

    // Presentation simulation
    setTimeout(() => {
      setIsLoading(false);
      setDemoSuccess(true);
    }, 1000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Presentation Demo Banner */}
      {/* <div className="rounded-lg bg-blue-50/80 border border-blue-100 p-3.5 text-xs text-[#0052FF] flex items-start gap-2.5">
        <span className="font-mono font-bold uppercase text-[10px] bg-white border border-blue-200/80 px-1.5 py-0.5 rounded shrink-0">
          UI PREVIEW
        </span>
        <p className="leading-relaxed">
          Presentation-only registration flow. Demonstrates form validation, trade selection, and loading behavior without backend account creation.
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
            <p className="font-bold">Registration Validation Passed</p>
            <p className="text-emerald-700 mt-0.5">
              Profile details are valid. You can now proceed to set up your UK compliance details and Right to Work declaration.
            </p>
            <div className="mt-3">
              <Button
                variant="accent"
                size="sm"
                asChild
                className="text-xs font-semibold shadow-xs"
              >
                <Link href="/onboarding">
                  Continue to Worker Onboarding →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Legal Name */}
        <div>
          <Input
            id="register-name"
            type="text"
            label="Full Legal Name"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            placeholder="e.g. Liam Vance"
            error={errors.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "register-name-error" : undefined}
          />
        </div>

        {/* Primary Trade / Occupation */}
        <div>
          <Select
            id="register-trade"
            label="Primary Trade / Occupation"
            required
            options={tradeOptions}
            value={trade}
            onChange={(e) => {
              setTrade(e.target.value);
              if (errors.trade) setErrors((prev) => ({ ...prev, trade: undefined }));
            }}
            error={errors.trade}
            aria-invalid={Boolean(errors.trade)}
            aria-describedby={errors.trade ? "register-trade-error" : undefined}
          />
        </div>

        {/* Email Address */}
        <div>
          <Input
            id="register-email"
            type="email"
            label="Email Address"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="e.g. liam.vance@example.co.uk"
            error={errors.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "register-email-error" : undefined}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="register-password"
            className="block text-xs font-semibold text-zinc-800 tracking-tight select-none mb-1.5"
          >
            Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="At least 8 characters"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "register-password-error" : undefined}
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

          {errors.password ? (
            <p id="register-password-error" className="mt-1.5 text-xs font-mono text-rose-600 flex items-center gap-1">
              <span>•</span> {errors.password}
            </p>
          ) : (
            <p className="mt-1.5 text-[11px] text-zinc-400">
              Must be at least 8 characters with a mix of letters and numbers.
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="register-confirm-password"
            className="block text-xs font-semibold text-zinc-800 tracking-tight select-none mb-1.5"
          >
            Confirm Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              id="register-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              placeholder="Repeat your password"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={errors.confirmPassword ? "register-confirm-error" : undefined}
              className={`w-full h-10 pl-3 pr-10 text-sm bg-white text-zinc-900 border rounded-md transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 ${
                errors.confirmPassword
                  ? "border-rose-500 focus:border-rose-600 focus:ring-rose-500"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p id="register-confirm-error" className="mt-1.5 text-xs font-mono text-rose-600 flex items-center gap-1">
              <span>•</span> {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms and Privacy Consent */}
        <div className="pt-2">
          <Checkbox
            id="register-consent"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
            }}
            label="I agree to the Terms of Service and Worker Privacy Policy"
            description="I confirm my details are accurate for UK workforce compliance records."
          />
          {errors.consent && (
            <p className="mt-1.5 text-xs font-mono text-rose-600 flex items-center gap-1">
              <span>•</span> {errors.consent}
            </p>
          )}
        </div>

        {/* Primary CTA */}
        <div className="pt-3">
          <Button
            variant="accent"
            size="lg"
            type="submit"
            isLoading={isLoading}
            className="w-full font-bold tracking-wide shadow-sm"
          >
            Create Worker Profile
          </Button>
        </div>
      </form>

      {/* Switch to Login and Onboarding links */}
      <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-600 space-y-1.5">
        <div>
          Already have a WorkerDocs profile?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#0052FF] hover:text-[#0047e0] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
          >
            Sign in
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

