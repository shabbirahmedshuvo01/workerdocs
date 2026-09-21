import React from "react";
import { IconSpinner } from "./icons";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "accent"
  | "white";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      iconLeft,
      iconRight,
      asChild = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-zinc-950 text-white border border-zinc-900 hover:bg-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
      accent:
        "bg-[#0052FF] text-white border border-[#0047e0] hover:bg-[#0047e0] shadow-[0_2px_6px_rgba(0,82,255,0.2)] focus-visible:ring-[#0052FF]",
      white:
        "bg-white text-[#0052FF] border border-white hover:bg-gray-50 shadow-[0_2px_6px_rgba(0,0,0,0.08)] focus-visible:ring-white",
      secondary:
        "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
      outline:
        "bg-transparent text-zinc-800 border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50",
      ghost:
        "bg-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100",
      destructive:
        "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 hover:border-rose-300",
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: "h-8 px-2.5 text-xs rounded-md gap-1.5 tracking-tight",
      md: "h-9 px-3.5 text-sm rounded-md gap-2 tracking-tight",
      lg: "h-11 px-5 text-sm rounded-lg gap-2.5 font-semibold",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: `${combinedClassName} ${child.props.className || ""}`.trim(),
      });
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading ? (
          <IconSpinner size={size === "sm" ? 13 : 15} className="text-current" />
        ) : (
          iconLeft
        )}
        <span>{children}</span>
        {!isLoading && iconRight}
      </button>
    );
  }
);

Button.displayName = "Button";
