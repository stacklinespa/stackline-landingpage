"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, Copy } from "@phosphor-icons/react";
import { PillButton } from "@/components/ui/PillButton";
import { SITE_CONFIG } from "@/data/site";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const revealLine = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: "100%" },
    animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: "0%" },
    transition: {
      duration: prefersReducedMotion ? 0.15 : 0.72,
      delay: prefersReducedMotion ? 0 : delay,
      ease: [0.23, 1, 0.32, 1] as const,
    },
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] flex-col justify-between bg-canvas pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-28 lg:pb-14"
    >
      <div className="mx-auto flex w-full max-w-[1380px] flex-1 flex-col justify-between px-4 sm:px-6 lg:px-10">
        {/* Top studio index line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-deep/[0.09] pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted"
        >
          <span>Estudio joven de ingeniería de software</span>
          <span className="flex items-center gap-2 text-navy-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>Chile · Proyectos a medida</span>
          </span>
        </motion.div>

        {/* Monumental full-width editorial poster headline — calibrated for wide Syne glyphs */}
        <div className="my-10 sm:my-12 lg:my-10">
          <h1 className="font-display text-[clamp(2.15rem,6.1vw,5.75rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-navy-deep">
            <span className="block overflow-hidden py-1">
              <motion.span
                {...revealLine(0.04)}
                className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-5"
              >
                <span>CREAMOS</span>
                {/* Inline sculptural Stackline arrow pill */}
                <motion.span
                  aria-hidden="true"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.07, rotate: 4 }}
                  transition={{ type: "spring", duration: 0.45, bounce: 0.25 }}
                  className="inline-flex h-[0.74em] w-[1.3em] shrink-0 items-center justify-center rounded-full bg-accent align-middle shadow-[0_14px_32px_-12px_rgba(217,93,48,0.7)]"
                >
                  <svg viewBox="0 0 40 32" fill="none" className="h-[52%] w-auto">
                    <path
                      d="M5 17.5L35 5L28.5 29L20.5 20.5L12 26L14.8 18.2L5 17.5Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </motion.span>
                <span>SOFTWARE</span>
              </motion.span>
            </span>

            <span className="block overflow-hidden py-1">
              <motion.span {...revealLine(0.14)} className="block">
                A TU <span className="text-accent">MEDIDA.</span>
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Asymmetric editorial bottom bar — sits cleanly above the fold on desktop */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: prefersReducedMotion ? 0 : 0.22,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="grid grid-cols-1 items-end gap-6 border-t border-navy-deep/[0.1] pt-7 lg:grid-cols-12"
        >
          <p className="max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg lg:col-span-6">
            Somos <strong className="font-semibold text-navy-deep">Stackline</strong>, una empresa
            de software joven buscando nuevos desafíos reales. Diseñamos y programamos sistemas
            empresariales internos y aplicaciones web desde cero para cada requerimiento — sin
            plantillas ni burocracia.
          </p>

          <div className="flex flex-col items-start gap-3.5 sm:flex-row sm:flex-wrap sm:items-center lg:col-span-6 lg:justify-end">
            <PillButton href="#contacto" variant="accent">
              Cuéntanos tu proyecto
            </PillButton>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-stone px-4 py-3 text-sm font-medium text-navy-deep ring-1 ring-navy-deep/10 transition-[background-color,transform] duration-200 hover:bg-tray active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check size={15} weight="bold" className="text-accent" />
                  <span>Correo copiado</span>
                </>
              ) : (
                <>
                  <Copy size={15} weight="light" className="text-ink-muted" />
                  <span className="font-mono text-xs sm:text-[13px]">{SITE_CONFIG.email}</span>
                </>
              )}
            </button>

            <a
              href="#proyectos"
              className="group inline-flex shrink-0 items-center gap-1.5 py-2 text-sm font-semibold text-navy-deep transition-colors hover:text-accent"
            >
              <span>Ver trabajo real</span>
              <ArrowDown
                size={15}
                weight="regular"
                className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
