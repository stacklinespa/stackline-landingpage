"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EnvelopeSimple } from "@phosphor-icons/react";
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:pt-5">
        <nav
          aria-label="Navegación principal"
          className="pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-surface/85 px-4 py-2.5 shadow-[0_12px_36px_-18px_rgba(22,43,71,0.22)] ring-1 ring-[#162B47]/[0.09] backdrop-blur-xl sm:px-5"
        >
          <a
            href="#inicio"
            aria-label="Stackline — Ir al inicio"
            className="flex items-center rounded-full py-0.5 focus-visible:outline-offset-4"
            onClick={() => setMenuOpen(false)}
          >
            <StacklineLogo className="h-7 w-auto sm:h-8" />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {SITE_CONFIG.navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-secondary transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-tray/80 hover:text-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <PillButton href="#contacto" variant="accent" size="sm">
              Cotizar proyecto
            </PillButton>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-tray/80 text-navy ring-1 ring-[#162B47]/[0.08] transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 md:hidden"
          >
            <span
              className={`absolute h-[1.75px] w-4 rounded-full bg-navy transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[3.5px]"
              }`}
            />
            <span
              className={`absolute h-[1.75px] w-4 rounded-full bg-navy transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[3.5px]"
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
              duration: prefersReducedMotion ? 0.1 : 0.25,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-canvas/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            <nav aria-label="Enlaces móviles" className="flex flex-col gap-3">
              {SITE_CONFIG.navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.1 : 0.35,
                    delay: prefersReducedMotion ? 0 : 0.05 + idx * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="border-b border-[#162B47]/[0.08] py-4 font-display text-3xl font-bold tracking-tight text-navy"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-4"
            >
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 rounded-2xl bg-surface px-4 py-3.5 text-sm font-medium text-navy ring-1 ring-[#162B47]/[0.08]"
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
                Cotizar tu proyecto
              </PillButton>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
