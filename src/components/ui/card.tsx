import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "technical" | "subtle";
  interactive?: boolean;
}

export function Card({
  children,
  variant = "default",
  interactive = false,
  className = "",
  ...props
}: CardProps) {
  const baseStyles =
    "bg-white rounded-lg border transition-all duration-150 relative";

  const variantStyles = {
    default: "border-zinc-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)]",
    technical:
      "border-zinc-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] tech-crosshair-container tech-crosshair-tl tech-crosshair-br",
    subtle: "border-zinc-150 bg-zinc-50/50",
  };

  const interactiveStyles = interactive
    ? "hover:border-zinc-300 hover:shadow-[0_3px_12px_rgba(0,0,0,0.05)] cursor-pointer"
    : "";

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 pb-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-base font-semibold text-zinc-900 tracking-tight leading-snug ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-xs text-zinc-500 mt-1 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 pt-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-5 py-3.5 border-t border-zinc-100 bg-zinc-50/40 rounded-b-lg flex items-center justify-between text-xs text-zinc-500 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

