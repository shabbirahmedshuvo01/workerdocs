"use client";

import React, { useState, useRef } from "react";
import { IconUpload, IconCheck, IconTrash } from "./icons";
import { Button } from "./button";

export interface FileUploadProps {
  label?: string;
  helperText?: string;
  accept?: string;
  maxSizeMb?: number;
  onFileSelect?: (file: File) => void;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  label,
  helperText = "PDF, JPG, or PNG up to 15MB",
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSizeMb = 15,
  onFileSelect,
  disabled = false,
  className = "",
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.size > maxSizeMb * 1024 * 1024) {
      return;
    }
    setSelectedFile({
      name: file.name,
      size: formatSize(file.size),
    });
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <span className="block text-xs font-semibold text-zinc-800 tracking-tight mb-1.5 select-none">
          {label}
        </span>
      )}

      {selectedFile ? (
        <div className="bg-white border border-zinc-200 rounded-lg p-4 flex items-center justify-between gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
              <IconCheck size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-zinc-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs font-mono text-zinc-500 mt-0.5">
                {selectedFile.size} · Ready for verification
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearFile}
            className="text-zinc-400 hover:text-rose-600 hover:bg-rose-50"
            aria-label="Remove uploaded file"
          >
            <IconTrash size={14} />
          </Button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={label || "Upload document file"}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`group relative bg-white border border-dashed rounded-lg p-7 text-center transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${disabled
              ? "bg-zinc-50/70 border-zinc-200 cursor-not-allowed opacity-60"
              : isDragOver
                ? "border-blue-600 bg-blue-50/20 ring-2 ring-blue-600/20"
                : "border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50/50"
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            disabled={disabled}
            onChange={(e) => handleFiles(e.target.files)}
            className="sr-only"
          />

          <div className="mx-auto w-10 h-10 rounded-full border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-600 group-hover:text-zinc-900 group-hover:border-zinc-300 transition-colors">
            <IconUpload size={18} />
          </div>

          <div className="mt-3">
            <span className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
              Click to upload
            </span>
            <span className="text-sm text-zinc-500"> or drag and drop</span>
          </div>

          <p className="mt-1 text-xs font-mono text-zinc-400">{helperText}</p>
        </div>
      )}
    </div>
  );
}
