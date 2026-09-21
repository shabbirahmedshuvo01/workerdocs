import React from "react";
import { Badge } from "@/components/ui/badge";
import { IconShieldCheck } from "@/components/ui/icons";

export function PostponedFieldsNotice() {
  const postponedItems = [
    {
      title: "National Insurance Number (NINO)",
      detail: "Collected upon client placement contract offer for PAYE / payroll reporting.",
    },
    {
      title: "CIS (Construction Scheme) UTR Number",
      detail: "Verified during subcontractor agreement configuration for HMRC tax deduction rates.",
    },
    {
      title: "Bank Disbursement Details",
      detail: "Required only prior to scheduled payroll distribution and billing activation.",
    },
  ];

  return (
    <div className="rounded-lg border border-zinc-200/90 bg-zinc-50/70 p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <IconShieldCheck size={16} className="text-zinc-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-mono">
            Deferred Compliance Items
          </h4>
        </div>
        <Badge variant="outline" className="font-mono text-[10px] text-zinc-500 bg-white">
          POSTPONED TO PLACEMENT
        </Badge>
      </div>

      <p className="text-xs text-zinc-500 leading-relaxed">
        In accordance with UK compliance minimization practices, the following records are intentionally
        postponed and are <strong>not required</strong> during initial profile initialization:
      </p>

      <ul className="space-y-2 pt-1">
        {postponedItems.map((item) => (
          <li
            key={item.title}
            className="flex items-start gap-2.5 text-xs text-zinc-600 bg-white p-2.5 rounded border border-zinc-200/60"
          >
            <span className="font-mono text-zinc-400 font-bold shrink-0">•</span>
            <div>
              <span className="font-semibold text-zinc-800">{item.title}:</span>{" "}
              <span className="text-zinc-500">{item.detail}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

