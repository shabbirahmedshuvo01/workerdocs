import React from "react";
import { IconCheckCircle } from "@/components/ui/icons";

const activities = [
    {
        title: "Right to Work verified",
        description: "Home Office sharecode successfully checked",
        time: "Today, 10:42",
        type: "success",
    },
    {
        title: "CSCS Skilled Worker approved",
        description: "CITB Gold Card #849102 verified",
        time: "Yesterday, 16:18",
        type: "success",
    },
    {
        title: "DBS Check submitted",
        description: "Standard Disclosure #DBS-291 sent for review",
        time: "23 Sep, 14:06",
        type: "pending",
    },
    {
        title: "Site Safety document reviewed",
        description: "Battersea Phase 3 induction is awaiting sign-off",
        time: "22 Sep, 11:34",
        type: "pending",
    },
    {
        title: "Worker profile updated",
        description: "Contractor information synced successfully",
        time: "20 Sep, 09:15",
        type: "success",
    },
];

export function RecentActivity() {
    return (
        <section className="rounded-xl border border-zinc-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 sm:px-6">
                <div>
                    <p className="text-sm font-bold text-zinc-950">
                        Recent Verification Activity
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                        Latest compliance and credential events
                    </p>
                </div>

                <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                    Audit log
                </span>
            </div>

            <div className="divide-y divide-zinc-100">
                {activities.map((activity, index) => (
                    <div key={`${activity.title}-${index}`} className="flex gap-3 px-5 py-4 sm:px-6">
                        <div className="relative flex w-5 shrink-0 justify-center">
                            {index < activities.length - 1 && (
                                <span className="absolute top-5 h-full w-px bg-zinc-200" />
                            )}

                            <span
                                className={`relative z-10 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${activity.type === "success"
                                    ? "bg-emerald-50"
                                    : "bg-amber-50"
                                    }`}
                            >
                                {activity.type === "success" ? (
                                    <IconCheckCircle size={13} className="text-emerald-600" />
                                ) : (
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                )}
                            </span>
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                <p className="text-xs font-bold text-zinc-900">
                                    {activity.title}
                                </p>
                                <span className="shrink-0 text-[10px] text-zinc-400">
                                    {activity.time}
                                </span>
                            </div>

                            <p className="mt-1 text-[11px] leading-4 text-zinc-500">
                                {activity.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default RecentActivity;