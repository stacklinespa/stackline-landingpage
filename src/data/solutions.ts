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
