import { StacklineLogo } from "@/components/brand/StacklineLogo";
import { PROJECTS } from "@/data/projects";
import { SITE_CONFIG } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 bg-navy-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#inicio" aria-label="Volver al inicio de Stackline">
              <StacklineLogo variant="dark" className="h-8 w-auto" />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Empresa joven de desarrollo de software en {SITE_CONFIG.location}. Creamos sistemas
              empresariales internos y aplicaciones web a la medida para cada requerimiento.
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="mt-5 inline-block font-mono text-sm text-white/90 underline decoration-accent/70 underline-offset-4 transition-colors hover:text-accent"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
              Navegación
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contacto" className="transition-colors hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
              Proyectos en producción
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {PROJECTS.map((project) => (
                <li key={project.id}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <span>{project.name}</span>
                    <span className="font-mono text-[11px] text-white/45">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE_CONFIG.legalName}. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[11px]">Software empresarial y web a la medida</p>
        </div>
      </div>
    </footer>
  );
}
