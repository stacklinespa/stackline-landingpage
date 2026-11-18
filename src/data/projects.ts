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
