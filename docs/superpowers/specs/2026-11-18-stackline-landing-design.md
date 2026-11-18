# Stackline Landing Page — Especificación de Diseño

**Fecha:** 2026-11-18  
**Empresa:** Stackline SpA  
**Contacto oficial:** `stacklinespa@gmail.com`  
**Ubicación del proyecto:** `landing/` (subcarpeta aislada dentro del workspace, sin modificar los documentos administrativos en la raíz)  
**Destino de despliegue:** Vercel

---

## 1. Propósito y Posicionamiento

Stackline es una empresa joven de desarrollo de software en Chile especializada en crear **software personalizado y empresarial a la medida** para cada requerimiento.

La landing page tiene un único trabajo principal: **convertir visitas de empresas, emprendedores y equipos operativos en conversaciones directas de diagnóstico/cotización vía `stacklinespa@gmail.com`**, demostrando desde los primeros segundos la calidad real del producto que construye Stackline.

### Audiencia objetivo
- Gerencias, fundadores y encargados de operaciones de pymes y empresas medianas que necesitan un sistema interno que calce con su operación real (y están cansados de planillas rotas o software genérico rígido).
- Negocios que buscan lanzar una aplicación web, catálogo comercial interactivo o plataforma SaaS propia.

### Pilares del mensaje
1. **A la medida real:** El software se adapta a la operación del negocio, no al revés.
2. **Foco claro en dos líneas:** Sistemas empresariales internos (ERP, CRM, inventario, costeo, dashboards) y aplicaciones web / plataformas SaaS.
3. **Prueba real en producción:** Tres productos vivos con usuarios reales (`Kurova`, `Kalibre 3D`, `Surko`) — cero testimonios inventados ni logos falsos.
4. **Ventaja de ser una empresa joven:** Trato directo con quienes diseñan y programan el sistema, sin burocracia comercial, con entregas semanales visibles y código moderno 100% propio.

---

## 2. Identidad Visual y Sistema de Diseño

La estética es **clara, limpia y arquitectónica** (Soft Structuralism / ingeniería de precisión), derivada directamente del logotipo de Stackline.

### Paleta de colores (Tokens)
| Token | Hex / Valor | Rol |
| --- | --- | --- |
| `--bg-canvas` | `#F8F9FB` | Fondo general alabastro frío arquitectónico |
| `--bg-surface` | `#FFFFFF` | Núcleo de tarjetas, formularios y contenedores elevados |
| `--bg-tray` | `#EEF1F6` | Carcasa exterior (*Double-Bezel*) y superficies empotradas |
| `--ink-primary` | `#162B47` | Azul marino Stackline — encabezados, wordmark y botones secundarios |
| `--ink-deep` | `#0D1B2E` | Ancla de máximo contraste (footer, acentos oscuros y hover de navy) |
| `--ink-secondary` | `#4A5D75` | Cuerpo de texto y descripciones |
| `--ink-muted` | `#6E7F96` | Etiquetas auxiliares, metadatos y placeholders |
| `--accent-primary` | `#D45F32` | Naranja terracota Stackline (flecha del logo) — CTAs principales, foco y estados activos |
| `--accent-hover` | `#BE4F24` | Hover de botones y enlaces de acento |
| `--accent-tint` | `#FDF0EA` | Fondo sutil de badges, píldoras activas y resaltados |
| `--border-hairline` | `rgba(22, 43, 71, 0.08)` | Bordes estructurales ultra finos |
| `--border-strong` | `rgba(22, 43, 71, 0.16)` | Bordes interactivos en hover y foco |

### Tipografía (vía `next/font/google`)
- **Display / Titulares:** `Bricolage Grotesque` (pesos `600`, `700`, `800`, tracking ajustado `-0.03em`).
- **Cuerpo / Interfaz:** `Plus Jakarta Sans` (pesos `400`, `500`, `600`, `700`).
- **Etiquetas técnicas / Métricas:** `JetBrains Mono` (pesos `400`, `500`).

### Logotipo Vectorial (`StacklineLogo`)
Se recrea fielmente el logo subido por el usuario en formato **SVG vectorial puro** (eliminando el fondo gris y los controles `<` `>` de la captura):
- Wordmark geométrico en peso bold **Stackline** en `#162B47` (variante `light`) o `#FFFFFF` (variante `dark` para el footer).
- Flecha ascendente / puntero doblado en `#D45F32` inclinado hacia la derecha-arriba reemplazando el punto de la letra `i`.

### Reglas visuales y movimiento
- **Arquitectura Double-Bezel:** Toda tarjeta principal, showcase de proyecto y simulador se encierra en una carcasa externa (`p-1.5 sm:p-2 rounded-[2rem] bg-[#EEF1F6]/85 ring-1 ring-[#162B47]/[0.08]`) con núcleo interno concéntrico (`rounded-[calc(2rem-0.5rem)] bg-white shadow-[0_1px_2px_rgba(22,43,71,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]`).
- **Botones Button-in-Button:** CTAs principales tipo píldora (`rounded-full`) con ícono circular interno que se traslada en diagonal en hover (`group-hover:translate-x-0.5 group-hover:-translate-y-0.5`) y feedback táctil al presionar (`active:scale-[0.98]`).
- **Iconografía:** `@phosphor-icons/react` con peso `light` o `regular` (líneas finas y precisas).
- **Curvas y rendimiento:** Exclusivamente transiciones físicas `cubic-bezier(0.32, 0.72, 0, 1)` o springs de Framer Motion animando solo `transform` y `opacity`. `backdrop-blur` limitado exclusivamente a elementos fijos (navbar flotante y overlay de menú móvil). Respeto estricto a `prefers-reduced-motion`.

---

## 3. Arquitectura de Contenido y Secciones

1. **Navbar Flotante (`Navbar`)**
   - Píldora flotante centrada y despegada del borde superior (`mt-4 sm:mt-6`, `rounded-full`, vidrio translúcido al hacer scroll).
   - Contenido: `StacklineLogo` (link al inicio) · enlaces (`Soluciones`, `Proyectos`, `Proceso`, `Nosotros`) · CTA `Cotizar proyecto ↗`.
   - Mobile (`< 768px`): botón hamburguesa de 2 líneas que rota suavemente a una `X` y abre un overlay a pantalla completa con aparición escalonada de enlaces + enlace directo a `stacklinespa@gmail.com`.

2. **Hero Editorial-Split + Elemento Firma (`HeroSection` + `InteractiveBlueprint`)**
   - Altura `min-h-[100dvh]` adaptable (sin `h-screen` rígido). Cuadrícula arquitectónica ultra tenue de fondo.
   - **Columna izquierda:**
     - Eyebrow pill: `SOFTWARE A MEDIDA · CHILE`.
     - H1: *"Software que calza con tu operación, no al revés."*
     - Bajada: *"Somos Stackline, una empresa joven de desarrollo enfocada en crear sistemas empresariales y aplicaciones web personalizadas para cada requerimiento."*
     - CTAs: `Cotizar tu proyecto ↗` (scroll suave a `#contacto`) y `Ver proyectos reales` (scroll suave a `#proyectos`).
     - Franja factual sin humo: `3 productos en producción` · `Trato directo con ingeniería` · `100% código a medida`.
   - **Columna derecha — Elemento Firma (`InteractiveBlueprint`):**
     - Panel interactivo en contenedor Double-Bezel donde el visitante alterna con `layoutId` entre dos modos reales:
       1. **Sistema Interno (ERP / Ops):** permite activar/desactivar 3 módulos reales (`Inventario al costo`, `Margen por orden`, `Permisos por rol`) y actualiza en vivo una vista previa de métricas y registros operativos simulados (ej. órdenes procesadas, margen neto, trazabilidad).
       2. **Plataforma Web / SaaS:** permite alternar entre módulos de `Catálogo configurable`, `Flujo de cotización` y `Portal multiusuario`, reflejando en tiempo real el flujo de cliente y estado de solicitud.

3. **Soluciones a Medida (`SolutionsBento`)**
   - Layout **Bento Asimétrico** en desktop (colapsa a 1 columna bajo `768px` con `gap-6` y `px-4`), secciones con respiro amplio (`py-24 lg:py-32`).
   - **Tarjeta protagonista 1 (`col-span-7`):** *Sistemas empresariales internos* — ERP ligeros, CRM propios, control de stock y costeo real, paneles operativos y permisos por rol.
   - **Tarjeta protagonista 2 (`col-span-5`):** *Aplicaciones web y plataformas SaaS* — Portales de clientes, catálogos interactivos, agendas, flujos de pago y plataformas multiusuario listas para crecer.
   - **Tarjeta de soporte 1 (`col-span-5`):** *Reglas de negocio exactas* — Modelamos tus cálculos reales (márgenes, comisiones, insumos, historial inmutable) sin forzar procesos en hojas de cálculo.
   - **Tarjeta de soporte 2 (`col-span-7`):** *Código 100% tuyo, sin licencias infladas* — Pagas por lo que tu operación necesita, con arquitectura moderna mantenible y preparada para evolucionar.

4. **Proyectos Reales en Producción (`ProjectsShowcase`)**
   - Presenta los 3 productos activos con usuarios reales construidos por Stackline, cada uno en contenedor Double-Bezel con miniatura visual estilizada (interfaz representativa fiel a cada app), categoría, descripción concreta, 3–4 chips de capacidades reales y enlace externo seguro (`target="_blank" rel="noopener noreferrer"`):
     1. **Kurova** (`https://kurova.vercel.app/`) — *SaaS Empresarial · Centros de estética*. Agenda por profesional, inventario por envase con costo promedio ponderado, utilidad congelada por atención, roles por centro y Club de clientas.
     2. **Kalibre 3D** (`https://kalibre3d.vercel.app/`) — *Sistema Operativo · Talleres de impresión 3D*. Pedidos multicanal (WhatsApp, Instagram, Mercado Libre), cotizador con purga multicolor, control de bobinas al gramo y cálculo de neto real de Mercado Libre.
     3. **Surko** (`https://surko.vercel.app/`) — *Aplicación Web · Impresión 3D personalizada*. Plataforma comercial de marca, catálogos configurables por producto y color, y flujo de cotización directa con envíos a todo Chile.

5. **Por qué una empresa joven + Proceso en 4 Pasos (`WhyYoungAndProcess`)**
   - **Bloque "Nosotros" (Manifiesto):** Explica por qué trabajar con un equipo joven y dedicado es una ventaja práctica:
     - *Cero intermediarios:* hablas directamente con los ingenieros que diseñan y programan tu software.
     - *Velocidad real con criterio:* entregas semanales probables en producción, no meses de espera para ver una primera pantalla.
     - *Stack moderno y limpio:* tecnología actual que cualquiera puede mantener y escalar sin deuda heredada.
   - **Secuencia numerada real (`01` a `04`):**
     - `01` **Levantamiento del requerimiento:** Entendemos tu flujo actual, cuellos de botella y reglas de negocio reales.
     - `02` **Arquitectura y prototipo navegable:** Definimos alcance, pantallas clave y modelo de datos antes de construir.
     - `03` **Desarrollo iterativo con demos:** Avances visibles cada semana con pruebas sobre escenarios reales de tu equipo.
     - `04` **Despliegue y acompañamiento:** Puesta en marcha en producción, capacitación y soporte evolutivo.

6. **Sección de Contacto + Footer (`ContactSection` + `Footer`)**
   - **Contacto (`#contacto`):**
     - Columna izquierda: promesa realista (*"Respondemos directo desde ingeniería en menos de 24 horas hábiles"*), pasos que ocurren tras escribir y tarjeta Double-Bezel con `stacklinespa@gmail.com` que incluye botón **Copiar correo** (cambia a *"Copiado"* con confirmación accesible `aria-live`) y enlace `Escribir por correo ↗`.
     - Columna derecha: Formulario guiado con campos:
       - `Nombre` (requerido)
       - `Empresa u organización` (opcional)
       - `Correo electrónico` (requerido, validación RFC básica)
       - `Tipo de requerimiento` (selector visual: *Sistema empresarial interno*, *Aplicación web / SaaS*, *Otro requerimiento a medida*)
       - `Cuéntanos qué necesitas resolver` (requerido, mínimo 15 caracteres)
       - Campo honeypot oculto (`website`) para frenar bots sin CAPTCHA.
   - **Footer (`#0D1B2E`):**
     - Logo SVG versión clara, resumen en una línea de Stackline SpA, navegación de secciones, enlaces directos a `Kurova`, `Kalibre 3D` y `Surko`, correo `stacklinespa@gmail.com` y copyright dinámico.

---

## 4. Arquitectura Técnica y Estructura de Archivos

```text
landing/
├── docs/superpowers/specs/
│   └── 2026-11-18-stackline-landing-design.md
├── src/
│   ├── app/
│   │   ├── api/contact/
│   │   │   ├── route.ts            # Endpoint POST validado + integración Resend + fallback honesto
│   │   │   └── route.test.ts       # Tests unitarios del route handler
│   │   ├── globals.css             # Tailwind v4 (@theme inline), tokens CSS, cuadrícula sutil y reduced-motion
│   │   ├── icon.svg                # Favicon SVG automático en App Router (flecha + inicial Stackline)
│   │   ├── layout.tsx              # Fuentes next/font, metadata SEO, OpenGraph y lang="es"
│   │   ├── page.tsx                # Ensamblaje limpio de secciones
│   │   ├── robots.ts               # Reglas de indexación
│   │   └── sitemap.ts              # Sitemap XML automático
│   ├── components/
│   │   ├── brand/
│   │   │   └── StacklineLogo.tsx   # Logo vectorial SVG (variantes light / dark)
│   │   ├── ui/
│   │   │   ├── DoubleBezel.tsx     # Contenedor concéntrico reutilizable
│   │   │   ├── PillButton.tsx      # Botón pill + Button-in-Button trailing icon
│   │   │   ├── MotionReveal.tsx    # Entrada suave con whileInView
│   │   │   └── SectionEyebrow.tsx  # Eyebrow pill técnico
│   │   └── sections/
│   │       ├── Navbar.tsx
│   │       ├── HeroSection.tsx
│   │       ├── InteractiveBlueprint.tsx
│   │       ├── SolutionsBento.tsx
│   │       ├── ProjectsShowcase.tsx
│   │       ├── WhyYoungAndProcess.tsx
│   │       ├── ContactSection.tsx
│   │       └── Footer.tsx
│   ├── data/
│   │   ├── site.ts                 # Constantes de marca, correo y navegación
│   │   ├── solutions.ts            # Contenido tipado de soluciones Bento
│   │   ├── projects.ts             # Kurova, Kalibre 3D y Surko tipados
│   │   └── process.ts              # Principios de empresa joven y pasos 01–04
│   └── lib/
│       ├── contact-validation.ts   # Validación pura compartida cliente/servidor + constructor mailto
│       └── contact-validation.test.ts
├── .env.example                    # Documentación de RESEND_API_KEY y CONTACT_FROM_EMAIL
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── vitest.config.ts
```

---

## 5. Flujo de Datos del Formulario y Manejo de Errores

1. **En el cliente (`ContactSection.tsx`):**
   - Al enviar, ejecuta `validateContactPayload()` antes de hacer `fetch('/api/contact')`. Si hay errores de campo, los muestra inmediatamente debajo de cada input (`aria-invalid` + `aria-describedby`) sin limpiar el texto escrito.
2. **En el servidor (`src/app/api/contact/route.ts`):**
   - Parsea JSON de forma segura (si el JSON es inválido devuelve `400`).
   - Re-valida con `validateContactPayload()`. Si falla devuelve `400` con mapa de `fieldErrors`.
   - Si el campo honeypot oculto trae texto, responde `200 { status: "sent" }` silenciosamente sin enviar correo.
   - **Ruta A — Con `RESEND_API_KEY` configurada:** realiza `POST https://api.resend.com/emails` enviando el requerimiento formateado hacia `stacklinespa@gmail.com` con `reply_to` igual al correo del visitante. Si Resend responde OK, retorna `200 { status: "sent" }`. Si Resend falla por red o cuota, retorna `502 { status: "error", mailtoUrl }` para que el usuario nunca pierda su mensaje y pueda enviarlo en 1 clic por correo.
   - **Ruta B — Sin `RESEND_API_KEY` todavía:** retorna `200 { status: "fallback", mailtoUrl, summary }` de manera explícita. La UI muestra una confirmación clara indicando que el resumen está listo para enviarse a `stacklinespa@gmail.com`, con un botón principal `Abrir correo prellenado ↗` y un botón secundario `Copiar resumen`.
3. **Resiliencia:**
   - En ningún caso de error se borra lo que escribió el usuario.
   - El correo `stacklinespa@gmail.com` siempre está accesible de forma directa y copiable sin depender de ningún servicio externo.

---

## 6. Criterios de Verificación y Pruebas

Antes de dar por terminada la implementación se ejecutarán:
1. **Pruebas unitarias (`vitest`):**
   - Validación de payload del formulario (válido, campos vacíos, correo inválido, mensaje corto, límites de largo, detección de honeypot y generación segura de `mailto:`).
   - Tests del route handler `POST /api/contact` cubriendo modo `fallback` (sin API key), validación `400`, honeypot y envío exitoso/fallido con `fetch` mockeado hacia Resend.
2. **Integridad de compilación y tipos:**
   - `npx tsc --noEmit` sin errores.
   - `npm run lint` sin advertencias críticas.
   - `npm run build` exitoso (producción Next.js lista para Vercel).
3. **Verificación visual e interactiva en navegador:**
   - Revisión en viewport Desktop (`1440×900`) y Mobile (`390×844`):
     - Logo SVG limpio y proporcionado en header y footer.
     - Cero desbordamiento horizontal (`scrollWidth <= innerWidth`).
     - Simulador interactivo del Hero alternando tabs y toggles correctamente.
     - Menú hamburguesa mobile abriendo y cerrando suavemente.
     - Botón de copiar correo y envío del formulario funcionando sin errores de consola.
