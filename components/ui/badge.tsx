import React from "react";

export type BadgeVariant =
  | "default"
  | "neutral"
  | "accent"
  | "outline"
  | "success"
  | "warning"
  | "error";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  className = "",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-mono font-medium select-none tracking-tight";

  const sizeStyles = {
    sm: "text-[10px] px-1.5 py-0.5 rounded gap-1",
    md: "text-xs px-2 py-0.5 rounded-md gap-1.5",
  };

  const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-zinc-100 text-zinc-800 border border-zinc-200/80",
    neutral: "bg-zinc-50 text-zinc-600 border border-zinc-200/60",
    accent: "bg-blue-50 text-blue-700 border border-blue-200/80",
    outline: "bg-transparent text-zinc-700 border border-zinc-300",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200/80",
    warning: "bg-amber-50 text-amber-800 border border-amber-200/80",
    error: "bg-rose-50 text-rose-800 border border-rose-200/80",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
}

