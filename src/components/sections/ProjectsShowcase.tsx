"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PillButton } from "@/components/ui/PillButton";
import { PROJECTS } from "@/data/projects";

export function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      id="proyectos"
      className="relative scroll-mt-24 overflow-x-clip bg-navy-deep py-24 text-white lg:py-32"
    >
      {/* Subtle warm editorial light pool behind the preview stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[460px] w-[460px] rounded-full bg-accent/[0.12] blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Section header */}
        <div className="grid grid-cols-1 items-end gap-6 border-b border-white/12 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Trabajo real en producción
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.4rem]">
              No vendemos promesas.
              <br />
              Mostramos software vivo.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/68 sm:text-base lg:col-span-5 lg:justify-self-end">
            Tres productos construidos a medida que hoy operan con usuarios reales. Selecciona
            cualquiera para inspeccionar su captura en vivo y abrirlo directamente.
          </p>
        </div>

        {/* Mobile quick selector pills */}
        <div
          role="tablist"
          aria-label="Seleccionar proyecto en vivo"
          className="mt-8 flex flex-wrap gap-2 lg:hidden"
        >
          {PROJECTS.map((project, idx) => {
            const selected = idx === activeIndex;
            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  selected
                    ? "bg-accent text-white"
                    : "bg-white/[0.06] text-white/70 ring-1 ring-white/12 hover:text-white"
                }`}
              >
                {project.index} · {project.name}
              </button>
            );
          })}
        </div>

        {/* Interactive agency split stage */}
        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* Left: Interactive editorial index (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="divide-y divide-white/12 border-b border-white/12">
              {PROJECTS.map((project, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className="relative"
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="active-project-indicator"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.05 }
                            : { type: "spring", duration: 0.45, bounce: 0.15 }
                        }
                        aria-hidden="true"
                        className="absolute inset-y-4 -left-4 w-[3px] rounded-full bg-accent"
                      />
                    ) : null}

                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-expanded={isActive}
                      className="group flex w-full items-baseline justify-between gap-4 py-6 text-left transition-opacity"
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-mono text-xs transition-colors ${
                            isActive ? "text-accent" : "text-white/40 group-hover:text-white/70"
                          }`}
                        >
                          {project.index}
                        </span>
                        <div>
                          <h3
                            className={`font-display text-3xl font-bold tracking-[-0.03em] transition-colors ${
                              isActive ? "text-white" : "text-white/45 group-hover:text-white/85"
                            }`}
                          >
                            {project.name}
                          </h3>
                          <p
                            className={`mt-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                              isActive ? "text-white/65" : "text-white/35"
                            }`}
                          >
                            {project.category} · {project.year}
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={20}
                        weight="light"
                        className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                          isActive
                            ? "translate-x-0.5 -translate-y-0.5 text-accent"
                            : "text-white/30 group-hover:text-white/70"
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          animate={
                            prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }
                          }
                          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pl-9 pr-2">
                            <p className="text-sm leading-relaxed text-white/75">
                              {project.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {project.capabilities.map((cap) => (
                                <span
                                  key={cap}
                                  className="rounded-full bg-white/[0.07] px-2.5 py-1 text-[11px] font-medium text-white/85 ring-1 ring-white/10"
                                >
                                  {cap}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Live full-bleed screenshot cinema stage */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#091321] ring-1 ring-white/12 shadow-[0_32px_90px_-30px_rgba(0,0,0,0.75)]">
              {/* Minimalist browser chrome */}
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
                </div>
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate rounded-full bg-white/[0.06] px-3 py-1 font-mono text-[11px] text-white/75 transition-colors hover:bg-white/[0.12] hover:text-white"
                >
                  {activeProject.domain}
                </a>
                <span className="font-mono text-[11px] text-white/45">{activeProject.index}/03</span>
              </div>

              {/* Real screenshot canvas */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B1626]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={activeProject.image}
                      alt={activeProject.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority={activeProject.id === "kurova"}
                      className="object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Caption & live action bar */}
              <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:px-6">
                <div>
                  <p className="font-display text-lg font-bold text-white lg:hidden">
                    {activeProject.name} —{" "}
                    <span className="text-sm font-normal text-white/70">
                      {activeProject.category}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-white/75 lg:mt-0">{activeProject.impactNote}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/60 lg:hidden">
                    {activeProject.description}
                  </p>
                </div>

                <PillButton href={activeProject.url} external variant="light" size="sm">
                  Abrir sitio en vivo
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
