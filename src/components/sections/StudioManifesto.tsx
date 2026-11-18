"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MANIFESTO_POINTS, PROCESS_STEPS } from "@/data/process";
import { SITE_CONFIG } from "@/data/site";

function StacklineSculpturalMonolith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const layerSlowY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const layerFastY = useTransform(scrollYProgress, [0, 1], [42, -36]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx * 14);
    mouseY.set(ny * 14);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative overflow-hidden rounded-[2rem] bg-navy-deep p-7 text-white sm:p-9 lg:min-h-[500px] lg:flex lg:flex-col lg:justify-between"
    >
      {/* Ambient terracotta warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#244672]/50 blur-3xl"
      />

      {/* Top studio tag */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
        <span>STACKLINE · 2026</span>
        <span className="flex items-center gap-2 text-white/90">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Agenda abierta
        </span>
      </div>

      {/* Sculptural kinetic geometry echoing Stackline's upward arrow */}
      <div className="relative z-10 my-10 flex items-center justify-center sm:my-12">
        <div className="relative h-48 w-48 sm:h-56 sm:w-56">
          {/* Architectural deep-navy glass plane */}
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { y: layerSlowY, x: smoothX }
            }
            aria-hidden="true"
            className="absolute inset-4 rounded-[2rem] border border-white/15 bg-white/[0.06] shadow-2xl"
          />

          {/* Diagonal architectural rail */}
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { y: layerFastY, x: smoothY }
            }
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg viewBox="0 0 180 180" fill="none" className="h-44 w-44 sm:h-52 sm:w-52">
              <line
                x1="28"
                y1="152"
                x2="148"
                y2="32"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              <rect
                x="32"
                y="102"
                width="48"
                height="48"
                rx="14"
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.22)"
              />
              <path
                d="M72 64L154 32L136 116L108 88L78 106L87 76L72 64Z"
                fill="#D95D30"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Candid studio voice */}
      <div className="relative z-10 border-t border-white/12 pt-6">
        <p className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
          Somos jóvenes, estamos empezando y nos tomamos cada línea de código en serio.
        </p>
        <p className="mt-2.5 text-sm leading-relaxed text-white/65">
          Buscamos empresas y emprendedores que quieran construir software real — con
          dedicación total desde {SITE_CONFIG.location}.
        </p>
      </div>
    </div>
  );
}

export function StudioManifesto() {
  const processRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 80%", "end 55%"],
  });

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
  });

  return (
    <div className="bg-stone">
      {/* Studio manifesto */}
      <section id="nosotros" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <StacklineSculpturalMonolith />
            </div>

            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Por qué elegir una empresa joven
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.03] tracking-[-0.035em] text-navy-deep sm:text-5xl">
                Sin burocracia.
                <br />
                Directo a construir.
              </h2>

              <div className="mt-10 divide-y divide-navy-deep/12 border-y border-navy-deep/12">
                {MANIFESTO_POINTS.map((point) => (
                  <article key={point.id} className="py-7 sm:py-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {point.label}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.02em] text-navy-deep sm:text-2xl">
                      {point.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink-secondary sm:text-base">
                      {point.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process horizontal editorial ribbon */}
      <section id="proceso" ref={processRef} className="scroll-mt-24 pb-24 pt-6 lg:pb-36 lg:pt-10">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Cómo trabajamos
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.035em] text-navy-deep sm:text-4xl">
                Cuatro pasos claros, de tu idea a producción.
              </h2>
            </div>
            <p className="font-mono text-xs text-ink-muted">01 → 04 · Ritmo semanal</p>
          </div>

          {/* Scroll-driven horizontal progress hairline */}
          <div className="relative mt-10 h-[2px] w-full overflow-hidden bg-navy-deep/12">
            <motion.div
              style={prefersReducedMotion ? undefined : { scaleX: progressScale }}
              className="h-full origin-left bg-accent"
            />
          </div>

          <ol className="grid grid-cols-1 divide-y divide-navy-deep/12 md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.number}
                className="flex flex-col justify-between py-8 md:px-6 md:first:pl-0 lg:px-7 lg:first:pl-0 lg:last:pr-0"
              >
                <div>
                  <span className="font-display text-4xl font-extrabold tracking-tight text-navy-deep/20">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.02em] text-navy-deep">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    {step.description}
                  </p>
                </div>

                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                  → {step.deliverable}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
