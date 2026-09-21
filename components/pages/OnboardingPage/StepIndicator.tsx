import React from "react";
import { IconCheck } from "@/components/ui/icons";

export interface StepItem {
  number: number;
  title: string;
  subtitle: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: StepItem[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  const progressPercent = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="w-full space-y-4">
      {/* Visual & Accessible Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>STEP {Math.min(currentStep, steps.length)} OF {steps.length}</span>
          <span>{progressPercent}% COMPLETED</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Onboarding setup progress"
          className="w-full h-1.5 bg-zinc-200/80 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-[#0052FF] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step Pills / Flow Indicator */}
      <nav aria-label="Onboarding steps" className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              aria-current={isCurrent ? "step" : undefined}
              className={`p-3 rounded-lg border transition-all flex items-center gap-3 ${
                isCurrent
                  ? "bg-blue-50/50 border-[#0052FF]/40 text-zinc-900 shadow-xs ring-1 ring-[#0052FF]/20"
                  : isCompleted
                  ? "bg-white border-zinc-200 text-zinc-800"
                  : "bg-zinc-50/70 border-zinc-200/60 text-zinc-400"
              }`}
            >
              {/* Step Circle Indicator */}
              <div
                className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                  isCompleted
                    ? "bg-[#0052FF] text-white"
                    : isCurrent
                    ? "bg-[#0052FF] text-white ring-2 ring-[#0052FF]/30"
                    : "bg-zinc-200 text-zinc-500"
                }`}
              >
                {isCompleted ? <IconCheck size={14} strokeWidth={2.5} /> : step.number}
              </div>

              {/* Step Titles */}
              <div className="min-w-0 flex-1">
                <p
                  className={`text-xs font-bold tracking-tight truncate ${
                    isCurrent ? "text-[#0052FF]" : isCompleted ? "text-zinc-900" : "text-zinc-500"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[11px] text-zinc-500 truncate">{step.subtitle}</p>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
