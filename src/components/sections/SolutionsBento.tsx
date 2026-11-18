"use client";

import {
  Buildings,
  Check,
  Code,
  GlobeHemisphereWest,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SOLUTIONS, type SolutionIconName } from "@/data/solutions";

function SolutionIcon({ name, featured }: { name: SolutionIconName; featured: boolean }) {
  const iconClass = featured ? "text-accent" : "text-navy";
  switch (name) {
    case "buildings":
      return <Buildings size={24} weight="light" className={iconClass} />;
    case "globe":
      return <GlobeHemisphereWest size={24} weight="light" className={iconClass} />;
    case "sliders":
      return <SlidersHorizontal size={24} weight="light" className={iconClass} />;
    case "code":
      return <Code size={24} weight="light" className={iconClass} />;
  }
}

export function SolutionsBento() {
  return (
    <section id="soluciones" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionReveal className="max-w-2xl">
          <SectionEyebrow>Qué construimos</SectionEyebrow>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
            Soluciones diseñadas exactamente para cómo trabaja tu equipo.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
            Nos especializamos en dos frentes claros: herramientas empresariales internas y
            aplicaciones web a medida. Sin inflar presupuestos con funciones que nadie usa.
          </p>
        </MotionReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {SOLUTIONS.map((item, idx) => (
            <MotionReveal
              key={item.id}
              delay={idx * 0.06}
              className={`col-span-1 ${item.colSpanClass}`}
            >
              <DoubleBezel
                className="h-full"
                innerClassName="flex h-full flex-col justify-between p-6 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                      {item.eyebrow}
                    </span>
                    <div
                      aria-hidden="true"
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${
                        item.featured
                          ? "bg-accent-tint ring-accent/20"
                          : "bg-tray ring-[#162B47]/[0.08]"
                      }`}
                    >
                      <SolutionIcon name={item.icon} featured={item.featured} />
                    </div>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.025em] text-navy sm:text-[1.65rem]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary sm:text-[15px]">
                    {item.description}
                  </p>
                </div>

                <ul className="mt-7 space-y-2.5 border-t border-[#162B47]/[0.08] pt-5">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm text-navy/90"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent"
                      >
                        <Check size={11} weight="bold" />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </DoubleBezel>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
