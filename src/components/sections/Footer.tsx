import { StacklineLogo } from "@/components/brand/StacklineLogo";
import { PROJECTS } from "@/data/projects";
import { SITE_CONFIG } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-[1380px] border-t border-white/12 px-4 py-12 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a href="#inicio" aria-label="Volver al inicio de Stackline">
              <StacklineLogo variant="dark" className="h-7 w-auto" />
            </a>
            <span className="hidden h-4 w-px bg-white/15 sm:inline-block" aria-hidden="true" />
            <p className="text-xs text-white/55">
              © {year} {SITE_CONFIG.legalName} · Software a la medida desde {SITE_CONFIG.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/65">
            {PROJECTS.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {project.name} ↗
              </a>
            ))}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="font-mono text-white/90 transition-colors hover:text-accent"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
