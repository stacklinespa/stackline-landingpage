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
