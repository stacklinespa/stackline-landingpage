"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { CAPABILITIES } from "@/data/solutions";

export function CapabilitiesAccordion() {
  const [openId, setOpenId] = useState<string>(CAPABILITIES[0].id);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="soluciones" className="scroll-mt-24 bg-canvas py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left sticky editorial intro */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Qué construimos
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.035em] text-navy-deep sm:text-4xl lg:text-[2.75rem]">
              Dos frentes claros. Cero relleno.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-secondary">
              Preferimos hacer pocas cosas con un nivel de oficio altísimo: sistemas
              empresariales internos y aplicaciones web a la medida de cada requerimiento.
            </p>
          </div>

          {/* Right unboxed editorial accordion rows */}
          <div className="border-t border-navy-deep/12 lg:col-span-8">
            {CAPABILITIES.map((cap) => {
              const isOpen = openId === cap.id;
              return (
                <div key={cap.id} className="border-b border-navy-deep/12">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? "" : cap.id)}
                    className="group flex w-full items-start justify-between gap-4 py-7 text-left sm:py-9"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                      <span className="font-mono text-xs font-medium text-accent">
                        {cap.index}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-navy-deep transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                          {cap.title}
                        </h3>
                        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                          {cap.shortTag}
                        </p>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        isOpen
                          ? "rotate-45 bg-navy-deep text-white ring-navy-deep"
                          : "bg-transparent text-navy-deep ring-navy-deep/15 group-hover:bg-stone"
                      }`}
                    >
                      <Plus size={18} weight="light" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={
                          prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }
                        }
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-9 sm:pl-11">
                          <p className="max-w-2xl text-base leading-relaxed text-ink-secondary">
                            {cap.summary}
                          </p>

                          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {cap.details.map((detail) => (
                              <li
                                key={detail}
                                className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-deep"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                                />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>

                          <p className="mt-6 inline-block rounded-full bg-stone px-4 py-2 text-xs font-medium text-ink-secondary">
                            <span className="font-semibold text-navy-deep">Ideal para:</span>{" "}
                            {cap.idealFor}
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
