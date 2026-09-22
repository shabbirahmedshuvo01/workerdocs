import React from "react";
import { IconCheck } from "./icons";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, disabled, className = "", id, checked, ...props }, ref) => {
    const checkboxId =
      id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={`flex items-start gap-3 select-none ${className}`}>
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div
            className={`h-4 w-4 rounded border transition-all duration-150 flex items-center justify-center cursor-pointer ${disabled
                ? "bg-zinc-100 border-zinc-200 cursor-not-allowed text-zinc-300"
                : "border-zinc-300 bg-white peer-checked:bg-zinc-950 peer-checked:border-zinc-950 peer-focus-visible:ring-2 peer-focus-visible:ring-zinc-950 peer-focus-visible:ring-offset-1 hover:border-zinc-400"
              }`}
          >
            <IconCheck
              size={12}
              className={`transition-opacity duration-150 text-white stroke-[2.5] ${checked ? "opacity-100" : "opacity-0 peer-checked:opacity-100"
                }`}
            />
          </div>
        </div>
        {(label || description) && (
          <label
            htmlFor={checkboxId}
            className={`text-sm cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""
              }`}
          >
            {label && (
              <span className="font-medium text-zinc-900 block leading-tight">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-zinc-500 block mt-0.5 leading-relaxed">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

