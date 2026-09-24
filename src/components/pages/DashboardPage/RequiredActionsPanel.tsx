import React from "react";
import { Button, IconAlertTriangle, IconFileText, StatusBadge } from "../../ui";
// import { Button } from "@/components/ui/button";
// import { StatusBadge } from "@/components/ui/status-badge";
// import { IconAlertTriangle, IconFileText } from "@/components/ui/icons";

export interface RequiredActionItem {
  id: string;
  title: string;
  category: string;
  description: string;
  status: "review" | "pending";
  statusLabel: string;
  actionText: string;
}

const defaultActions: RequiredActionItem[] = [
  {
    id: "action-address",
    title: "Proof of Address Verification Required",
    category: "Address Verification",
    description: "Updated proof of address document requested to keep residential placement records current.",
    status: "review",
    statusLabel: "ACTION REQUIRED",
    actionText: "Upload Document",
  },
  {
    id: "action-cscs",
    title: "CSCS Qualification Card Renewal",
    category: "Trade Cards & Tickets",
    description: "CSCS registration card approaching scheduled renewal review window.",
    status: "pending",
    statusLabel: "UPCOMING RENEWAL",
    actionText: "Review Details",
  },
];

export interface RequiredActionsPanelProps {
  actions?: RequiredActionItem[];
  className?: string;
}

export function RequiredActionsPanel({
  actions = defaultActions,
  className = "",
}: RequiredActionsPanelProps) {
  return (
    <section aria-labelledby="required-actions-heading" className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-amber-500 flex items-center" aria-hidden="true">
            <IconAlertTriangle size={16} />
          </span>
          <h2
            id="required-actions-heading"
            className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900"
          >
            Required Actions ({actions.length})
          </h2>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          Items requiring worker attention
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {actions.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-zinc-200 rounded-lg p-4 sm:p-5 flex flex-col justify-between gap-4 transition-colors hover:border-zinc-300 relative tech-crosshair-container tech-crosshair-tr"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-medium text-zinc-500 uppercase tracking-wide px-1.5 py-0.5 bg-zinc-100 rounded border border-zinc-200/60">
                  {item.category}
                </span>
                <StatusBadge status={item.status} label={item.statusLabel} size="sm" />
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <span className="text-zinc-400 mt-0.5 shrink-0" aria-hidden="true">
                  <IconFileText size={16} />
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-zinc-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-medium h-8"
              >
                {item.actionText}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

