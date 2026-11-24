export interface ProductItem {
  id: "reservo" | "margen";
  index: string;
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  phoneImage?: string;
  phoneImageAlt?: string;
  tagline: string;
  description: string;
  features: string[];
  highlight: { value: string; label: string };
  idealFor: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "reservo",
    index: "01",
    name: "Reservo",
    category: "Agenda online con abono",
    image: "/images/products/agenda-panel-agenda.png",
    imageAlt: "Panel de Reservo con la agenda del día por profesional de una barbería",
    phoneImage: "/images/products/agenda-reserva-movil.png",
    phoneImageAlt: "Cliente reservando una hora desde el celular en Reservo",
    tagline: "Tus clientes reservan y pagan el abono solos, a cualquier hora.",
    description:
      "Página de reservas con el enlace y los colores de tu negocio, abono con Mercado Pago y recordatorios por WhatsApp. El cliente cambia o cancela su hora sin escribirte.",
    features: [
      "Reserva 24/7 desde el celular",
      "Abono online con Mercado Pago",
      "Recordatorios por WhatsApp",
      "Agenda por profesional y reportes",
    ],
    highlight: { value: "Menos inasistencias", label: "El abono compromete la hora" },
    idealFor: "barberías, peluquerías, centros de estética, uñas, kine y consultas.",
  },
  {
    id: "margen",
    index: "02",
    name: "Margen",
    category: "Inventario y ganancia multicanal",
    image: "/images/products/inventario-resumen.png",
    imageAlt: "Resumen mensual de Margen con ventas, gastos, ganancia real y rentabilidad por canal",
    tagline: "Sabe cuánto ganas de verdad en cada canal donde vendes.",
    description:
      "Stock por bodega, costo promedio ponderado y comisiones de Mercado Libre, Instagram o tu tienda web descontadas solas. Llegas a la ganancia real del mes sin planillas.",
    features: [
      "Stock por bodega con alertas",
      "Costo promedio ponderado y kardex",
      "Comisiones y envíos por canal",
      "Importa tus productos desde Excel",
    ],
    highlight: { value: "Ganancia real", label: "Ventas − costos − comisiones − gastos" },
    idealFor: "tiendas que venden en local, Instagram, WhatsApp y Mercado Libre.",
  },
];
