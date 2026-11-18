"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { InteractiveBlueprint } from "@/components/sections/InteractiveBlueprint";

const HERO_FACTS = [
  "3 productos reales en producción",
  "Trato directo con ingeniería",
  "100% código a medida",
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center overflow-x-clip pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Subtle architectural blueprint background */}
      <div
        aria-hidden="true"
        className="architectural-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_45%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-accent/[0.06] blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Left editorial column */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-6"
        >
          <SectionEyebrow>Software a medida · Chile</SectionEyebrow>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-navy sm:text-5xl lg:text-[3.5rem]">
            Software que calza con tu operación,{" "}
            <span className="text-accent">no al revés.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            Somos <strong className="font-semibold text-navy">Stackline</strong>, una empresa
            joven de software dedicada a construir sistemas empresariales internos y
            aplicaciones web a la medida para cada requerimiento.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <PillButton href="#contacto" variant="accent">
              Cotizar tu proyecto
            </PillButton>
            <PillButton href="#proyectos" variant="ghost" showArrow={false}>
              Ver proyectos en producción
            </PillButton>
          </div>

          <ul
            aria-label="Compromisos de Stackline"
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-[#162B47]/[0.08] pt-6 font-mono text-xs text-ink-muted"
          >
            {HERO_FACTS.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right signature interactive preview */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.15 : 0.75,
            delay: prefersReducedMotion ? 0 : 0.1,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="lg:col-span-6"
        >
          <InteractiveBlueprint />
        </motion.div>
      </div>
    </section>
  );
}
