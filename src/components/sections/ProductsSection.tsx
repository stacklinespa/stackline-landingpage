"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { PRODUCTS, type ProductItem } from "@/data/products";

function ProductCard({ product, order }: { product: ProductItem; order: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: order * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col overflow-hidden rounded-[2rem] bg-surface ring-1 ring-navy-deep/10 shadow-[0_30px_60px_-40px_rgba(14,28,47,0.35)]"
    >
      {/* Screenshot stage */}
      <div className="relative bg-tray px-5 pt-6 sm:px-8 sm:pt-8">
        <div className="overflow-hidden rounded-t-xl bg-white ring-1 ring-navy-deep/10">
          <div className="flex items-center gap-2 border-b border-navy-deep/8 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-navy-deep/15" aria-hidden="true" />
            <span className="h-2 w-2 rounded-full bg-navy-deep/15" aria-hidden="true" />
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
              {product.name} · demo
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover object-left-top"
            />
          </div>
        </div>

        {product.phoneImage ? (
          <div className="absolute bottom-4 right-4 w-[24%] max-w-[150px] overflow-hidden rounded-[1.1rem] border-[5px] border-navy-deep bg-navy-deep shadow-[0_24px_40px_-16px_rgba(14,28,47,0.6)] sm:right-6">
            <div className="relative aspect-[390/844] w-full">
              <Image
                src={product.phoneImage}
                alt={product.phoneImageAlt ?? ""}
                fill
                sizes="150px"
                className="object-cover object-top"
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-xs font-medium text-accent">{product.index}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            {product.category}
          </span>
        </div>
        <h3 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.035em] text-navy-deep sm:text-4xl">
          {product.name}
        </h3>
        <p className="mt-3 text-lg font-medium leading-snug text-navy-deep">{product.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
          {product.description}
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {product.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-deep"
            >
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 rounded-2xl bg-accent-tint px-5 py-4">
          <p className="font-display text-lg font-bold tracking-[-0.02em] text-navy-deep">
            {product.highlight.value}
          </p>
          <p className="text-xs text-ink-secondary">{product.highlight.label}</p>
        </div>

        <div className="mt-auto flex flex-col items-start gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-ink-secondary">
            <span className="font-semibold text-navy-deep">Ideal para:</span> {product.idealFor}
          </p>
          <PillButton href="#contacto" variant="navy" size="sm">
            Pedir una demo
          </PillButton>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductsSection() {
  return (
    <section id="productos" className="scroll-mt-24 bg-stone py-24 lg:py-32">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-end gap-6 border-b border-navy-deep/12 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Productos listos para tu rubro
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.035em] text-navy-deep sm:text-5xl lg:text-[3.4rem]">
              Parte con una base probada.
              <br />
              La adaptamos a tu negocio.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-secondary lg:col-span-5 lg:justify-self-end">
            Dos soluciones que puedes ver funcionando en una reunión de 20 minutos. Les ponemos tu
            marca, tus servicios y tu forma de trabajar, y quedan listas mucho antes que un desarrollo desde cero.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} order={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
