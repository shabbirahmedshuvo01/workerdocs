import React from "react";
import Link from "next/link";

export interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light" | "mark-only";
  tag?: string;
  asLink?: boolean;
  className?: string;
}

export function Logo({
  size = "md",
  variant = "default",
  tag,
  asLink = true,
  className = "",
}: LogoProps) {
  const sizeConfig = {
    sm: {
      mark: "h-7 w-7 rounded-md text-sm",
      text: "text-lg",
    },
    md: {
      mark: "h-8 w-8 rounded-lg text-base",
      text: "text-xl",
    },
    lg: {
      mark: "h-10 w-10 rounded-xl text-lg",
      text: "text-2xl",
    },
  };

  const isLight = variant === "light";
  const markOnly = variant === "mark-only";
  const config = sizeConfig[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Mark */}
      <div
        className={`${config.mark} bg-[#0052FF] text-white flex items-center justify-center font-bold shadow-sm shrink-0 transition-colors group-hover:bg-[#0047e0]`}
        aria-hidden="true"
      >
        W<span className="text-blue-200">.</span>
      </div>

      {/* Wordmark */}
      {!markOnly && (
        <div className="flex items-center gap-2">
          <span
            className={`font-extrabold tracking-tight font-sans ${config.text} ${
              isLight ? "text-white" : "text-gray-950"
            }`}
          >
            Worker<span className="text-[#0052FF]">Docs</span>
          </span>
          {tag && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded border border-gray-200/80">
              {tag}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}

