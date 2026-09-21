"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconCheckCircle,
  IconAlertCircle,
  IconArrowUpRight,
  IconRefresh,
  IconShieldCheck,
  IconFileText,
} from "@/components/ui/icons";
import { StepIndicator, StepItem } from "./StepIndicator";
import { PostponedFieldsNotice } from "./PostponedFieldsNotice";

const stepsConfig: StepItem[] = [
  { number: 1, title: "Core Details", subtitle: "Contact & UK Address" },
  { number: 2, title: "Right to Work", subtitle: "Compliance Declaration" },
  { number: 3, title: "Professional Cards", subtitle: "CSCS & Qualifications" },
];

const sectorOptions = [
  { value: "", label: "Select your primary industry sector" },
  { value: "construction", label: "Construction & Infrastructure" },
  { value: "rail", label: "Rail, Civils & Track Infrastructure" },
  { value: "logistics", label: "Logistics, Warehousing & Fleet" },
  { value: "healthcare", label: "Healthcare & Care Facilities" },
  { value: "facilities", label: "Facilities Management & Maintenance" },
  { value: "other", label: "Other Technical Field" },
];

const cardTypeOptions = [
  { value: "", label: "Select card scheme (optional)" },
  { value: "cscs_green", label: "CSCS Green — Labourer / Site Operative" },
  { value: "cscs_blue", label: "CSCS Blue — Skilled Worker (NVQ Level 2)" },
  { value: "cscs_gold", label: "CSCS Gold — Advanced Craft / Supervisor" },
  { value: "cscs_black", label: "CSCS Black — Site Management" },
  { value: "cpcs", label: "CPCS — Plant & Machine Operator Card" },
  { value: "ecs", label: "ECS — Electrotechnical Certification Scheme" },
  { value: "jib_pmes", label: "JIB-PMES — Plumbing & Mechanical" },
  { value: "other", label: "Other Accredited Trade Scheme" },
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Step 1: Core Details
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [addressStreet, setAddressStreet] = useState<string>("");
  const [addressCity, setAddressCity] = useState<string>("");
  const [addressPostcode, setAddressPostcode] = useState<string>("");
  const [sector, setSector] = useState<string>("");

  // Step 2: Right to Work Declaration
  const [declarationType, setDeclarationType] = useState<string>("");
  const [shareCode, setShareCode] = useState<string>("");
  const [shareCodeExpiry, setShareCodeExpiry] = useState<string>("");
  const [declarationConfirmed, setDeclarationConfirmed] = useState<boolean>(false);

  // Step 3: Professional Cards (Optional)
  const [cardType, setCardType] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // UK Phone Regex: 07xxx xxxxxx or +447xxx xxxxxx or UK standard numbers
  const ukPhoneRegex = /^(?:(?:\+44\s?|0)(?:7\d{3}|[12]\d{3}|3\d{3})\s?\d{6})$/;
  // UK Postcode Regex
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;

  const validateStep1 = (): boolean => {
    const nextErrors: Record<string, string> = {};

    const cleanPhone = mobileNumber.replace(/\s+/g, "");
    if (!mobileNumber.trim()) {
      nextErrors.mobileNumber = "UK contact mobile number is required.";
    } else if (!ukPhoneRegex.test(cleanPhone)) {
      nextErrors.mobileNumber = "Please enter a valid UK mobile number (e.g. 07123 456789 or +447123456789).";
    }

    if (!addressStreet.trim()) {
      nextErrors.addressStreet = "Street address is required.";
    }

    if (!addressCity.trim()) {
      nextErrors.addressCity = "Town or city is required.";
    }

    const cleanPostcode = addressPostcode.trim();
    if (!cleanPostcode) {
      nextErrors.addressPostcode = "UK postal code is required.";
    } else if (!ukPostcodeRegex.test(cleanPostcode)) {
      nextErrors.addressPostcode = "Please enter a valid UK postcode (e.g. SW1A 1AA or M1 1AE).";
    }

    if (!sector) {
      nextErrors.sector = "Please select your primary industry sector.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!declarationType) {
      nextErrors.declarationType = "Please select your Right to Work declaration type.";
    }

    if (declarationType === "eu_settled" || declarationType === "uk_visa") {
      const cleanShareCode = shareCode.trim().replace(/\s+/g, "");
      if (!cleanShareCode) {
        nextErrors.shareCode = "UK Home Office 9-character Share Code is required for this status.";
      } else if (cleanShareCode.length < 9) {
        nextErrors.shareCode = "Share Code must be 9 alphanumeric characters (e.g. W12 345 678).";
      }
    }

    if (!declarationConfirmed) {
      nextErrors.declarationConfirmed = "You must confirm that your Right to Work declaration is accurate.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setErrors({});
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsCompleted(true);
      }
    }, 250);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkipStep3 = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setErrors({});
      setIsCompleted(true);
    }, 200);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setIsCompleted(false);
    setErrors({});
    setMobileNumber("");
    setAddressStreet("");
    setAddressCity("");
    setAddressPostcode("");
    setSector("");
    setDeclarationType("");
    setShareCode("");
    setShareCodeExpiry("");
    setDeclarationConfirmed(false);
    setCardType("");
    setCardNumber("");
    setCardExpiry("");
  };

  // ----------------------------------------------------
  // Render: Completion Summary State
  // ----------------------------------------------------
  if (isCompleted) {
    const sectorLabel = sectorOptions.find((s) => s.value === sector)?.label || sector;
    const cardLabel = cardTypeOptions.find((c) => c.value === cardType)?.label || "None submitted (Deferred)";

    return (
      <div className="w-full space-y-6">
        <Card className="border border-zinc-200/90 shadow-sm bg-white overflow-hidden">
          <div className="bg-emerald-500/10 border-b border-emerald-500/20 p-6 sm:p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-xs">
              <IconCheckCircle size={24} />
            </div>
            <div className="space-y-1">
              <Badge variant="success" className="font-mono text-[10px] tracking-wider uppercase">
                ONBOARDING VERIFICATION READY
              </Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950 font-sans">
                Worker Profile Initialization Complete
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
                Your primary contact information, UK address, and Right to Work declaration have been validated.
              </p>
            </div>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* Presentation Mode Alert */}
            <div
              role="status"
              className="rounded-lg bg-blue-50/80 border border-blue-100 p-4 text-xs text-[#0052FF] flex items-start gap-3"
            >
              <IconFileText size={16} className="text-[#0052FF] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Presentation Milestone Status</p>
                <p className="text-blue-900/80 leading-relaxed">
                  Onboarding form flow verified in frontend memory. In Milestone 4, this profile transitions directly into the <strong>Worker Dashboard</strong> command center and document readiness meter.
                </p>
              </div>
            </div>

            {/* Profile Summary Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
                Verified Onboarding Profile Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-zinc-50/80 rounded-lg border border-zinc-200/60 space-y-1">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                    Primary Industry Sector
                  </span>
                  <p className="font-semibold text-zinc-900">{sectorLabel}</p>
                </div>

                <div className="p-3.5 bg-zinc-50/80 rounded-lg border border-zinc-200/60 space-y-1">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                    UK Contact Mobile
                  </span>
                  <p className="font-semibold text-zinc-900 font-mono">{mobileNumber}</p>
                </div>

                <div className="p-3.5 bg-zinc-50/80 rounded-lg border border-zinc-200/60 space-y-1 sm:col-span-2">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                    Registered Postal Address
                  </span>
                  <p className="font-semibold text-zinc-900">
                    {addressStreet}, {addressCity} — <span className="font-mono">{addressPostcode.toUpperCase()}</span>
                  </p>
                </div>

                <div className="p-3.5 bg-zinc-50/80 rounded-lg border border-zinc-200/60 space-y-1 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                      Right to Work Declaration
                    </span>
                    <Badge variant="outline" className="font-mono text-[10px] text-emerald-700 bg-emerald-50 border-emerald-200">
                      STATUTORY DECLARATION CONFIRMED
                    </Badge>
                  </div>
                  <p className="font-semibold text-zinc-900 capitalize">
                    {declarationType === "uk_irish"
                      ? "UK / Irish Citizen (Passport verification required on file)"
                      : declarationType === "eu_settled"
                      ? `EU Settled / Pre-Settled Status (Share code: ${shareCode.toUpperCase()})`
                      : `UK Visa / Biometric Residence Permit (BRP share code: ${shareCode.toUpperCase()})`}
                  </p>
                </div>

                <div className="p-3.5 bg-zinc-50/80 rounded-lg border border-zinc-200/60 space-y-1 sm:col-span-2">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold">
                    Trade Qualifications / CSCS
                  </span>
                  <p className="font-semibold text-zinc-900">
                    {cardNumber ? `${cardLabel} — Reg: ${cardNumber}` : "Optional details deferred to Document Vault"}
                  </p>
                </div>
              </div>
            </div>

            {/* Postponed Notice for Context */}
            <PostponedFieldsNotice />

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={handleRestart}
                className="w-full sm:w-auto font-medium text-xs flex items-center justify-center gap-1.5"
              >
                <IconRefresh size={14} />
                <span>Test Flow Again</span>
              </Button>

              <div className="w-full sm:w-auto flex-1 flex flex-col sm:flex-row items-center gap-3 justify-end">
                <Button
                  variant="outline"
                  size="md"
                  asChild
                  className="w-full sm:w-auto font-medium text-xs"
                >
                  <Link href="/login">Return to Sign In</Link>
                </Button>

                <Button
                  variant="accent"
                  size="md"
                  asChild
                  className="w-full sm:w-auto font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Link href="/">
                    <span>Return to Overview</span>
                    <IconArrowUpRight size={14} />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ----------------------------------------------------
  // Render: Active Wizard Flow (Steps 1, 2, 3)
  // ----------------------------------------------------
  return (
    <div className="w-full space-y-6">
      {/* Progress & Flow Indicator */}
      <StepIndicator currentStep={currentStep} steps={stepsConfig} />

      <Card className="border border-zinc-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] bg-white">
        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: Core Details */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="font-mono text-[10px]">
                    STEP 1
                  </Badge>
                  <Badge variant="outline" className="font-mono text-[10px] text-blue-700 bg-blue-50 border-blue-200">
                    REQUIRED INFORMATION
                  </Badge>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-zinc-950 font-sans mt-2">
                  Worker Core Information
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Provide your official UK contact number and residential address for placement compliance records.
                </p>
              </div>

              <div className="space-y-4">
                {/* Sector / Trade Category */}
                <div>
                  <Select
                    id="onboarding-sector"
                    label="Primary Industry Sector"
                    required
                    options={sectorOptions}
                    value={sector}
                    error={errors.sector}
                    onChange={(e) => {
                      setSector(e.target.value);
                      if (errors.sector) setErrors((prev) => ({ ...prev, sector: "" }));
                    }}
                    aria-describedby={errors.sector ? "onboarding-sector-error" : undefined}
                  />
                  {errors.sector && (
                    <p id="onboarding-sector-error" role="alert" className="mt-1 text-xs font-mono text-rose-600 flex items-center gap-1">
                      <IconAlertCircle size={12} /> {errors.sector}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <Input
                    id="onboarding-phone"
                    type="tel"
                    label="Contact Mobile Number"
                    required
                    autoComplete="tel"
                    placeholder="07123 456789"
                    value={mobileNumber}
                    error={errors.mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (errors.mobileNumber) setErrors((prev) => ({ ...prev, mobileNumber: "" }));
                    }}
                    aria-describedby={errors.mobileNumber ? "onboarding-phone-error" : "onboarding-phone-hint"}
                  />
                  {errors.mobileNumber ? (
                    <p id="onboarding-phone-error" role="alert" className="mt-1 text-xs font-mono text-rose-600 flex items-center gap-1">
                      <IconAlertCircle size={12} /> {errors.mobileNumber}
                    </p>
                  ) : (
                    <p id="onboarding-phone-hint" className="mt-1 text-[11px] text-zinc-500 font-mono">
                      UK standard mobile format (+44 or starting with 07)
                    </p>
                  )}
                </div>

                {/* Postal Address */}
                <div className="space-y-3 pt-1 border-t border-zinc-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-mono">
                    Primary Postal Address
                  </h3>

                  <div>
                    <Input
                      id="onboarding-street"
                      type="text"
                      label="Street Address"
                      required
                      autoComplete="street-address"
                      placeholder="e.g. 42 Commercial Road"
                      value={addressStreet}
                      error={errors.addressStreet}
                      onChange={(e) => {
                        setAddressStreet(e.target.value);
                        if (errors.addressStreet) setErrors((prev) => ({ ...prev, addressStreet: "" }));
                      }}
                      aria-describedby={errors.addressStreet ? "onboarding-street-error" : undefined}
                    />
                    {errors.addressStreet && (
                      <p id="onboarding-street-error" role="alert" className="mt-1 text-xs font-mono text-rose-600 flex items-center gap-1">
                        <IconAlertCircle size={12} /> {errors.addressStreet}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Input
                        id="onboarding-city"
                        type="text"
                        label="City / Town"
                        required
                        autoComplete="address-level2"
                        placeholder="e.g. Birmingham"
                        value={addressCity}
                        error={errors.addressCity}
                        onChange={(e) => {
                          setAddressCity(e.target.value);
                          if (errors.addressCity) setErrors((prev) => ({ ...prev, addressCity: "" }));
                        }}
                        aria-describedby={errors.addressCity ? "onboarding-city-error" : undefined}
                      />
                      {errors.addressCity && (
                        <p id="onboarding-city-error" role="alert" className="mt-1 text-xs font-mono text-rose-600 flex items-center gap-1">
                          <IconAlertCircle size={12} /> {errors.addressCity}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        id="onboarding-postcode"
                        type="text"
                        label="UK Postcode"
                        required
                        autoComplete="postal-code"
                        placeholder="e.g. B1 1TT"
                        className="uppercase"
                        value={addressPostcode}
                        error={errors.addressPostcode}
                        onChange={(e) => {
                          setAddressPostcode(e.target.value);
                          if (errors.addressPostcode) setErrors((prev) => ({ ...prev, addressPostcode: "" }));
                        }}
                        aria-describedby={errors.addressPostcode ? "onboarding-postcode-error" : undefined}
                      />
                      {errors.addressPostcode && (
                        <p id="onboarding-postcode-error" role="alert" className="mt-1 text-xs font-mono text-rose-600 flex items-center gap-1">
                          <IconAlertCircle size={12} /> {errors.addressPostcode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Right to Work Status */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="font-mono text-[10px]">
                    STEP 2
                  </Badge>
                  <Badge variant="outline" className="font-mono text-[10px] text-blue-700 bg-blue-50 border-blue-200">
                    COMPLIANCE DECLARATION
                  </Badge>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-zinc-950 font-sans mt-2">
                  Right to Work Status
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Declare your legal entitlement to work in the United Kingdom in compliance with Home Office legislation.
                </p>
              </div>

              <div className="space-y-4">
                {/* Declaration Selection Radios */}
                <fieldset className="space-y-2.5">
                  <legend className="text-xs font-bold text-zinc-800 font-mono uppercase tracking-wider mb-2">
                    Select Declaration Type <span className="text-rose-500">*</span>
                  </legend>

                  <label
                    htmlFor="decl-uk-irish"
                    className={`block p-3.5 rounded-lg border cursor-pointer transition-all ${
                      declarationType === "uk_irish"
                        ? "bg-blue-50/50 border-[#0052FF] ring-1 ring-[#0052FF]/30"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="decl-uk-irish"
                        name="declarationType"
                        value="uk_irish"
                        checked={declarationType === "uk_irish"}
                        onChange={() => {
                          setDeclarationType("uk_irish");
                          if (errors.declarationType) setErrors((prev) => ({ ...prev, declarationType: "" }));
                        }}
                        className="mt-0.5 h-4 w-4 text-[#0052FF] focus:ring-[#0052FF]"
                      />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-zinc-900">
                          UK or Irish Citizen
                        </p>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          Requires British / Irish passport or birth certificate with proof of address for verified placement status.
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    htmlFor="decl-eu-settled"
                    className={`block p-3.5 rounded-lg border cursor-pointer transition-all ${
                      declarationType === "eu_settled"
                        ? "bg-blue-50/50 border-[#0052FF] ring-1 ring-[#0052FF]/30"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="decl-eu-settled"
                        name="declarationType"
                        value="eu_settled"
                        checked={declarationType === "eu_settled"}
                        onChange={() => {
                          setDeclarationType("eu_settled");
                          if (errors.declarationType) setErrors((prev) => ({ ...prev, declarationType: "" }));
                        }}
                        className="mt-0.5 h-4 w-4 text-[#0052FF] focus:ring-[#0052FF]"
                      />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-zinc-900">
                          EU Settled / Pre-Settled Status
                        </p>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          Requires a valid 9-character UK Home Office online Share Code for verification.
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    htmlFor="decl-uk-visa"
                    className={`block p-3.5 rounded-lg border cursor-pointer transition-all ${
                      declarationType === "uk_visa"
                        ? "bg-blue-50/50 border-[#0052FF] ring-1 ring-[#0052FF]/30"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="decl-uk-visa"
                        name="declarationType"
                        value="uk_visa"
                        checked={declarationType === "uk_visa"}
                        onChange={() => {
                          setDeclarationType("uk_visa");
                          if (errors.declarationType) setErrors((prev) => ({ ...prev, declarationType: "" }));
                        }}
                        className="mt-0.5 h-4 w-4 text-[#0052FF] focus:ring-[#0052FF]"
                      />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-zinc-900">
                          UK Visa / Biometric Residence Permit (BRP)
                        </p>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          Requires a Home Office share code to verify visa work entitlement conditions and duration.
                        </p>
                      </div>
                    </div>
                  </label>
                </fieldset>

                {errors.declarationType && (
                  <p role="alert" className="text-xs font-mono text-rose-600 flex items-center gap-1">
                    <IconAlertCircle size={12} /> {errors.declarationType}
                  </p>
                )}

                {/* Conditional Share Code input for EU/Visa */}
                {(declarationType === "eu_settled" || declarationType === "uk_visa") && (
                  <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200/80 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-700 font-bold uppercase tracking-wider">
                      <IconShieldCheck size={14} className="text-[#0052FF]" />
                      <span>Home Office Online Share Code</span>
                    </div>

                    <Input
                      id="onboarding-sharecode"
                      type="text"
                      label="9-Character Share Code"
                      required
                      placeholder="e.g. W12 345 678"
                      className="font-mono uppercase"
                      value={shareCode}
                      error={errors.shareCode}
                      onChange={(e) => {
                        setShareCode(e.target.value);
                        if (errors.shareCode) setErrors((prev) => ({ ...prev, shareCode: "" }));
                      }}
                      aria-describedby={errors.shareCode ? "sharecode-error" : "sharecode-hint"}
                    />
                    {errors.shareCode ? (
                      <p id="sharecode-error" role="alert" className="text-xs font-mono text-rose-600 flex items-center gap-1">
                        <IconAlertCircle size={12} /> {errors.shareCode}
                      </p>
                    ) : (
                      <p id="sharecode-hint" className="text-[11px] text-zinc-500">
                        Generated via gov.uk/view-prove-immigration-status (valid for 90 days)
                      </p>
                    )}

                    <div>
                      <Input
                        id="onboarding-sharecode-expiry"
                        type="date"
                        label="Share Code / Visa Expiry Date (Optional)"
                        value={shareCodeExpiry}
                        onChange={(e) => setShareCodeExpiry(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Declaration Confirmation Checkbox */}
                <div className="pt-2 border-t border-zinc-100">
                  <Checkbox
                    id="declaration-confirm"
                    checked={declarationConfirmed}
                    onChange={(e) => {
                      setDeclarationConfirmed(e.target.checked);
                      if (errors.declarationConfirmed) setErrors((prev) => ({ ...prev, declarationConfirmed: "" }));
                    }}
                    label="I confirm this Right to Work declaration is genuine and accurate"
                    description="I understand false declarations violate UK employment regulations and employer audit protocols."
                  />
                  {errors.declarationConfirmed && (
                    <p role="alert" className="mt-1 text-xs font-mono text-rose-600 flex items-center gap-1">
                      <IconAlertCircle size={12} /> {errors.declarationConfirmed}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Professional Cards (Optional) */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="font-mono text-[10px]">
                    STEP 3
                  </Badge>
                  <Badge variant="outline" className="font-mono text-[10px] text-zinc-600 bg-zinc-50 border-zinc-200">
                    OPTIONAL INFORMATION
                  </Badge>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-zinc-950 font-sans mt-2">
                  Trade Cards & Accreditations
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Add your CSCS card or industry scheme details now, or skip and upload certificates directly in the Document Vault.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Select
                    id="onboarding-card-type"
                    label="Card Scheme / Type"
                    options={cardTypeOptions}
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Input
                      id="onboarding-card-number"
                      type="text"
                      label="Card Registration Number"
                      placeholder="e.g. 04291823"
                      className="font-mono uppercase"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>

                  <div>
                    <Input
                      id="onboarding-card-expiry"
                      type="date"
                      label="Card Expiration Date"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200/60 text-xs text-zinc-500 leading-relaxed">
                  <p>
                    <strong>Note:</strong> Physical card scans and PDF qualifications will be verified in the <strong>Document Vault</strong> (Milestone 5). Entering your registration number here creates an initial draft record.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation and Actions */}
          <div className="pt-4 border-t border-zinc-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handlePreviousStep}
                  disabled={isLoading}
                  className="w-full sm:w-auto font-medium text-xs"
                >
                  ← Back to Step {currentStep - 1}
                </Button>
              )}
            </div>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              {currentStep === 3 && (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={handleSkipStep3}
                  disabled={isLoading}
                  className="w-full sm:w-auto text-xs text-zinc-500 hover:text-zinc-900"
                >
                  Skip for Now
                </Button>
              )}

              <Button
                variant="accent"
                size="md"
                onClick={handleNextStep}
                isLoading={isLoading}
                className="w-full sm:w-auto font-bold tracking-wide text-xs shadow-sm"
              >
                {currentStep < 3 ? `Continue to Step ${currentStep + 1} →` : "Complete Setup"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Postponed Fields Callout Banner */}
      <PostponedFieldsNotice />
    </div>
  );
}
