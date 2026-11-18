"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react";
import { StacklineLogo } from "@/components/brand/StacklineLogo";
import { PillButton } from "@/components/ui/PillButton";
import { SITE_CONFIG } from "@/data/site";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          menuOpen
            ? "border-b border-white/10 bg-navy-deep"
            : "border-b border-navy-deep/[0.08] bg-white/88 backdrop-blur-xl"
        }`}
      >
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-[72px] w-full max-w-[1380px] items-center justify-between px-4 sm:px-6 lg:px-10"
        >
          <a
            href="#inicio"
            aria-label="Stackline — Ir al inicio"
            className="flex items-center py-1"
            onClick={() => setMenuOpen(false)}
          >
            <StacklineLogo variant={menuOpen ? "dark" : "light"} className="h-7 w-auto sm:h-8" />
          </a>

          {/* Live studio status — desktop only */}
          <div className="hidden items-center gap-2.5 text-xs font-medium text-ink-secondary xl:flex">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>{SITE_CONFIG.availabilityLabel}</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative py-1 text-sm font-medium text-ink-secondary transition-colors duration-200 hover:text-navy-deep"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <PillButton href="#contacto" variant="navy" size="sm">
              Hablemos
            </PillButton>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 active:scale-95 md:hidden ${
              menuOpen
                ? "bg-white/10 text-white"
                : "bg-stone text-navy-deep ring-1 ring-navy-deep/10"
            }`}
          >
            <span
              className={`absolute h-[1.75px] w-4 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "translate-y-0 rotate-45 bg-white" : "-translate-y-[3.5px] bg-navy-deep"
              }`}
            />
            <span
              className={`absolute h-[1.75px] w-4 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "translate-y-0 -rotate-45 bg-white" : "translate-y-[3.5px] bg-navy-deep"
              }`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.28,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-navy-deep px-6 pb-10 pt-28 text-white md:hidden"
          >
            <div className="space-y-1">
              <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {SITE_CONFIG.availabilityLabel}
              </p>
              <nav aria-label="Enlaces móviles" className="flex flex-col">
                {SITE_CONFIG.navItems.map((item, idx) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.1 : 0.35,
                      delay: prefersReducedMotion ? 0 : 0.04 + idx * 0.05,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl font-bold tracking-tight text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={22} weight="light" className="text-accent" />
                  </motion.a>
                ))}
              </nav>
            </div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-4"
            >
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-4 py-3.5 text-sm font-medium text-white ring-1 ring-white/12"
              >
                <EnvelopeSimple size={18} weight="light" className="text-accent" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <PillButton
                href="#contacto"
                variant="accent"
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                Iniciar un proyecto
              </PillButton>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
