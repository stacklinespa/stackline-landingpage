export interface ManifestoPoint {
  id: string;
  label: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export const MANIFESTO_POINTS: ManifestoPoint[] = [
  {
    id: "trato-directo",
    label: "Sin capas intermedias",
    title: "Conversas directo con quienes diseñan y escriben el código.",
    description:
      "No delegamos tu proyecto a desconocidos después de la primera reunión. El mismo equipo que te escucha es el que construye cada pantalla y cada regla de negocio.",
  },
  {
    id: "hambre-de-calidad",
    label: "Empresa joven, foco total",
    title: "Estamos creciendo — por eso cada proyecto importa de verdad.",
    description:
      "No eres un ticket más en una consultora gigante. Estamos construyendo nuestra reputación proyecto a proyecto, con obsesión por los detalles, cercanía y entregas reales.",
  },
  {
    id: "velocidad-honesta",
    label: "Demos semanales",
    title: "Ves tu software funcionando temprano, no al final de seis meses.",
    description:
      "Trabajamos en ciclos cortos con enlaces navegables en vivo cada semana para que pruebes, ajustes y tengas claridad total en todo momento.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Escuchamos tu operación",
    description:
      "Entendemos cómo trabajas hoy, dónde se pierde tiempo o dinero y qué necesita resolver el software primero.",
    deliverable: "Diagnóstico + alcance claro",
  },
  {
    number: "02",
    title: "Diseñamos el prototipo",
    description:
      "Definimos flujos, pantallas clave y reglas de negocio antes de escribir código a fondo.",
    deliverable: "Propuesta visual y funcional",
  },
  {
    number: "03",
    title: "Construimos contigo",
    description:
      "Entregamos avances funcionales cada semana en un entorno real para probar y ajustar rápido.",
    deliverable: "Demos navegables semanales",
  },
  {
    number: "04",
    title: "Lanzamos y acompañamos",
    description:
      "Publicamos en producción, capacitamos a tu equipo y seguimos disponibles para evolucionar la plataforma.",
    deliverable: "En producción + soporte",
  },
];
