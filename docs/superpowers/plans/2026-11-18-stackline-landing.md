# Stackline Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, agency-grade Next.js landing page for **Stackline SpA** showcasing custom enterprise & web software services, three real live products (`Kurova`, `Kalibre 3D`, `Surko`), an interactive custom-architecture preview, and a resilient contact flow directed to `stacklinespa@gmail.com`.

**Architecture:** Isolated Next.js (App Router) + TypeScript + Tailwind CSS v4 project inside `landing/` (leaving administrative PDFs in the parent workspace untouched). Content is decoupled into typed `src/data/*` modules, visual craft is standardized through reusable `DoubleBezel`, `PillButton`, and `StacklineLogo` primitives, and form submissions share pure validation logic between client and `POST /api/contact` with Resend delivery plus a guaranteed zero-config `mailto:` + copy fallback.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, `@phosphor-icons/react`, Vitest.

## Global Constraints

- Workspace isolation: All project files live under `c:\Users\healt\Downloads\Stackline\landing\`; NEVER modify, move, or stage files in the parent folder `c:\Users\healt\Downloads\Stackline\`.
- Language: 100% natural, professional Spanish (`lang="es"`), tailored to Stackline SpA (Chile).
- Contact channel: Only `stacklinespa@gmail.com` — NEVER invent phone numbers, WhatsApp links, physical addresses, social handles, or fake testimonials.
- Real projects only: `Kurova` (`https://kurova.vercel.app/`), `Kalibre 3D` (`https://kalibre3d.vercel.app/`), `Surko` (`https://surko.vercel.app/`).
- Palette tokens (verbatim from spec): Canvas `#F8F9FB`, Surface `#FFFFFF`, Tray `#EEF1F6`, Navy primary `#162B47`, Navy deep `#0D1B2E`, Secondary ink `#4A5D75`, Muted ink `#6E7F96`, Accent `#D45F32`, Accent hover `#BE4F24`, Accent tint `#FDF0EA`, Hairline `rgba(22, 43, 71, 0.08)`.
- Typography: `Bricolage Grotesque` (display), `Plus Jakarta Sans` (body), `JetBrains Mono` (technical metadata) via `next/font/google`. Banned fonts (`Inter`, `Roboto`, `Arial`, `Open Sans`, `Helvetica`) MUST NOT appear anywhere.
- Visual craft & motion rules: Double-Bezel nested containers on major cards, Button-in-Button trailing circular icon on primary CTAs, `@phosphor-icons/react` (`weight="light"` / `"regular"`), custom cubic-bezier curves (`cubic-bezier(0.32, 0.72, 0, 1)` / `cubic-bezier(0.23, 1, 0.32, 1)`), animate only `transform` and `opacity`, never animate from `scale(0)`, `backdrop-blur` strictly on fixed/sticky chrome (`Navbar` and mobile overlay), `min-h-[100dvh]` instead of `h-screen`, responsive collapse to single-column below `768px`, full `prefers-reduced-motion` support.

---

### Task 1: Project Scaffolding, Design Tokens, Typography & SEO Files

**Files:**
- Create: `landing/package.json`
- Create: `landing/tsconfig.json`
- Create: `landing/next.config.ts`
- Create: `landing/postcss.config.mjs`
- Create: `landing/eslint.config.mjs`
- Create: `landing/vitest.config.ts`
- Create: `landing/.gitignore`
- Create: `landing/.env.example`
- Create: `landing/src/app/globals.css`
- Create: `landing/src/app/layout.tsx`
- Create: `landing/src/app/icon.svg`
- Create: `landing/src/app/robots.ts`
- Create: `landing/src/app/sitemap.ts`
- Create: `landing/src/app/page.tsx` (minimal boot placeholder replaced in Task 6)

**Interfaces:**
- Produces: Next.js build pipeline, Tailwind v4 `@theme inline` tokens (`font-display`, `font-sans`, `font-mono`, semantic color utilities), `npm run test` (Vitest), `npm run lint`, `npm run build`, and `src/app/layout.tsx` root shell.

- [ ] **Step 1: Create project config files (`package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `.gitignore`, `.env.example`)**

Create `landing/package.json`:
```json
{
  "name": "stackline-landing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@phosphor-icons/react": "^2.1.10",
    "framer-motion": "^12.23.24",
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.0.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0",
    "vitest": "^3.2.0"
  }
}
```

Create `landing/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `landing/next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
```

Create `landing/postcss.config.mjs`:
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

Create `landing/eslint.config.mjs`:
```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

Create `landing/vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Create `landing/.gitignore`:
```gitignore
node_modules/
.next/
out/
.env*.local
*.tsbuildinfo
next-env.d.ts
coverage/
```

Create `landing/.env.example`:
```env
# Opcional: configura Resend para enviar los correos del formulario directo a stacklinespa@gmail.com
# Crea una API key gratuita en https://resend.com y agregala en .env.local o en Vercel
RESEND_API_KEY=

# Remitente verificado en Resend (por defecto usa onboarding@resend.dev en pruebas)
CONTACT_FROM_EMAIL="Stackline Web <onboarding@resend.dev>"

# URL publica del sitio para canonical, OpenGraph y sitemap (ej: https://stackline.cl)
NEXT_PUBLIC_SITE_URL=https://stackline.vercel.app
```

- [ ] **Step 2: Install dependencies**

Run in `landing/`:
```powershell
npm install
```
Expected: Clean install, `node_modules/` and `package-lock.json` created without peer dependency errors.

- [ ] **Step 3: Create `src/app/globals.css`, `src/app/layout.tsx`, `src/app/icon.svg`, `src/app/robots.ts`, `src/app/sitemap.ts`, and temporary `src/app/page.tsx`**

Create `landing/src/app/globals.css`:
```css
@import "tailwindcss";

:root {
  --bg-canvas: #f8f9fb;
  --bg-surface: #ffffff;
  --bg-tray: #eef1f6;
  --ink-primary: #162b47;
  --ink-deep: #0d1b2e;
  --ink-secondary: #4a5d75;
  --ink-muted: #6e7f96;
  --accent-primary: #d45f32;
  --accent-hover: #be4f24;
  --accent-tint: #fdf0ea;
  --border-hairline: rgba(22, 43, 71, 0.08);
  --border-strong: rgba(22, 43, 71, 0.16);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}

@theme inline {
  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-jakarta), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, SFMono-Regular, monospace;

  --color-canvas: var(--bg-canvas);
  --color-surface: var(--bg-surface);
  --color-tray: var(--bg-tray);
  --color-navy: var(--ink-primary);
  --color-navy-deep: var(--ink-deep);
  --color-ink-secondary: var(--ink-secondary);
  --color-ink-muted: var(--ink-muted);
  --color-accent: var(--accent-primary);
  --color-accent-hover: var(--accent-hover);
  --color-accent-tint: var(--accent-tint);
}

html {
  scroll-behavior: smooth;
  background-color: var(--bg-canvas);
  color: var(--ink-primary);
}

body {
  background-color: var(--bg-canvas);
  color: var(--ink-primary);
  font-family: var(--font-sans);
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.architectural-grid {
  background-image:
    linear-gradient(to right, rgba(22, 43, 71, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(22, 43, 71, 0.045) 1px, transparent 1px);
  background-size: 48px 48px;
}

::selection {
  background-color: rgba(212, 95, 50, 0.18);
  color: var(--ink-deep);
}

:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Create `landing/src/app/layout.tsx`:
```tsx
import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stackline.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Stackline — Software empresarial y aplicaciones web a la medida",
    template: "%s | Stackline",
  },
  description:
    "Somos una empresa joven de ingeniería en Chile dedicada a crear sistemas empresariales internos y aplicaciones web personalizadas para cada requerimiento.",
  keywords: [
    "software a medida",
    "desarrollo de software Chile",
    "sistemas empresariales a medida",
    "ERP a medida",
    "aplicaciones web personalizadas",
    "plataformas SaaS",
    "Stackline",
  ],
  authors: [{ name: "Stackline SpA" }],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteUrl,
    siteName: "Stackline",
    title: "Stackline — Software que calza con tu operación, no al revés",
    description:
      "Empresa joven de desarrollo de software a medida: sistemas empresariales internos, plataformas web y SaaS construidos para cada requerimiento.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stackline — Software empresarial y web a la medida",
    description:
      "Sistemas internos y aplicaciones web personalizadas diseñadas para tu operación real.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F9FB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-[100dvh] bg-canvas font-sans text-navy antialiased">
        {children}
      </body>
    </html>
  );
}
```

Create `landing/src/app/icon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="16" fill="#162B47"/>
  <path d="M21 44.5C21 41.2 23.4 39.2 27.6 38.4L34.2 37.1C37.1 36.5 38.4 35.4 38.4 33.4C38.4 31.1 36.2 29.7 32.5 29.7C28.9 29.7 26.6 31.1 25.9 33.4H19.4C20.3 27.6 25.2 24.2 32.7 24.2C39.8 24.2 44.8 27.5 44.8 33.1C44.8 38.3 41.2 40.9 35.4 42L29.5 43.1C27.4 43.5 26.8 44.2 26.8 45.4C26.8 47.4 29 48.6 32.5 48.6C36.3 48.6 38.7 47.2 39.4 44.8H45.8C44.9 50.6 39.8 54 32.3 54C24.9 54 21 50.4 21 44.5Z" fill="#FFFFFF"/>
  <path d="M35.5 14.5L51.5 9.5L47.5 25.5L42.8 20.5L35.5 14.5Z" fill="#D45F32"/>
</svg>
```

Create `landing/src/app/robots.ts`:
```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stackline.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

Create `landing/src/app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stackline.vercel.app";
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

Create temporary `landing/src/app/page.tsx`:
```tsx
export default function HomePage() {
  return <main className="min-h-[100dvh] p-8 font-display text-navy">Stackline</main>;
}
```

- [ ] **Step 4: Verify TypeScript, lint, and build**

Run in `landing/`:
```powershell
npm run typecheck; npm run lint; npm run build
```
Expected: All three succeed with exit code 0.

- [ ] **Step 5: Commit scaffolding**

Run in `landing/`:
```powershell
git add .
git commit -m "chore: scaffold Next.js app with Stackline design tokens, typography, and SEO config"
```

---

### Task 2: Typed Content Layer, Contact Validation & Contact API Route (TDD)

**Files:**
- Create: `landing/src/data/site.ts`
- Create: `landing/src/data/solutions.ts`
- Create: `landing/src/data/projects.ts`
- Create: `landing/src/data/process.ts`
- Create: `landing/src/lib/contact-validation.ts`
- Test: `landing/src/lib/contact-validation.test.ts`
- Create: `landing/src/app/api/contact/route.ts`
- Test: `landing/src/app/api/contact/route.test.ts`

**Interfaces:**
- Produces:
  - `SITE_CONFIG` (`brandName`, `legalName`, `email`, `location`, `navItems`)
  - `SOLUTIONS` (`SolutionItem[]`), `PROJECTS` (`ProjectItem[]`), `YOUNG_PILLARS` (`PillarItem[]`), `PROCESS_STEPS` (`ProcessStep[]`)
  - `ContactPayload`, `ProjectTypeId`, `PROJECT_TYPE_OPTIONS`, `ContactValidationResult`, `validateContactPayload(raw: unknown)`, `buildContactSummary(data: ContactPayload)`, `buildMailtoUrl(data: ContactPayload, recipient?: string)`
  - `POST /api/contact` returning `{ status: "sent" } | { status: "fallback", mailtoUrl: string, summary: string } | { status: "error", message: string, fieldErrors?: Record<string, string>, mailtoUrl?: string, summary?: string }`

- [ ] **Step 1: Write failing unit tests for contact validation (`src/lib/contact-validation.test.ts`)**

Create `landing/src/lib/contact-validation.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import {
  buildContactSummary,
  buildMailtoUrl,
  validateContactPayload,
} from "./contact-validation";

describe("validateContactPayload", () => {
  it("accepts a complete valid payload and normalizes whitespace", () => {
    const result = validateContactPayload({
      name: "  Camila Rojas  ",
      company: "  Clínica Norte  ",
      email: "  CAMILA@clinicanorte.cl ",
      projectType: "sistema-interno",
      message: "Necesitamos un sistema de inventario y agenda para 3 sucursales.",
      website: "",
    });

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.isSpam).toBe(false);
      expect(result.data).toEqual({
        name: "Camila Rojas",
        company: "Clínica Norte",
        email: "camila@clinicanorte.cl",
        projectType: "sistema-interno",
        message: "Necesitamos un sistema de inventario y agenda para 3 sucursales.",
      });
    }
  });

  it("returns field errors for missing name, invalid email, and short message", () => {
    const result = validateContactPayload({
      name: "A",
      email: "correo-invalido",
      projectType: "plataforma-web",
      message: "Hola",
    });

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.fieldErrors.name).toBeTruthy();
      expect(result.fieldErrors.email).toBeTruthy();
      expect(result.fieldErrors.message).toBeTruthy();
    }
  });

  it("flags filled honeypot field as spam without failing validation", () => {
    const result = validateContactPayload({
      name: "Bot",
      email: "bot@example.com",
      projectType: "otro",
      message: "Mensaje suficientemente largo para pasar validacion",
      website: "https://spam.example",
    });

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.isSpam).toBe(true);
    }
  });

  it("defaults unknown projectType to 'otro'", () => {
    const result = validateContactPayload({
      name: "Diego Soto",
      email: "diego@empresa.cl",
      projectType: "valor-raro",
      message: "Queremos cotizar una plataforma a medida para clientes.",
    });

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.data.projectType).toBe("otro");
    }
  });
});

describe("buildContactSummary & buildMailtoUrl", () => {
  it("builds a readable Spanish summary and properly encoded mailto URL", () => {
    const payload = {
      name: "Camila Rojas",
      company: "Clínica Norte",
      email: "camila@clinicanorte.cl",
      projectType: "sistema-interno" as const,
      message: "Necesitamos controlar stock e ingresos diarios.",
    };

    const summary = buildContactSummary(payload);
    expect(summary).toContain("Camila Rojas");
    expect(summary).toContain("Clínica Norte");
    expect(summary).toContain("Sistema empresarial interno");

    const url = buildMailtoUrl(payload, "stacklinespa@gmail.com");
    expect(url.startsWith("mailto:stacklinespa@gmail.com?subject=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Camila Rojas");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run in `landing/`:
```powershell
npm run test
```
Expected: FAIL — `Cannot find module './contact-validation'`.

- [ ] **Step 3: Implement `src/data/*` and `src/lib/contact-validation.ts`**

Create `landing/src/data/site.ts`:
```ts
export const SITE_CONFIG = {
  brandName: "Stackline",
  legalName: "Stackline SpA",
  email: "stacklinespa@gmail.com",
  location: "Chile",
  responseSla: "Menos de 24 horas hábiles",
  navItems: [
    { label: "Soluciones", href: "#soluciones" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Proceso", href: "#proceso" },
    { label: "Nosotros", href: "#nosotros" },
  ],
} as const;
```

Create `landing/src/data/solutions.ts`:
```ts
export type SolutionIconName = "buildings" | "globe" | "sliders" | "code";

export interface SolutionItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  colSpanClass: string;
  featured: boolean;
  icon: SolutionIconName;
}

export const SOLUTIONS: SolutionItem[] = [
  {
    id: "sistemas-empresariales",
    eyebrow: "Operación Interna",
    title: "Sistemas empresariales internos a medida",
    description:
      "Reemplaza planillas dispersas y procesos manuales por software diseñado alrededor de tu operación real: ERP ligeros, CRM, control de inventario, costeo y paneles gerenciales con roles claros.",
    highlights: [
      "Control de inventario, compras y costos reales",
      "Permisos por rol e historial de cada acción",
      "Dashboards operativos y reportes al instante",
      "Reglas exactas de tu rubro, sin módulos de relleno",
    ],
    colSpanClass: "lg:col-span-7",
    featured: true,
    icon: "buildings",
  },
  {
    id: "aplicaciones-web-saas",
    eyebrow: "Productos Digitales",
    title: "Aplicaciones web y plataformas SaaS",
    description:
      "Diseñamos y construimos plataformas rápidas, claras y listas para crecer con tus clientes: portales multiusuario, reservas, catálogos configurables y flujos de cotización o pago.",
    highlights: [
      "Experiencia rápida en escritorio y móvil",
      "Portales de clientes y flujos de autogestión",
      "Arquitectura preparada para escalar usuarios",
    ],
    colSpanClass: "lg:col-span-5",
    featured: true,
    icon: "globe",
  },
  {
    id: "reglas-de-negocio",
    eyebrow: "Precisión Operativa",
    title: "Lógica de negocio real, no aproximaciones",
    description:
      "Modelamos los cálculos que sostienen tu rentabilidad —márgenes netos, comisiones de canales, consumos por insumo o estados de pedido— para que decidas con datos confiables.",
    highlights: [
      "Trazabilidad de punta a punta",
      "Cálculos auditables y consistentes",
    ],
    colSpanClass: "lg:col-span-5",
    featured: false,
    icon: "sliders",
  },
  {
    id: "codigo-propio",
    eyebrow: "Independencia Tecnológica",
    title: "100% código a tu medida, sin licencias infladas",
    description:
      "Evita pagar mensualidades eternas por herramientas rígidas que obligan a cambiar cómo trabajas. Entregamos software moderno, mantenible y preparado para evolucionar junto a tu empresa.",
    highlights: [
      "Stack moderno y documentado",
      "Evolución continua por etapas según tus prioridades",
      "Sin plantillas genéricas ni amarras cerradas",
    ],
    colSpanClass: "lg:col-span-7",
    featured: false,
    icon: "code",
  },
];
```

Create `landing/src/data/projects.ts`:
```ts
export type ProjectPreviewKey = "kurova" | "kalibre3d" | "surko";

export interface ProjectItem {
  id: ProjectPreviewKey;
  name: string;
  url: string;
  category: string;
  tagline: string;
  description: string;
  capabilities: string[];
  metricLabel: string;
  metricValue: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "kurova",
    name: "Kurova",
    url: "https://kurova.vercel.app/",
    category: "SaaS Empresarial · Centros de estética",
    tagline: "Gestión operativa, inventario al costo real y utilidad por atención.",
    description:
      "Plataforma SaaS multiusuario que conecta agenda por profesional, historial de clientas, consumo de insumos por envase con costo promedio ponderado, utilidad congelada por servicio y programa Club con sellos.",
    capabilities: [
      "Agenda por profesional",
      "Costo promedio ponderado",
      "Utilidad congelada",
      "Roles y Club de clientas",
    ],
    metricLabel: "Trazabilidad",
    metricValue: "Historial inmutable por atención",
  },
  {
    id: "kalibre3d",
    name: "Kalibre 3D",
    url: "https://kalibre3d.vercel.app/",
    category: "Sistema Operativo · Talleres de impresión 3D",
    tagline: "Pedidos multicanal, cotizador multicolor y margen real al gramo.",
    description:
      "Sistema operativo diseñado para talleres que venden por WhatsApp, Instagram y Mercado Libre. Integra cotizador con purga multicolor, control de bobinas con alertas de stock y cálculo automático de comisiones y ganancia neta.",
    capabilities: [
      "Cotizador con purga multicolor",
      "Cálculo neto Mercado Libre",
      "Control de bobinas al gramo",
      "Gestión de pedidos multicanal",
    ],
    metricLabel: "Velocidad operativa",
    metricValue: "< 30 s para registrar una venta",
  },
  {
    id: "surko",
    name: "Surko",
    url: "https://surko.vercel.app/",
    category: "Aplicación Web · Impresión 3D personalizada",
    tagline: "Experiencia comercial de marca y catálogos personalizables.",
    description:
      "Plataforma web a medida para diseño e impresión 3D personalizada con envíos a todo Chile. Organiza líneas de producto, selección de colores y un flujo directo de cotización orientado a conversión desde móvil.",
    capabilities: [
      "Catálogos segmentados",
      "Personalización por color",
      "Flujo directo de cotización",
      "Diseño web orientado a conversión",
    ],
    metricLabel: "Cobertura",
    metricValue: "Pedidos y envíos a todo Chile",
  },
];
```

Create `landing/src/data/process.ts`:
```ts
export interface PillarItem {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export const YOUNG_PILLARS: PillarItem[] = [
  {
    id: "trato-directo",
    badge: "Sin intermediarios",
    title: "Hablas directo con quienes programan tu sistema",
    description:
      "Nada de teléfonos rotos entre vendedores y técnicos. Desde la primera reunión conversas con el equipo de ingeniería que diseña y construye tu solución.",
  },
  {
    id: "ritmo-real",
    badge: "Agilidad real",
    title: "Entregas visibles cada semana, no promesas a seis meses",
    description:
      "Al ser una empresa joven y enfocada, avanzamos sin burocracia. Ves pantallas reales funcionando temprano para ajustar detalles antes de lanzar.",
  },
  {
    id: "stack-moderno",
    badge: "Calidad técnica",
    title: "Tecnología moderna, rápida y fácil de mantener",
    description:
      "Construimos sobre arquitectura web actual, segura y responsiva, pensada para responder bien desde el primer usuario hasta cuando tu operación escale.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Levantamiento del requerimiento",
    description:
      "Escuchamos cómo opera tu negocio hoy, identificamos cuellos de botella y definimos con claridad qué problema debe resolver el software.",
    deliverable: "Alcance y prioridades claras",
  },
  {
    number: "02",
    title: "Arquitectura y prototipo",
    description:
      "Diseñamos el flujo de pantallas, la estructura de datos y las reglas de cálculo clave para que valides la solución antes de programar a fondo.",
    deliverable: "Mapa funcional + propuesta cerrada",
  },
  {
    number: "03",
    title: "Desarrollo iterativo con demos",
    description:
      "Construimos en ciclos cortos con avances navegables en entorno real, afinando cada detalle con retroalimentación directa de tu equipo.",
    deliverable: "Demos semanales en vivo",
  },
  {
    number: "04",
    title: "Despliegue y acompañamiento",
    description:
      "Publicamos en producción, verificamos rendimiento en escritorio y móvil, capacitamos a tus usuarios y acompañamos la evolución del sistema.",
    deliverable: "Sistema en producción + soporte",
  },
];
```

Create `landing/src/lib/contact-validation.ts`:
```ts
import { SITE_CONFIG } from "@/data/site";

export type ProjectTypeId = "sistema-interno" | "plataforma-web" | "otro";

export const PROJECT_TYPE_OPTIONS: {
  id: ProjectTypeId;
  label: string;
  shortLabel: string;
}[] = [
  {
    id: "sistema-interno",
    label: "Sistema empresarial interno (ERP, CRM, gestión)",
    shortLabel: "Sistema interno",
  },
  {
    id: "plataforma-web",
    label: "Aplicación web o plataforma SaaS",
    shortLabel: "Web / SaaS",
  },
  {
    id: "otro",
    label: "Otro requerimiento a medida",
    shortLabel: "Otro a medida",
  },
];

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  projectType: ProjectTypeId;
  message: string;
}

export type ContactFieldErrors = Partial<
  Record<"name" | "company" | "email" | "message", string>
>;

export type ContactValidationResult =
  | { valid: true; data: ContactPayload; isSpam: boolean }
  | { valid: false; fieldErrors: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VALID_PROJECT_TYPES = new Set<ProjectTypeId>([
  "sistema-interno",
  "plataforma-web",
  "otro",
]);

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactPayload(raw: unknown): ContactValidationResult {
  if (!raw || typeof raw !== "object") {
    return {
      valid: false,
      fieldErrors: {
        name: "Ingresa tu nombre para poder responderte.",
        email: "Ingresa un correo electrónico válido.",
        message: "Cuéntanos brevemente qué necesitas construir.",
      },
    };
  }

  const record = raw as Record<string, unknown>;
  const name = asTrimmedString(record.name);
  const company = asTrimmedString(record.company);
  const email = asTrimmedString(record.email).toLowerCase();
  const rawType = asTrimmedString(record.projectType) as ProjectTypeId;
  const projectType: ProjectTypeId = VALID_PROJECT_TYPES.has(rawType)
    ? rawType
    : "otro";
  const message = asTrimmedString(record.message);
  const honeypot = asTrimmedString(record.website);

  if (honeypot.length > 0) {
    return {
      valid: true,
      isSpam: true,
      data: { name, company, email, projectType, message },
    };
  }

  const fieldErrors: ContactFieldErrors = {};

  if (name.length < 2) {
    fieldErrors.name = "Ingresa tu nombre (al menos 2 caracteres).";
  } else if (name.length > 120) {
    fieldErrors.name = "El nombre es demasiado largo (máximo 120 caracteres).";
  }

  if (company.length > 140) {
    fieldErrors.company =
      "El nombre de la empresa no puede superar 140 caracteres.";
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 180) {
    fieldErrors.email = "Ingresa un correo electrónico válido (ej. nombre@empresa.cl).";
  }

  if (message.length < 15) {
    fieldErrors.message =
      "Cuéntanos un poco más sobre tu requerimiento (mínimo 15 caracteres).";
  } else if (message.length > 3000) {
    fieldErrors.message =
      "El mensaje supera el límite de 3.000 caracteres.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { valid: false, fieldErrors };
  }

  return {
    valid: true,
    isSpam: false,
    data: { name, company, email, projectType, message },
  };
}

export function getProjectTypeLabel(type: ProjectTypeId): string {
  return (
    PROJECT_TYPE_OPTIONS.find((item) => item.id === type)?.label ??
    "Requerimiento a medida"
  );
}

export function buildContactSummary(data: ContactPayload): string {
  const lines = [
    `Nombre: ${data.name}`,
    data.company ? `Empresa: ${data.company}` : null,
    `Correo: ${data.email}`,
    `Tipo de proyecto: ${getProjectTypeLabel(data.projectType)}`,
    "",
    "Requerimiento:",
    data.message,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export function buildMailtoUrl(
  data: ContactPayload,
  recipient: string = SITE_CONFIG.email,
): string {
  const subject = `Nuevo proyecto a medida — ${data.company || data.name}`;
  const body = buildContactSummary(data);
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

- [ ] **Step 4: Run validation tests and confirm they pass**

Run in `landing/`:
```powershell
npm run test
```
Expected: PASS — all `contact-validation.test.ts` cases green.

- [ ] **Step 5: Write failing tests for `POST /api/contact` (`src/app/api/contact/route.test.ts`)**

Create `landing/src/app/api/contact/route.test.ts`:
```ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const validBody = {
  name: "Sebastián Pérez",
  company: "Logística Maule",
  email: "sebastian@logisticamaule.cl",
  projectType: "sistema-interno",
  message: "Necesitamos un sistema web para gestionar despachos y bodegas.",
  website: "",
};

function makeRequest(body: unknown) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  const originalKey = process.env.RESEND_API_KEY;

  beforeEach(() => {
    delete process.env.RESEND_API_KEY;
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (originalKey === undefined) {
      delete process.env.RESEND_API_KEY;
    } else {
      process.env.RESEND_API_KEY = originalKey;
    }
  });

  it("returns 400 on malformed JSON", async () => {
    const res = await POST(makeRequest("{invalid"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.status).toBe("error");
  });

  it("returns 400 with fieldErrors on invalid fields", async () => {
    const res = await POST(makeRequest({ name: "", email: "bad", message: "hi" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.status).toBe("error");
    expect(json.fieldErrors.name).toBeTruthy();
    expect(json.fieldErrors.email).toBeTruthy();
    expect(json.fieldErrors.message).toBeTruthy();
  });

  it("silently returns sent when honeypot is filled", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const res = await POST(makeRequest({ ...validBody, website: "http://spam.tld" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("sent");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns explicit fallback payload when RESEND_API_KEY is not configured", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("fallback");
    expect(json.mailtoUrl).toContain("mailto:stacklinespa@gmail.com");
    expect(json.summary).toContain("Sebastián Pérez");
  });

  it("sends email via Resend API when RESEND_API_KEY is configured", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ id: "email_123" }), { status: 200 }));

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("sent");
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("returns 502 with mailtoUrl recovery when Resend fails", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 }),
    );

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.status).toBe("error");
    expect(json.mailtoUrl).toContain("mailto:stacklinespa@gmail.com");
  });
});
```

- [ ] **Step 6: Run test to verify it fails, then implement `src/app/api/contact/route.ts`**

Run `npm run test` → Expected: FAIL (`Cannot find module './route'`).

Create `landing/src/app/api/contact/route.ts`:
```ts
import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/data/site";
import {
  buildContactSummary,
  buildMailtoUrl,
  getProjectTypeLabel,
  validateContactPayload,
} from "@/lib/contact-validation";

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "No pudimos leer los datos enviados. Intenta nuevamente.",
      },
      { status: 400 },
    );
  }

  const validation = validateContactPayload(rawBody);
  if (!validation.valid) {
    return NextResponse.json(
      {
        status: "error",
        message: "Revisa los campos marcados antes de enviar.",
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  if (validation.isSpam) {
    return NextResponse.json({ status: "sent" }, { status: 200 });
  }

  const { data } = validation;
  const summary = buildContactSummary(data);
  const mailtoUrl = buildMailtoUrl(data, SITE_CONFIG.email);
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      {
        status: "fallback",
        mailtoUrl,
        summary,
      },
      { status: 200 },
    );
  }

  const fromAddress =
    process.env.CONTACT_FROM_EMAIL?.trim() || "Stackline Web <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [SITE_CONFIG.email],
        reply_to: data.email,
        subject: `[Stackline Web] ${getProjectTypeLabel(data.projectType)} — ${data.company || data.name}`,
        text: summary,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "El envío automático no respondió en este momento. Puedes enviarnos el resumen en 1 clic por correo.",
          mailtoUrl,
          summary,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ status: "sent" }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message:
          "Hubo un problema de conexión al enviar. Usa el botón directo para enviar tu requerimiento por correo.",
        mailtoUrl,
        summary,
      },
      { status: 502 },
    );
  }
}
```

- [ ] **Step 7: Run all tests and typecheck**

Run in `landing/`:
```powershell
npm run test; npm run typecheck
```
Expected: All unit tests PASS and zero TypeScript errors.

- [ ] **Step 8: Commit data layer, validation, and contact API route**

Run in `landing/`:
```powershell
git add src/data src/lib src/app/api
git commit -m "feat: add typed content layer, contact validation, and resilient contact API route"
```

---

### Task 3: Stackline Vector Logo & Tactile UI Primitives

**Files:**
- Create: `landing/src/components/brand/StacklineLogo.tsx`
- Create: `landing/src/components/ui/DoubleBezel.tsx`
- Create: `landing/src/components/ui/PillButton.tsx`
- Create: `landing/src/components/ui/SectionEyebrow.tsx`
- Create: `landing/src/components/ui/MotionReveal.tsx`

**Interfaces:**
- Produces:
  - `StacklineLogo({ variant?: "light" | "dark", className?: string })`
  - `DoubleBezel({ children, className?: string, innerClassName?: string, tone?: "light" | "dark" })`
  - `PillButton({ children, href?: string, external?: boolean, variant?: "accent" | "navy" | "ghost", size?: "sm" | "md", onClick?: () => void, type?: "button" | "submit", disabled?: boolean, className?: string })`
  - `SectionEyebrow({ children, tone?: "light" | "dark", className?: string })`
  - `MotionReveal({ children, delay?: number, className?: string })`

- [ ] **Step 1: Create `src/components/brand/StacklineLogo.tsx`**

Faithful vector SVG recreation of the uploaded Stackline logo (bold geometric `Stackline` wordmark in `#162B47` or `#FFFFFF`, with the burnt-orange `#D45F32` upward-right folded arrow/paper-plane chevron above the dotless `i`).

Create `landing/src/components/brand/StacklineLogo.tsx`:
```tsx
interface StacklineLogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function StacklineLogo({
  variant = "light",
  className = "h-8 w-auto",
}: StacklineLogoProps) {
  const wordmarkFill = variant === "dark" ? "#FFFFFF" : "#162B47";

  return (
    <svg
      viewBox="0 0 248 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Stackline"
    >
      {/* Folded burnt-orange upward arrow above the 'i' */}
      <path
        d="M150.5 14.5L177.5 3.5L172.2 29.8L164.2 21.8L155.8 27.6L158.6 18.6L150.5 14.5Z"
        fill="#D45F32"
      />
      {/* Wordmark: Stackl + dotless i + ne rendered cleanly with exact optical alignment */}
      <text
        x="4"
        y="50"
        fill={wordmarkFill}
        fontFamily="var(--font-bricolage), var(--font-jakarta), sans-serif"
        fontSize="45"
        fontWeight="800"
        letterSpacing="-1.4"
      >
        Stackl&#x0131;ne
      </text>
    </svg>
  );
}
```
*(Note: Using Unicode dotless i `&#x0131;` guarantees zero duplicate dot beneath the folded burnt-orange arrow, matching the exact visual geometry of the uploaded logo! During visual inspection in Task 7 we will verify arrow alignment over the stem of `ı` pixel-by-pixel and fine-tune coordinates if needed.)*

- [ ] **Step 2: Create `DoubleBezel.tsx`, `PillButton.tsx`, `SectionEyebrow.tsx`, and `MotionReveal.tsx`**

Create `landing/src/components/ui/DoubleBezel.tsx`:
```tsx
import type { ReactNode } from "react";

interface DoubleBezelProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: "light" | "dark";
}

export function DoubleBezel({
  children,
  className = "",
  innerClassName = "",
  tone = "light",
}: DoubleBezelProps) {
  const outerTone =
    tone === "dark"
      ? "bg-white/[0.06] ring-1 ring-white/[0.12]"
      : "bg-tray/85 ring-1 ring-[#162B47]/[0.08]";

  const innerTone =
    tone === "dark"
      ? "bg-navy-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      : "bg-surface shadow-[0_1px_2px_rgba(22,43,71,0.04),0_12px_32px_-18px_rgba(22,43,71,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]";

  return (
    <div className={`rounded-[1.75rem] p-1.5 sm:rounded-[2rem] sm:p-2 ${outerTone} ${className}`}>
      <div
        className={`h-full rounded-[calc(1.75rem-0.375rem)] sm:rounded-[calc(2rem-0.5rem)] ${innerTone} ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
```

Create `landing/src/components/ui/PillButton.tsx`:
```tsx
"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

interface PillButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: "accent" | "navy" | "ghost";
  size?: "sm" | "md";
  showArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export function PillButton({
  children,
  href,
  external = false,
  variant = "accent",
  size = "md",
  showArrow = true,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: PillButtonProps) {
  const variantStyles = {
    accent:
      "bg-accent text-white hover:bg-accent-hover shadow-[0_8px_24px_-10px_rgba(212,95,50,0.65)]",
    navy: "bg-navy text-white hover:bg-navy-deep shadow-[0_8px_24px_-12px_rgba(22,43,71,0.45)]",
    ghost:
      "bg-surface text-navy ring-1 ring-[#162B47]/[0.12] hover:ring-[#162B47]/[0.24] hover:bg-tray/50",
  }[variant];

  const iconWrapStyles = {
    accent: "bg-white/18 text-white",
    navy: "bg-white/14 text-white",
    ghost: "bg-navy/[0.06] text-navy",
  }[variant];

  const sizeStyles =
    size === "sm"
      ? showArrow
        ? "py-1.5 pl-4 pr-1.5 text-sm gap-2.5"
        : "px-4 py-2 text-sm gap-2"
      : showArrow
        ? "py-2 pl-5 pr-2 text-sm sm:text-[15px] gap-3"
        : "px-6 py-3 text-sm sm:text-[15px] gap-2";

  const iconSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";

  const sharedClasses = `group inline-flex items-center justify-center rounded-full font-medium tracking-[-0.01em] transition-[transform,background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 ${variantStyles} ${sizeStyles} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 ${iconWrapStyles} ${iconSize}`}
        >
          <ArrowUpRight size={15} weight="regular" />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={sharedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={sharedClasses}>
      {content}
    </button>
  );
}
```

Create `landing/src/components/ui/SectionEyebrow.tsx`:
```tsx
import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionEyebrow({
  children,
  tone = "light",
  className = "",
}: SectionEyebrowProps) {
  const toneClasses =
    tone === "dark"
      ? "bg-white/10 text-white/85 ring-white/15"
      : "bg-accent-tint text-accent ring-accent/20";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] ring-1 ${toneClasses} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${tone === "dark" ? "bg-accent" : "bg-accent"}`}
      />
      {children}
    </span>
  );
}
```

Create `landing/src/components/ui/MotionReveal.tsx`:
```tsx
"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MotionReveal({
  children,
  delay = 0,
  className = "",
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.65,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

Run in `landing/`:
```powershell
npm run typecheck
```
Expected: Exit code 0.

- [ ] **Step 4: Commit brand logo & UI primitives**

Run in `landing/`:
```powershell
git add src/components/brand src/components/ui
git commit -m "feat: add Stackline vector logo and DoubleBezel/PillButton/MotionReveal UI primitives"
```

---

### Task 4: Fluid Island Navbar, Interactive Blueprint Signature & Editorial Hero

**Files:**
- Create: `landing/src/components/sections/Navbar.tsx`
- Create: `landing/src/components/sections/InteractiveBlueprint.tsx`
- Create: `landing/src/components/sections/HeroSection.tsx`

**Interfaces:**
- Consumes: `SITE_CONFIG`, `StacklineLogo`, `DoubleBezel`, `PillButton`, `SectionEyebrow`
- Produces: `Navbar`, `InteractiveBlueprint`, `HeroSection`

- [ ] **Step 1: Create `src/components/sections/Navbar.tsx`**

Fluid Island floating pill navbar detached from top, with subtle translucent glass (`backdrop-blur-xl`), 2-line hamburger morphing into `X`, full-screen mobile overlay with staggered link reveal (`40ms` step), Escape key dismissal, and direct `stacklinespa@gmail.com` link.

Create `landing/src/components/sections/Navbar.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { StacklineLogo } from "@/components/brand/StacklineLogo";
import { PillButton } from "@/components/ui/PillButton";
import { SITE_CONFIG } from "@/data/site";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:pt-5 pointer-events-none">
        <nav
          aria-label="Navegación principal"
          className="pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-surface/85 px-4 py-2.5 shadow-[0_12px_36px_-18px_rgba(22,43,71,0.22)] ring-1 ring-[#162B47]/[0.09] backdrop-blur-xl sm:px-5"
        >
          <a
            href="#inicio"
            aria-label="Stackline — Ir al inicio"
            className="flex items-center rounded-full py-0.5 focus-visible:outline-offset-4"
            onClick={() => setMenuOpen(false)}
          >
            <StacklineLogo className="h-7 w-auto sm:h-8" />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {SITE_CONFIG.navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-secondary transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-tray/80 hover:text-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <PillButton href="#contacto" variant="accent" size="sm">
              Cotizar proyecto
            </PillButton>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-tray/80 text-navy ring-1 ring-[#162B47]/[0.08] transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 md:hidden"
          >
            <span
              className={`absolute h-[1.75px] w-4 rounded-full bg-navy transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[3.5px]"
              }`}
            />
            <span
              className={`absolute h-[1.75px] w-4 rounded-full bg-navy transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[3.5px]"
              }`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-canvas/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            <nav aria-label="Enlaces móviles" className="flex flex-col gap-3">
              {SITE_CONFIG.navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.1 : 0.35,
                    delay: prefersReducedMotion ? 0 : 0.05 + idx * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="border-b border-[#162B47]/[0.08] py-4 font-display text-3xl font-bold tracking-tight text-navy"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-4"
            >
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 rounded-2xl bg-surface px-4 py-3.5 text-sm font-medium text-navy ring-1 ring-[#162B47]/[0.08]"
              >
                <EnvelopeSimple size={18} weight="light" className="text-accent" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <PillButton
                href="#contacto"
                variant="accent"
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                Cotizar tu proyecto
              </PillButton>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/InteractiveBlueprint.tsx`**

Signature interactive artifact in the Hero: visitors switch between **Sistema Interno (ERP / Ops)** and **Plataforma Web / SaaS**, toggle real modular capabilities, and watch the tailored software spec, active modules, and live operational records adapt immediately.

Create `landing/src/components/sections/InteractiveBlueprint.tsx`:
```tsx
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
    baseMetricValue: string;
    secondaryLabel: string;
    secondaryValue: string;
    modules: ModuleSpec[];
  }
> = {
  erp: {
    tabLabel: "Sistema Interno",
    fileLabel: "arquitectura / operacion-erp",
    headline: "Control operativo y margen real en vivo",
    baseMetricLabel: "Margen operativo neto",
    baseMetricValue: "34,8%",
    secondaryLabel: "Trazabilidad",
    secondaryValue: "100% auditable",
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
    baseMetricValue: "< 45 seg",
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
                      active ? "bg-accent text-white" : "bg-white text-transparent ring-1 ring-[#162B47]/15"
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
                {current.baseMetricValue}
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
              Flujo en ejecución · vista interactiva
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
```

- [ ] **Step 3: Create `src/components/sections/HeroSection.tsx`**

Create `landing/src/components/sections/HeroSection.tsx`:
```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { InteractiveBlueprint } from "@/components/sections/InteractiveBlueprint";

const HERO_FACTS = [
  "3 productos reales en producción",
  "Trato directo con ingeniería",
  "100% código a medida",
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center overflow-x-clip pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Subtle architectural blueprint background */}
      <div
        aria-hidden="true"
        className="architectural-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_45%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-accent/[0.06] blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Left editorial column */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-6"
        >
          <SectionEyebrow>Software a medida · Chile</SectionEyebrow>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-navy sm:text-5xl lg:text-[3.5rem]">
            Software que calza con tu operación,{" "}
            <span className="text-accent">no al revés.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg">
            Somos <strong className="font-semibold text-navy">Stackline</strong>, una empresa
            joven de software dedicada a construir sistemas empresariales internos y
            aplicaciones web a la medida para cada requerimiento.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <PillButton href="#contacto" variant="accent">
              Cotizar tu proyecto
            </PillButton>
            <PillButton href="#proyectos" variant="ghost" showArrow={false}>
              Ver proyectos en producción
            </PillButton>
          </div>

          <ul
            aria-label="Compromisos de Stackline"
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-[#162B47]/[0.08] pt-6 font-mono text-xs text-ink-muted"
          >
            {HERO_FACTS.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right signature interactive preview */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.15 : 0.75,
            delay: prefersReducedMotion ? 0 : 0.1,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="lg:col-span-6"
        >
          <InteractiveBlueprint />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run typecheck**

Run in `landing/`:
```powershell
npm run typecheck
```
Expected: Exit code 0.

- [ ] **Step 5: Commit Navbar, InteractiveBlueprint, and HeroSection**

Run in `landing/`:
```powershell
git add src/components/sections/Navbar.tsx src/components/sections/InteractiveBlueprint.tsx src/components/sections/HeroSection.tsx
git commit -m "feat: add Fluid Island Navbar, InteractiveBlueprint signature, and Editorial Hero"
```

---

### Task 5: Asymmetric Solutions Bento & Real Production Projects Showcase

**Files:**
- Create: `landing/src/components/sections/SolutionsBento.tsx`
- Create: `landing/src/components/sections/ProjectsShowcase.tsx`

**Interfaces:**
- Consumes: `SOLUTIONS`, `PROJECTS`, `DoubleBezel`, `PillButton`, `SectionEyebrow`, `MotionReveal`
- Produces: `SolutionsBento`, `ProjectsShowcase`

- [ ] **Step 1: Create `src/components/sections/SolutionsBento.tsx`**

Create `landing/src/components/sections/SolutionsBento.tsx`:
```tsx
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
```

- [ ] **Step 2: Create `src/components/sections/ProjectsShowcase.tsx`**

Features custom authentic miniature UI previews for **Kurova**, **Kalibre 3D**, and **Surko**, showing real functionality from each deployed product alongside verified external links.

Create `landing/src/components/sections/ProjectsShowcase.tsx`:
```tsx
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
        <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted">
          <span>KUROVA · UTILIDAD POR ATENCIÓN</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 ring-1 ring-emerald-200">
            Congelado
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-surface p-3 ring-1 ring-[#162B47]/[0.06]">
            <p className="text-[10px] font-mono uppercase text-ink-muted">Promedio ponderado</p>
            <p className="mt-1 font-display text-base font-bold text-navy">$12,84 / ml</p>
          </div>
          <div className="rounded-xl bg-navy p-3 text-white">
            <p className="text-[10px] font-mono uppercase text-white/65">Utilidad neta</p>
            <p className="mt-1 font-display text-base font-bold text-white">+$18.400</p>
          </div>
        </div>
      </div>
    );
  }

  if (id === "kalibre3d") {
    return (
      <div className="rounded-2xl bg-canvas p-4 ring-1 ring-[#162B47]/[0.07]">
        <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted">
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
      <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted">
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
```

- [ ] **Step 3: Run typecheck**

Run in `landing/`:
```powershell
npm run typecheck
```
Expected: Exit code 0.

- [ ] **Step 4: Commit SolutionsBento and ProjectsShowcase**

Run in `landing/`:
```powershell
git add src/components/sections/SolutionsBento.tsx src/components/sections/ProjectsShowcase.tsx
git commit -m "feat: add asymmetric SolutionsBento and live production ProjectsShowcase"
```

---

### Task 6: Young Company Manifesto, 4-Step Process, Contact Section, Footer & Page Assembly

**Files:**
- Create: `landing/src/components/sections/WhyYoungAndProcess.tsx`
- Create: `landing/src/components/sections/ContactSection.tsx`
- Create: `landing/src/components/sections/Footer.tsx`
- Modify: `landing/src/app/page.tsx`

**Interfaces:**
- Consumes: `YOUNG_PILLARS`, `PROCESS_STEPS`, `SITE_CONFIG`, `PROJECTS`, `PROJECT_TYPE_OPTIONS`, `validateContactPayload`, `buildMailtoUrl`, `StacklineLogo`, `DoubleBezel`, `PillButton`, `SectionEyebrow`, `MotionReveal`
- Produces: Complete assembled landing page in `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/sections/WhyYoungAndProcess.tsx`**

Create `landing/src/components/sections/WhyYoungAndProcess.tsx`:
```tsx
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
              <MotionReveal key={step.number} delay={idx * 0.07} className="h-full">
                <li className="h-full list-none">
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
                </li>
              </MotionReveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/ContactSection.tsx`**

Create `landing/src/components/sections/ContactSection.tsx`:
```tsx
"use client";

import { useState, type FormEvent } from "react";
import {
  Check,
  Clock,
  Copy,
  EnvelopeSimple,
  PaperPlaneTilt,
  WarningCircle,
} from "@phosphor-icons/react";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PillButton } from "@/components/ui/PillButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SITE_CONFIG } from "@/data/site";
import {
  PROJECT_TYPE_OPTIONS,
  buildContactSummary,
  buildMailtoUrl,
  validateContactPayload,
  type ContactFieldErrors,
  type ProjectTypeId,
} from "@/lib/contact-validation";

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "fallback"; mailtoUrl: string; summary: string }
  | { kind: "error"; message: string; mailtoUrl?: string; summary?: string };

export function ContactSection() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState<ProjectTypeId>("sistema-interno");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  async function copyText(text: string, onDone: (val: boolean) => void) {
    try {
      await navigator.clipboard.writeText(text);
      onDone(true);
      window.setTimeout(() => onDone(false), 2400);
    } catch {
      onDone(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const rawPayload = { name, company, email, projectType, message, website };
    const validation = validateContactPayload(rawPayload);

    if (!validation.valid) {
      setFieldErrors(validation.fieldErrors);
      setSubmitState({ kind: "idle" });
      return;
    }

    setSubmitState({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rawPayload),
      });

      const body = await response.json();

      if (response.ok && body.status === "sent") {
        setSubmitState({ kind: "sent" });
        setName("");
        setCompany("");
        setEmail("");
        setMessage("");
        setWebsite("");
        return;
      }

      if (response.ok && body.status === "fallback") {
        setSubmitState({
          kind: "fallback",
          mailtoUrl: body.mailtoUrl,
          summary: body.summary,
        });
        return;
      }

      if (body.fieldErrors) {
        setFieldErrors(body.fieldErrors);
      }

      setSubmitState({
        kind: "error",
        message:
          body.message ||
          "No pudimos completar el envío automático. Puedes escribirnos directo por correo.",
        mailtoUrl: body.mailtoUrl || buildMailtoUrl(validation.data, SITE_CONFIG.email),
        summary: body.summary || buildContactSummary(validation.data),
      });
    } catch {
      setSubmitState({
        kind: "error",
        message:
          "Sin conexión con el servidor en este momento. Tu mensaje sigue intacto: puedes enviarlo en 1 clic por correo.",
        mailtoUrl: buildMailtoUrl(validation.data, SITE_CONFIG.email),
        summary: buildContactSummary(validation.data),
      });
    }
  }

  return (
    <section id="contacto" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left direct contact column */}
          <MotionReveal className="lg:col-span-5">
            <SectionEyebrow>Conversemos</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl lg:leading-[1.08]">
              Cuéntanos qué requiere tu operación.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              Ya sea un sistema empresarial interno desde cero o una nueva plataforma web,
              revisamos tu requerimiento y te respondemos directo desde ingeniería.
            </p>

            <div className="mt-7 flex items-center gap-2.5 text-sm font-medium text-navy">
              <Clock size={18} weight="light" className="text-accent" />
              <span>Tiempo habitual de respuesta: {SITE_CONFIG.responseSla}</span>
            </div>

            <DoubleBezel className="mt-7" innerClassName="p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                Correo directo
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="mt-2 flex items-center gap-2.5 break-all font-display text-lg font-bold tracking-tight text-navy transition-colors hover:text-accent sm:text-xl"
              >
                <EnvelopeSimple size={22} weight="light" className="shrink-0 text-accent" />
                <span>{SITE_CONFIG.email}</span>
              </a>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => copyText(SITE_CONFIG.email, setCopiedEmail)}
                  className="inline-flex items-center gap-2 rounded-full bg-tray px-4 py-2 text-xs font-semibold text-navy ring-1 ring-[#162B47]/[0.08] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white active:scale-[0.97]"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} weight="bold" />
                      <span>Correo copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} weight="light" />
                      <span>Copiar correo</span>
                    </>
                  )}
                </button>

                <PillButton href={`mailto:${SITE_CONFIG.email}`} variant="ghost" size="sm">
                  Abrir correo
                </PillButton>
              </div>
              <span className="sr-only" aria-live="polite">
                {copiedEmail ? "Correo stacklinespa@gmail.com copiado al portapapeles" : ""}
              </span>
            </DoubleBezel>
          </MotionReveal>

          {/* Right guided form column */}
          <MotionReveal delay={0.08} className="lg:col-span-7">
            <DoubleBezel innerClassName="p-6 sm:p-8">
              {submitState.kind === "sent" ? (
                <div className="py-6 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                    <Check size={24} weight="bold" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-navy">
                    Requerimiento recibido
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    Enviamos tu mensaje a <strong className="text-navy">{SITE_CONFIG.email}</strong>.
                    Te responderemos directamente en menos de 24 horas hábiles.
                  </p>
                  <div className="mt-6">
                    <PillButton
                      variant="ghost"
                      showArrow={false}
                      onClick={() => setSubmitState({ kind: "idle" })}
                    >
                      Enviar otra consulta
                    </PillButton>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot anti-spam field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Sitio web</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-navy"
                      >
                        Nombre *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Ej. Camila Rojas"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                        className="mt-1.5 w-full rounded-xl bg-canvas px-3.5 py-3 text-sm text-navy placeholder:text-ink-muted ring-1 ring-[#162B47]/[0.1] transition-[box-shadow,background-color] focus:bg-surface focus:ring-2 focus:ring-accent"
                      />
                      {fieldErrors.name ? (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-red-600">
                          {fieldErrors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold text-navy"
                      >
                        Empresa u organización
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Ej. Distribuidora Sur"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.company)}
                        aria-describedby={
                          fieldErrors.company ? "contact-company-error" : undefined
                        }
                        className="mt-1.5 w-full rounded-xl bg-canvas px-3.5 py-3 text-sm text-navy placeholder:text-ink-muted ring-1 ring-[#162B47]/[0.1] transition-[box-shadow,background-color] focus:bg-surface focus:ring-2 focus:ring-accent"
                      />
                      {fieldErrors.company ? (
                        <p id="contact-company-error" className="mt-1.5 text-xs text-red-600">
                          {fieldErrors.company}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-navy"
                    >
                      Correo electrónico *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="nombre@empresa.cl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                      className="mt-1.5 w-full rounded-xl bg-canvas px-3.5 py-3 text-sm text-navy placeholder:text-ink-muted ring-1 ring-[#162B47]/[0.1] transition-[box-shadow,background-color] focus:bg-surface focus:ring-2 focus:ring-accent"
                    />
                    {fieldErrors.email ? (
                      <p id="contact-email-error" className="mt-1.5 text-xs text-red-600">
                        {fieldErrors.email}
                      </p>
                    ) : null}
                  </div>

                  <fieldset>
                    <legend className="text-xs font-semibold text-navy">
                      ¿Qué necesitas construir?
                    </legend>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {PROJECT_TYPE_OPTIONS.map((option) => {
                        const selected = projectType === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setProjectType(option.id)}
                            className={`rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] ${
                              selected
                                ? "bg-navy text-white shadow-sm"
                                : "bg-canvas text-ink-secondary ring-1 ring-[#162B47]/[0.1] hover:text-navy"
                            }`}
                          >
                            {option.shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-navy"
                    >
                      Cuéntanos sobre tu requerimiento *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe brevemente qué proceso quieres ordenar, automatizar o lanzar en la web..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                      className="mt-1.5 w-full resize-y rounded-xl bg-canvas px-3.5 py-3 text-sm text-navy placeholder:text-ink-muted ring-1 ring-[#162B47]/[0.1] transition-[box-shadow,background-color] focus:bg-surface focus:ring-2 focus:ring-accent"
                    />
                    {fieldErrors.message ? (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-red-600">
                        {fieldErrors.message}
                      </p>
                    ) : null}
                  </div>

                  {submitState.kind === "fallback" ? (
                    <div
                      role="status"
                      className="rounded-2xl bg-accent-tint/80 p-4 ring-1 ring-accent/25"
                    >
                      <div className="flex items-start gap-2.5">
                        <PaperPlaneTilt
                          size={18}
                          weight="regular"
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-navy">
                            Resumen listo para enviar a {SITE_CONFIG.email}
                          </p>
                          <p className="text-xs leading-relaxed text-ink-secondary">
                            Haz clic abajo para abrir tu cliente de correo con el requerimiento
                            ya redactado, o copia el texto en un clic.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <PillButton href={submitState.mailtoUrl} variant="accent" size="sm">
                              Abrir correo prellenado
                            </PillButton>
                            <button
                              type="button"
                              onClick={() => copyText(submitState.summary, setCopiedSummary)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-2 text-xs font-semibold text-navy ring-1 ring-[#162B47]/[0.12] hover:bg-tray"
                            >
                              {copiedSummary ? (
                                <>
                                  <Check size={13} weight="bold" />
                                  <span>Resumen copiado</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={13} weight="light" />
                                  <span>Copiar resumen</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {submitState.kind === "error" ? (
                    <div
                      role="alert"
                      className="rounded-2xl bg-red-50/90 p-4 ring-1 ring-red-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <WarningCircle
                          size={18}
                          weight="regular"
                          className="mt-0.5 shrink-0 text-red-600"
                        />
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-red-900">
                            {submitState.message}
                          </p>
                          {submitState.mailtoUrl ? (
                            <PillButton href={submitState.mailtoUrl} variant="navy" size="sm">
                              Enviar por correo directo
                            </PillButton>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-col items-start justify-between gap-4 pt-1 sm:flex-row sm:items-center">
                    <p className="text-xs text-ink-muted">
                      Sin spam ni listas comerciales. Solo conversación técnica directa.
                    </p>
                    <PillButton
                      type="submit"
                      variant="accent"
                      disabled={submitState.kind === "submitting"}
                      className="w-full sm:w-auto"
                    >
                      {submitState.kind === "submitting"
                        ? "Preparando envío..."
                        : "Enviar requerimiento"}
                    </PillButton>
                  </div>
                </form>
              )}
            </DoubleBezel>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/Footer.tsx`**

Create `landing/src/components/sections/Footer.tsx`:
```tsx
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
```

- [ ] **Step 4: Assemble complete landing page in `src/app/page.tsx`**

Replace `landing/src/app/page.tsx`:
```tsx
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { SolutionsBento } from "@/components/sections/SolutionsBento";
import { WhyYoungAndProcess } from "@/components/sections/WhyYoungAndProcess";

export default function HomePage() {
  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="contenido-principal">
        <HeroSection />
        <SolutionsBento />
        <ProjectsShowcase />
        <WhyYoungAndProcess />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Run full test suite, typecheck, lint, and production build**

Run in `landing/`:
```powershell
npm run test; npm run typecheck; npm run lint; npm run build
```
Expected: All unit tests PASS, zero TypeScript errors, zero lint errors, clean Next.js production build.

- [ ] **Step 6: Commit sections and assembled page**

Run in `landing/`:
```powershell
git add src/components/sections src/app/page.tsx
git commit -m "feat: add WhyYoungAndProcess, ContactSection, Footer, and assemble Stackline landing page"
```

---

### Task 7: Visual & Interactive Verification in Real Browser (Desktop + Mobile)

**Files:**
- Inspect/refine any visual alignment or spacing issues discovered (e.g., `StacklineLogo.tsx` optical arrow placement over the dotless `ı`, responsive overflow, contrast, or spacing).

**Interfaces:**
- Consumes: Built production app (`npm run start`) on `http://localhost:3000`.
- Produces: Verified desktop (`1440×900`) and mobile (`390×844`) screenshots + confirmed interactive tests with zero console errors.

- [ ] **Step 1: Start production server and verify visually + interactively in Desktop & Mobile**
  - Check logo SVG alignment: confirm the burnt-orange upward arrow sits crisply over the stem of `ı` in `Stackline` in both the light navbar and dark footer.
  - Check Desktop (`1440×900`) and Mobile (`390×844`):
    - Zero horizontal overflow (`document.documentElement.scrollWidth <= window.innerWidth`).
    - Toggle `InteractiveBlueprint` tabs (`Sistema Interno` ↔ `Plataforma Web`) and toggle module chips; verify live metrics & log rows update.
    - Verify external links for `Kurova`, `Kalibre 3D`, and `Surko` have exact URLs and `rel="noopener noreferrer"`.
    - Open and close mobile hamburger menu; verify morph to `X` and overlay readability.
    - Click `Copiar correo` and submit the contact form to verify inline validation + honest `fallback` panel with `mailto:stacklinespa@gmail.com`.
    - Confirm zero browser console errors or uncaught exceptions.

- [ ] **Step 2: Apply any pixel-polish fixes discovered during visual inspection, re-run `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, and commit if modified.**
