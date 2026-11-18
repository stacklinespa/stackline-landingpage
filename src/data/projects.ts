export type ProjectPreviewKey = "kurova" | "kalibre3d" | "surko";

export interface ProjectItem {
  id: ProjectPreviewKey;
  index: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  year: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  capabilities: string[];
  impactNote: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "kurova",
    index: "01",
    name: "Kurova",
    domain: "kurova.vercel.app",
    url: "https://kurova.vercel.app/",
    category: "SaaS Empresarial",
    year: "2026",
    image: "/images/projects/kurova.png",
    imageAlt: "Captura real de Kurova, plataforma SaaS de gestión para centros de estética",
    tagline: "Gestión integral, inventario al costo real y utilidad congelada por atención.",
    description:
      "Plataforma multiusuario para centros de estética que une agenda por profesional, historial de clientas, stock por envase con promedio ponderado y programa Club con sellos.",
    capabilities: [
      "Agenda por profesional",
      "Costo promedio ponderado",
      "Utilidad congelada",
      "Roles + Club de clientas",
    ],
    impactNote: "Trazabilidad inmutable en cada atención y consumo de insumo.",
  },
  {
    id: "kalibre3d",
    index: "02",
    name: "Kalibre 3D",
    domain: "kalibre3d.vercel.app",
    url: "https://kalibre3d.vercel.app/",
    category: "Sistema Operativo",
    year: "2026",
    image: "/images/projects/kalibre3d.png",
    imageAlt: "Captura real de Kalibre 3D, sistema operativo para talleres de impresión 3D",
    tagline: "Pedidos multicanal, cotizador multicolor y margen neto al gramo.",
    description:
      "Sistema operativo construido para talleres de impresión 3D que venden por WhatsApp, Instagram y Mercado Libre. Controla bobinas, purga multicolor, comisiones y ganancia real del mes.",
    capabilities: [
      "Cotizador con purga multicolor",
      "Cálculo neto Mercado Libre",
      "Control de bobinas",
      "Pedidos multicanal",
    ],
    impactNote: "Registra ventas desde el celular en menos de 30 segundos.",
  },
  {
    id: "surko",
    index: "03",
    name: "Surko",
    domain: "surko.vercel.app",
    url: "https://surko.vercel.app/",
    category: "Aplicación Web & Catálogo",
    year: "2026",
    image: "/images/projects/surko.png",
    imageAlt: "Captura real de Surko, plataforma web y catálogo de impresión 3D personalizada",
    tagline: "Identidad digital y catálogos personalizables para impresión 3D en Chile.",
    description:
      "Experiencia web a medida diseñada para presentar líneas de emblemas, llaveros y kits de encuadernación, con elección de colores y cotización directa optimizada para móvil.",
    capabilities: [
      "Catálogos por línea",
      "Personalización de colores",
      "Cotización directa",
      "Envíos a todo Chile",
    ],
    impactNote: "Diseñada para convertir visitas móviles en pedidos concretos.",
  },
];
