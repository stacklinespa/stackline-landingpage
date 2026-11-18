import type { ReactNode } from "react";

interface DoubleBezelProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: "light" | "dark";
}

export function DoubleBezel({
  children,
  className = "",
  innerClassName = "",
  tone = "light",
}: DoubleBezelProps) {
  const outerTone =
    tone === "dark"
      ? "bg-white/[0.06] ring-1 ring-white/[0.12]"
      : "bg-tray/85 ring-1 ring-[#162B47]/[0.08]";

  const innerTone =
    tone === "dark"
      ? "bg-navy-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      : "bg-surface shadow-[0_1px_2px_rgba(22,43,71,0.04),0_12px_32px_-18px_rgba(22,43,71,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]";

  return (
    <div className={`rounded-[1.75rem] p-1.5 sm:rounded-[2rem] sm:p-2 ${outerTone} ${className}`}>
      <div
        className={`h-full rounded-[calc(1.75rem-0.375rem)] sm:rounded-[calc(2rem-0.5rem)] ${innerTone} ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
