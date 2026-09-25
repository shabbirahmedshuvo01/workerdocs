"use client";

import React, { useState } from "react";
import { IconCheckCircle } from "@/components/ui/icons";

const checks = [
    {
        title: "Right to Work",
        detail: "Home Office Sharecode",
        status: "Verified",
    },
    {
        title: "CSCS Skilled Worker",
        detail: "CITB Gold Card #849102",
        status: "Verified",
    },
    {
        title: "DBS Check",
        detail: "Standard Disclosure #DBS-291",
        status: "Verified",
    },
    {
        title: "Public Liability",
        detail: "£5M Cover",
        status: "Verified",
    },
    {
        title: "Site Safety Induction",
        detail: "Battersea Phase 3",
        status: "Pending",
    },
];

export function ReadinessCard() {
    const [shared, setShared] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(
                "WorkerDocs Verification — WRK-8921 — 92% Ready"
            );
        } catch {
            // Clipboard may be unavailable in some environments.
        }

        setShared(true);
        window.setTimeout(() => setShared(false), 2500);
    };

    return (
        <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-100 px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                                Worker readiness
                            </span>
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                                Tier 1 verified
                            </span>
                        </div>

                        <div className="mt-2 flex items-end gap-3">
                            <span className="text-4xl font-extrabold tracking-tight text-zinc-950">
                                92%
                            </span>
                            <span className="pb-1 text-sm text-zinc-500">
                                site-ready
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-zinc-600">
                            Your compliance passport is almost fully verified.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
                    >
                        <IconCheckCircle size={15} className="text-emerald-600" />
                        {shared ? "Verification Copied" : "Share Verification"}
                    </button>
                </div>

                <div
                    className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-100"
                    role="progressbar"
                    aria-valuenow={92}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Worker compliance readiness score"
                >
                    <div
                        className="h-full rounded-full bg-[#0052FF] transition-all"
                        style={{ width: "92%" }}
                    />
                </div>
            </div>

            <div className="grid divide-y divide-zinc-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
                {checks.map((check) => {
                    const verified = check.status === "Verified";

                    return (
                        <div key={check.title} className="px-4 py-4">
                            <div className="flex items-start justify-between gap-2">
                                <span
                                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${verified ? "bg-emerald-50" : "bg-amber-50"
                                        }`}
                                >
                                    {verified ? (
                                        <IconCheckCircle size={13} className="text-emerald-600" />
                                    ) : (
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                    )}
                                </span>

                                <span
                                    className={`text-[10px] font-bold uppercase tracking-wide ${verified ? "text-emerald-600" : "text-amber-600"
                                        }`}
                                >
                                    {check.status}
                                </span>
                            </div>

                            <p className="mt-3 text-xs font-bold text-zinc-900">
                                {check.title}
                            </p>

                            <p className="mt-1 text-[11px] leading-4 text-zinc-500">
                                {check.detail}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default ReadinessCard;