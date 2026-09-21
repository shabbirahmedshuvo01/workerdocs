import React from "react";
import { StatusBadge, ComplianceStatus } from "./status-badge";
import { Button } from "./button";
import { IconFileText, IconEye, IconDownload, IconUpload } from "./icons";

export interface DocumentCardProps {
  id?: string;
  title: string;
  category: string;
  refCode?: string;
  status: ComplianceStatus;
  statusLabel?: string;
  fileType?: string;
  fileSize?: string;
  updatedAt?: string;
  expiresAt?: string;
  variant?: "default" | "technical";
  onView?: () => void;
  onUpload?: () => void;
  onDownload?: () => void;
  className?: string;
}

export function DocumentCard({
  id,
  title,
  category,
  refCode,
  status,
  statusLabel,
  fileType,
  fileSize,
  updatedAt,
  expiresAt,
  variant = "default",
  onView,
  onUpload,
  onDownload,
  className = "",
}: DocumentCardProps) {
  const isMissing = status === "missing";
  const crosshairClass =
    variant === "technical" ? "tech-crosshair-container tech-crosshair-tl" : "";

  return (
    <div
      id={id}
      className={`relative bg-white border border-gray-200/90 rounded-xl p-5 sm:p-6 transition-all duration-150 hover:border-blue-300 hover:shadow-[0_4px_16px_rgba(0,82,255,0.05)] ${crosshairClass} ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div
            className={`h-10 w-10 rounded-lg border flex items-center justify-center shrink-0 ${
              isMissing
                ? "bg-gray-50 border-dashed border-gray-300 text-gray-400"
                : "bg-blue-50/60 border-blue-100/80 text-[#0052FF]"
            }`}
          >
            <IconFileText size={18} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold text-gray-950 font-sans tracking-tight">
                {title}
              </h4>
              {refCode && (
                <span className="font-mono text-[10px] text-gray-400 px-1.5 py-0.5 bg-gray-50 border border-gray-200/80 rounded">
                  {refCode}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 font-sans mt-0.5">{category}</p>
          </div>
        </div>
        <StatusBadge status={status} label={statusLabel} size="sm" />
      </div>

      <div className="mt-4 pt-3.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-y-2 text-xs text-gray-500">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px]">
          {fileType && (
            <span className="font-semibold text-gray-700 uppercase">
              {fileType} {fileSize ? `· ${fileSize}` : ""}
            </span>
          )}
          {updatedAt && <span className="text-gray-400">Updated: {updatedAt}</span>}
          {expiresAt && (
            <span className="text-gray-600">
              Exp: <strong className="text-gray-900 font-semibold">{expiresAt}</strong>
            </span>
          )}
          {isMissing && (
            <span className="text-rose-600 font-sans text-xs font-medium">
              Document required on file
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {!isMissing && onView && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onView}
              iconLeft={<IconEye size={13} />}
              aria-label={`View ${title}`}
            >
              View
            </Button>
          )}
          {!isMissing && onDownload && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownload}
              iconLeft={<IconDownload size={13} />}
              aria-label={`Download ${title}`}
            >
              Download
            </Button>
          )}
          {onUpload && (
            <Button
              variant={isMissing ? "accent" : "secondary"}
              size="sm"
              onClick={onUpload}
              iconLeft={<IconUpload size={13} />}
              aria-label={isMissing ? `Upload ${title}` : `Replace ${title}`}
            >
              {isMissing ? "Upload" : "Replace"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
