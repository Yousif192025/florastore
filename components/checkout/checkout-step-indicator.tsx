"use client";

import { cn } from "@/lib/utils";

interface Step { id: string; label: string }
interface Props { steps: Step[]; currentStep: string }

export function CheckoutStepIndicator({ steps, currentStep }: Props) {
  const currentIdx = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, idx) => {
        const isDone   = idx < currentIdx;
        const isActive = idx === currentIdx;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                isDone   && "bg-pink-500 text-white",
                isActive && "bg-pink-600 text-white ring-4 ring-pink-100",
                !isDone && !isActive && "bg-gray-100 text-gray-400"
              )}>
                {isDone ? "✓" : idx + 1}
              </div>
              <span className={cn(
                "text-xs mt-1.5 font-medium",
                isActive ? "text-pink-600" : isDone ? "text-pink-400" : "text-gray-400"
              )}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={cn(
                "w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-all duration-500",
                idx < currentIdx ? "bg-pink-400" : "bg-gray-200"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
