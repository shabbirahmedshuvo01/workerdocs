"use client";

import React from "react";

const renewals = [
    {
        name: "Right to Work",
        reference: "Home Office Sharecode",
        expiry: "23 Oct 2026",
        days: 28,
    },
    {
        name: "CSCS Skilled Worker",
        reference: "CITB #849102",
        expiry: "07 Nov 2026",
        days: 43,
    },
    {
        name: "SSSTS",
        reference: "Site Safety #SS-4421",
        expiry: "26 Nov 2026",
        days: 62,
    },
    {
        name: "FAW Level 3",
        reference: "First Aid #FA-1182",
        expiry: "14 Dec 2026",
        days: 80,
    },
];

export function ExpirySection() {
    return (
        <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-zinc-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                    <p className="text-sm font-bold text-zinc-950">
                        Upcoming Credential Renewals &amp; Expiries
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                        Keep your worker passport continuously valid
                    </p>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                    Next 90 days
                </span>
            </div>

            <div className="divide-y divide-zinc-100">
                {renewals.map((item) => {
                    const urgent = item.days <= 30;
                    const warning = item.days <= 60;

                    return (
                        <div
                            key={item.name}
                            className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6"
                        >
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-zinc-900">{item.name}</p>
                                <p className="mt-1 font-mono text-[10px] text-zinc-500">
                                    {item.reference}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-5 sm:justify-end">
                                <div className="text-left sm:text-right">
                                    <p className="text-[10px] uppercase tracking-wide text-zinc-400">
                                        Expires
                                    </p>
                                    <p className="mt-0.5 text-xs font-semibold text-zinc-800">
                                        {item.expiry}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${urgent
                                        ? "bg-red-50 text-red-600"
                                        : warning
                                            ? "bg-amber-50 text-amber-700"
                                            : "bg-zinc-100 text-zinc-600"
                                        }`}
                                >
                                    {item.days} days
                                </span>

                                <button
                                    type="button"
                                    className="rounded-md border border-zinc-200 px-2.5 py-1.5 text-[10px] font-bold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                                >
                                    Renew
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default ExpirySection;