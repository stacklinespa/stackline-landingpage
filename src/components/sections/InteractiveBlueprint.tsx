"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Cube,
  GlobeHemisphereWest,
  ShieldCheck,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import { DoubleBezel } from "@/components/ui/DoubleBezel";

type BlueprintMode = "erp" | "web";

interface ModuleSpec {
  id: string;
  label: string;
  metricBoost: string;
  logEntry: string;
}

const BLUEPRINT_DATA: Record<
  BlueprintMode,
  {
    tabLabel: string;
    fileLabel: string;
    headline: string;
    baseMetricLabel: string;
    metricByCount: Record<number, string>;
    secondaryLabel: string;
    secondaryValue: string;
    modules: ModuleSpec[];
  }
> = {
  erp: {
    tabLabel: "Sistema Interno",
    fileLabel: "arquitectura / operacion-erp",
    headline: "Control operativo y margen real en vivo",
    baseMetricLabel: "Visibilidad operativa",
    metricByCount: {
      1: "Control base",
      2: "94% en línea",
      3: "100% en vivo",
    },
    secondaryLabel: "Trazabilidad",
    secondaryValue: "Historial auditable",
    modules: [
      {
        id: "stock",
        label: "Inventario al costo real",
        metricBoost: "Alertas de reposición activas",
        logEntry: "Bodega Central · Costo promedio actualizado ($12.840/u)",
      },
      {
        id: "margen",
        label: "Margen por orden",
        metricBoost: "Cálculo neto automático",
        logEntry: "Orden #418 · Costo congelado · Margen +$54.200",
      },
      {
        id: "roles",
        label: "Permisos por rol",
        metricBoost: "Auditoría por usuario",
        logEntry: "Rol Operaciones · Aprobación registrada · 11:42",
      },
    ],
  },
  web: {
    tabLabel: "Plataforma Web",
    fileLabel: "arquitectura / plataforma-saas",
    headline: "Portal de clientes y flujo comercial",
    baseMetricLabel: "Tiempo de cotización",
    metricByCount: {
      1: "< 2 min",
      2: "< 1 min",
      3: "< 45 seg",
    },
    secondaryLabel: "Disponibilidad",
    secondaryValue: "Escritorio + móvil",
    modules: [
      {
        id: "catalogo",
        label: "Catálogo configurable",
        metricBoost: "Variantes y reglas en vivo",
        logEntry: "Catálogo · Variante personalizada validada al instante",
      },
      {
        id: "flujo",
        label: "Cotizador guiado",
        metricBoost: "Resumen listo para cierre",
        logEntry: "Solicitud #209 · Presupuesto generado automáticamente",
      },
      {
        id: "portal",
        label: "Portal multiusuario",
        metricBoost: "Estados y seguimiento real",
        logEntry: "Cliente · Estado actualizado a En producción",
      },
    ],
  },
};

export function InteractiveBlueprint() {
  const [mode, setMode] = useState<BlueprintMode>("erp");
  const [enabledModules, setEnabledModules] = useState<Record<string, boolean>>({
    stock: true,
    margen: true,
    roles: true,
    catalogo: true,
    flujo: true,
    portal: true,
  });
  const prefersReducedMotion = useReducedMotion();

  const current = BLUEPRINT_DATA[mode];
  const activeList = current.modules.filter((m) => enabledModules[m.id]);
  const liveMetric = current.metricByCount[activeList.length] ?? current.metricByCount[3];

  function toggleModule(id: string) {
    setEnabledModules((prev) => {
      const activeCount = current.modules.filter((m) => prev[m.id]).length;
      if (prev[id] && activeCount <= 1) return prev;
      return { ...prev, [id]: !prev[id] };
    });
  }

  return (
    <DoubleBezel className="w-full" innerClassName="p-5 sm:p-6">
      {/* Window header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#162B47]/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            {current.fileLabel}
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Tipo de arquitectura interactiva"
          className="inline-flex rounded-full bg-tray p-1 ring-1 ring-[#162B47]/[0.06]"
        >
          {(["erp", "web"] as const).map((tab) => {
            const isSelected = mode === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setMode(tab)}
                className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                  isSelected ? "text-white" : "text-ink-secondary hover:text-navy"
                }`}
              >
                {isSelected ? (
                  <motion.span
                    layoutId="blueprint-tab-pill"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.05 }
                        : { type: "spring", duration: 0.4, bounce: 0.14 }
                    }
                    className="absolute inset-0 rounded-full bg-navy"
                  />
                ) : null}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab === "erp" ? (
                    <Cube size={14} weight="light" />
                  ) : (
                    <GlobeHemisphereWest size={14} weight="light" />
                  )}
                  {BLUEPRINT_DATA[tab].tabLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="mt-5 space-y-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                Módulos a tu medida ({activeList.length}/{current.modules.length})
              </p>
              <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-navy sm:text-xl">
                {current.headline}
              </h2>
            </div>
            <SlidersHorizontal
              size={20}
              weight="light"
              className="mt-1 shrink-0 text-ink-muted"
              aria-hidden="true"
            />
          </div>

          {/* Interactive toggleable modules */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Activar módulos de ejemplo">
            {current.modules.map((mod) => {
              const active = Boolean(enabledModules[mod.id]);
              return (
                <button
                  key={mod.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleModule(mod.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-[transform,background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
                    active
                      ? "bg-accent-tint text-accent ring-1 ring-accent/30"
                      : "bg-tray/70 text-ink-muted ring-1 ring-[#162B47]/[0.08] hover:text-navy"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full ${
                      active
                        ? "bg-accent text-white"
                        : "bg-white text-transparent ring-1 ring-[#162B47]/15"
                    }`}
                  >
                    <Check size={10} weight="bold" />
                  </span>
                  {mod.label}
                </button>
              );
            })}
          </div>

          {/* Live metric cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-canvas p-3.5 ring-1 ring-[#162B47]/[0.07]">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                {current.baseMetricLabel}
              </p>
              <p className="mt-1.5 font-display text-2xl font-bold tracking-tight text-navy">
                {liveMetric}
              </p>
              <p className="mt-1 text-[11px] text-ink-secondary">
                {activeList[0]?.metricBoost}
              </p>
            </div>
            <div className="rounded-2xl bg-navy p-3.5 text-white">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/65">
                {current.secondaryLabel}
              </p>
              <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                {current.secondaryValue}
              </p>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-white/75">
                <ShieldCheck size={13} weight="light" className="text-accent" />
                {activeList.length} {activeList.length === 1 ? "módulo activo" : "módulos activos"}
              </p>
            </div>
          </div>

          {/* Live activity stream reflecting toggled modules */}
          <div className="rounded-2xl bg-canvas/85 p-3.5 ring-1 ring-[#162B47]/[0.07]">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
              Flujo en ejecución · prueba activar o quitar módulos
            </p>
            <ul className="mt-2.5 space-y-2">
              {activeList.map((mod) => (
                <li
                  key={mod.id}
                  className="flex items-start gap-2 rounded-xl bg-surface px-3 py-2 text-xs text-ink-secondary ring-1 ring-[#162B47]/[0.06]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="leading-relaxed">{mod.logEntry}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </DoubleBezel>
  );
}
