import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionEyebrow({
  children,
  tone = "light",
  className = "",
}: SectionEyebrowProps) {
  const toneClasses =
    tone === "dark"
      ? "bg-white/10 text-white/85 ring-white/15"
      : "bg-accent-tint text-accent ring-accent/20";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] ring-1 ${toneClasses} ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
