"use client";

import React, { useState } from "react";
import { IconCheckCircle } from "@/components/ui/icons";

type Action = {
    id: number;
    title: string;
    description: string;
    meta: string;
    urgency: "urgent" | "warning" | "normal";
    button: string;
};

const initialActions: Action[] = [
    {
        id: 1,
        title: "Right-to-Work Sharecode Renewal",
        description:
            "Provide a renewed Home Office sharecode before your current verification expires.",
        meta: "28 days remaining",
        urgency: "urgent",
        button: "Provide Code",
    },
    {
        id: 2,
        title: "Site Induction Sign-off",
        description:
            "Complete the required site induction for the Battersea Phase 3 project.",
        meta: "Required before arrival",
        urgency: "warning",
        button: "Review Induction",
    },
    {
        id: 3,
        title: "Emergency Contact Information",
        description:
            "Review your emergency contact details and confirm they are still correct.",
        meta: "Annual safety check",
        urgency: "normal",
        button: "Confirm Details",
    },
];

export function RequiredActions() {
    const [completed, setCompleted] = useState<number[]>([]);

    const completeAction = (id: number) => {
        setCompleted((current) =>
            current.includes(id) ? current : [...current, id]
        );
    };

    return (
        <section className="rounded-xl border border-zinc-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 sm:px-6">
                <div>
                    <p className="text-sm font-bold text-zinc-950">
                        Required Compliance Actions
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                        Items that need your attention
                    </p>
                </div>

                <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600">
                    {initialActions.length} actions
                </span>
            </div>

            <div className="divide-y divide-zinc-100">
                {initialActions.map((action) => {
                    const isComplete = completed.includes(action.id);

                    return (
                        <div
                            key={action.id}
                            className={`p-5 transition sm:px-6 ${isComplete ? "bg-zinc-50/70" : ""
                                }`}
                        >
                            <div className="flex gap-3">
                                <div
                                    className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${action.urgency === "urgent"
                                        ? "bg-red-500"
                                        : action.urgency === "warning"
                                            ? "bg-amber-500"
                                            : "bg-zinc-400"
                                        }`}
                                />

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <h3
                                                className={`text-sm font-bold ${isComplete
                                                    ? "text-zinc-400 line-through"
                                                    : "text-zinc-900"
                                                    }`}
                                            >
                                                {action.title}
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-zinc-500">
                                                {action.description}
                                            </p>
                                        </div>

                                        <span
                                            className={`shrink-0 text-[10px] font-bold uppercase tracking-wide ${action.urgency === "urgent"
                                                ? "text-red-600"
                                                : action.urgency === "warning"
                                                    ? "text-amber-600"
                                                    : "text-zinc-500"
                                                }`}
                                        >
                                            {action.meta}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => completeAction(action.id)}
                                        disabled={isComplete}
                                        className={`mt-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-bold transition ${isComplete
                                            ? "cursor-default bg-emerald-50 text-emerald-700"
                                            : "bg-zinc-950 text-white hover:bg-zinc-800"
                                            }`}
                                    >
                                        {isComplete && <IconCheckCircle size={13} />}
                                        {isComplete ? "Completed" : action.button}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default RequiredActions;