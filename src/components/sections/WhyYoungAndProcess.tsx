"use client";

import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { PROCESS_STEPS, YOUNG_PILLARS } from "@/data/process";

export function WhyYoungAndProcess() {
  return (
    <div className="space-y-8">
      {/* Young company positioning */}
      <section id="nosotros" className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <MotionReveal className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionEyebrow>Por qué Stackline</SectionEyebrow>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                Una empresa de software joven significa foco total y cero burocracia.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-ink-secondary lg:col-span-5">
              Tratamos cada sistema como un producto propio: nos involucramos en tu operación,
              proponemos soluciones prácticas y construimos sin capas innecesarias.
            </p>
          </MotionReveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {YOUNG_PILLARS.map((pillar, idx) => (
              <MotionReveal key={pillar.id} delay={idx * 0.07} className="h-full">
                <DoubleBezel className="h-full" innerClassName="flex h-full flex-col p-6 sm:p-7">
                  <span className="w-fit rounded-full bg-accent-tint px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                    {pillar.badge}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em] text-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    {pillar.description}
                  </p>
                </DoubleBezel>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Numbered 4-step process (true sequential order) */}
      <section id="proceso" className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <MotionReveal className="max-w-2xl">
            <SectionEyebrow>Cómo trabajamos</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              De tu requerimiento a producción en cuatro pasos claros.
            </h2>
          </MotionReveal>

          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, idx) => (
              <li key={step.number} className="h-full list-none">
                <MotionReveal delay={idx * 0.07} className="h-full">
                  <DoubleBezel
                    className="h-full"
                    innerClassName="flex h-full flex-col justify-between p-6"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-2xl font-medium tracking-tight text-accent">
                          {step.number}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-px w-10 bg-[#162B47]/[0.12]"
                        />
                      </div>

                      <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em] text-navy">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-[#162B47]/[0.08] pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                        Entregable
                      </p>
                      <p className="mt-1 text-xs font-semibold text-navy">
                        {step.deliverable}
                      </p>
                    </div>
                  </DoubleBezel>
                </MotionReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
