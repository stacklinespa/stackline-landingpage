"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

interface PillButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: "accent" | "navy" | "ghost";
  size?: "sm" | "md";
  showArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export function PillButton({
  children,
  href,
  external = false,
  variant = "accent",
  size = "md",
  showArrow = true,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: PillButtonProps) {
  const variantStyles = {
    accent:
      "bg-accent text-white hover:bg-accent-hover shadow-[0_8px_24px_-10px_rgba(212,95,50,0.65)]",
    navy: "bg-navy text-white hover:bg-navy-deep shadow-[0_8px_24px_-12px_rgba(22,43,71,0.45)]",
    ghost:
      "bg-surface text-navy ring-1 ring-[#162B47]/[0.12] hover:ring-[#162B47]/[0.24] hover:bg-tray/50",
  }[variant];

  const iconWrapStyles = {
    accent: "bg-white/18 text-white",
    navy: "bg-white/14 text-white",
    ghost: "bg-navy/[0.06] text-navy",
  }[variant];

  const sizeStyles =
    size === "sm"
      ? showArrow
        ? "py-1.5 pl-4 pr-1.5 text-sm gap-2.5"
        : "px-4 py-2 text-sm gap-2"
      : showArrow
        ? "py-2 pl-5 pr-2 text-sm sm:text-[15px] gap-3"
        : "px-6 py-3 text-sm sm:text-[15px] gap-2";

  const iconSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";

  const sharedClasses = `group inline-flex items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-[transform,background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 ${variantStyles} ${sizeStyles} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 ${iconWrapStyles} ${iconSize}`}
        >
          <ArrowUpRight size={15} weight="regular" />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={sharedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={sharedClasses}>
      {content}
    </button>
  );
}
