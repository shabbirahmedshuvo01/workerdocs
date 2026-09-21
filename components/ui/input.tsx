import React from "react";
import { Label } from "./label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  prefixText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      helperText,
      error,
      iconLeft,
      iconRight,
      prefixText,
      disabled,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const hasError = Boolean(error);

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}
        <div className="relative flex items-center">
          {iconLeft && (
            <div className="absolute left-3 text-zinc-400 pointer-events-none flex items-center">
              {iconLeft}
            </div>
          )}
          {prefixText && (
            <span className="absolute left-3 font-mono text-xs font-medium text-zinc-400 select-none pointer-events-none">
              {prefixText}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full h-10 px-3 text-sm bg-white text-zinc-900 border rounded-md transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 disabled:bg-zinc-50 disabled:text-zinc-400 disabled:border-zinc-200 disabled:cursor-not-allowed ${hasError
                ? "border-rose-500 focus:border-rose-600 focus:ring-rose-500"
                : "border-zinc-200 hover:border-zinc-300"
              } ${iconLeft ? "pl-9" : prefixText ? "pl-11" : "pl-3"} ${iconRight ? "pr-9" : "pr-3"
              } ${className}`}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3 text-zinc-400 pointer-events-none flex items-center">
              {iconRight}
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs font-mono text-rose-600 flex items-center gap-1">
            <span>•</span> {error}
          </p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-zinc-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

