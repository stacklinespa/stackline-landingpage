"use client";

import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PillButton } from "@/components/ui/PillButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { PROJECTS, type ProjectPreviewKey } from "@/data/projects";

function ProjectArtifactPreview({ id }: { id: ProjectPreviewKey }) {
  if (id === "kurova") {
    return (
      <div className="rounded-2xl bg-canvas p-4 ring-1 ring-[#162B47]/[0.07]">
        <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted">
          <span>KUROVA · UTILIDAD POR ATENCIÓN</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 ring-1 ring-emerald-200">
            Congelado
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-surface p-3 ring-1 ring-[#162B47]/[0.06]">
            <p className="font-mono text-[10px] uppercase text-ink-muted">Promedio ponderado</p>
            <p className="mt-1 font-display text-base font-bold text-navy">$12,84 / ml</p>
          </div>
          <div className="rounded-xl bg-navy p-3 text-white">
            <p className="font-mono text-[10px] uppercase text-white/65">Utilidad neta</p>
            <p className="mt-1 font-display text-base font-bold text-white">+$18.400</p>
          </div>
        </div>
      </div>
    );
  }

  if (id === "kalibre3d") {
    return (
      <div className="rounded-2xl bg-canvas p-4 ring-1 ring-[#162B47]/[0.07]">
        <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted">
          <span>KALIBRE 3D · PEDIDO #42</span>
          <span className="rounded-full bg-accent-tint px-2 py-0.5 text-accent ring-1 ring-accent/20">
            PETG Bicolor
          </span>
        </div>
        <div className="mt-3 space-y-2 rounded-xl bg-surface p-3 text-xs ring-1 ring-[#162B47]/[0.06]">
          <div className="flex items-center justify-between text-ink-secondary">
            <span>Pieza + purga multicolor</span>
            <span className="font-mono font-medium text-navy">50 g + 14 g</span>
          </div>
          <div className="flex items-center justify-between text-ink-secondary">
            <span>Neto Mercado Libre</span>
            <span className="font-mono font-medium text-navy">$6.483</span>
          </div>
          <div className="flex items-center justify-between border-t border-[#162B47]/[0.07] pt-2 font-semibold text-navy">
            <span>Ganancia real taller</span>
            <span className="font-mono text-accent">+$5.378</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-canvas p-4 ring-1 ring-[#162B47]/[0.07]">
      <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted">
        <span>SURKO · CATÁLOGO A MEDIDA</span>
        <span className="rounded-full bg-surface px-2 py-0.5 text-navy ring-1 ring-[#162B47]/[0.1]">
          Envíos Chile
        </span>
      </div>
      <div className="mt-3 rounded-xl bg-surface p-3 ring-1 ring-[#162B47]/[0.06]">
        <p className="text-xs font-semibold text-navy">Emblemas, llaveros y kits 3D</p>
        <p className="mt-1 text-[11px] text-ink-secondary">
          Selección de línea, combinación de colores y cotización directa.
        </p>
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-navy ring-2 ring-white" aria-hidden="true" />
          <span className="h-3.5 w-3.5 rounded-full bg-accent ring-2 ring-white" aria-hidden="true" />
          <span className="h-3.5 w-3.5 rounded-full bg-slate-300 ring-2 ring-white" aria-hidden="true" />
          <span className="ml-1 font-mono text-[10px] text-ink-muted">Colores a elección</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsShowcase() {
  return (
    <section id="proyectos" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionReveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <SectionEyebrow>Proyectos en producción</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              Software real que hoy usan personas y negocios reales.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-secondary sm:text-[15px]">
            No mostramos maquetas inventadas. Cada uno de estos productos fue diseñado y
            desarrollado a medida y puedes explorarlo en vivo ahora mismo.
          </p>
        </MotionReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, idx) => (
            <MotionReveal key={project.id} delay={idx * 0.08} className="h-full">
              <DoubleBezel
                className="h-full"
                innerClassName="flex h-full flex-col justify-between p-6"
              >
                <div>
                  <ProjectArtifactPreview id={project.id} />

                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {project.category}
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.025em] text-navy">
                    {project.name}
                  </h3>

                  <p className="mt-1.5 text-sm font-medium text-navy/85">
                    {project.tagline}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-full bg-tray/85 px-2.5 py-1 text-[11px] font-medium text-navy ring-1 ring-[#162B47]/[0.06]"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between gap-3 border-t border-[#162B47]/[0.08] pt-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                      {project.metricLabel}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-navy">
                      {project.metricValue}
                    </p>
                  </div>
                  <PillButton href={project.url} external variant="navy" size="sm">
                    Ver en vivo
                  </PillButton>
                </div>
              </DoubleBezel>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
