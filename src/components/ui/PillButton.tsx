"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

interface PillButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: "accent" | "navy" | "light" | "ghost" | "ghost-dark";
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
      "bg-accent text-white hover:bg-accent-hover shadow-[0_10px_28px_-12px_rgba(217,93,48,0.65)]",
    navy: "bg-navy-deep text-white hover:bg-navy shadow-[0_10px_28px_-14px_rgba(14,28,47,0.5)]",
    light: "bg-white text-navy-deep hover:bg-stone",
    ghost:
      "bg-transparent text-navy-deep ring-1 ring-navy-deep/15 hover:ring-navy-deep/35 hover:bg-stone",
    "ghost-dark":
      "bg-white/[0.06] text-white ring-1 ring-white/15 hover:bg-white/[0.12] hover:ring-white/30",
  }[variant];

  const iconWrapStyles = {
    accent: "bg-white/20 text-white",
    navy: "bg-white/14 text-white",
    light: "bg-navy-deep/8 text-navy-deep",
    ghost: "bg-navy-deep/8 text-navy-deep",
    "ghost-dark": "bg-white/14 text-white",
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

  const sharedClasses = `group inline-flex shrink-0 whitespace-nowrap items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-[transform,background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 ${variantStyles} ${sizeStyles} ${className}`;

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
