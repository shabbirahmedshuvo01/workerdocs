import React from "react";
import { Label } from "./label";
import { IconChevronDown } from "./icons";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  options?: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      required,
      helperText,
      error,
      options,
      children,
      disabled,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const hasError = Boolean(error);

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={selectId} required={required}>
            {label}
          </Label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={`w-full h-10 pl-3 pr-9 text-sm bg-white text-zinc-900 border rounded-md transition-colors appearance-none focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 disabled:bg-zinc-50 disabled:text-zinc-400 disabled:border-zinc-200 disabled:cursor-not-allowed cursor-pointer ${hasError
                ? "border-rose-500 focus:border-rose-600 focus:ring-rose-500"
                : "border-zinc-200 hover:border-zinc-300"
              } ${className}`}
            {...props}
          >
            {options
              ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
              : children}
          </select>
          <div className="absolute right-3 text-zinc-400 pointer-events-none flex items-center">
            <IconChevronDown size={14} />
          </div>
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

Select.displayName = "Select";

