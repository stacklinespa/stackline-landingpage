export interface CapabilityItem {
  id: string;
  index: string;
  title: string;
  shortTag: string;
  summary: string;
  details: string[];
  idealFor: string;
}

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "sistemas-internos",
    index: "01",
    title: "Sistemas empresariales internos",
    shortTag: "ERP · CRM · Operaciones",
    summary:
      "Cuando las planillas se quedan cortas y el software enlatado obliga a tu equipo a trabajar raro, diseñamos un sistema que calza exacto con tus flujos reales.",
    details: [
      "Control de inventario, compras, costos reales y márgenes por orden",
      "Gestión de pedidos, clientes, agenda y estados operativos en vivo",
      "Cuentas individuales, permisos por rol e historial auditable",
      "Paneles de dirección claros para decidir con datos del día",
    ],
    idealFor: "Pymes y equipos operativos cansados de planillas rotas o licencias rígidas.",
  },
  {
    id: "plataformas-web",
    index: "02",
    title: "Aplicaciones web y plataformas SaaS",
    shortTag: "Web Apps · Portales · SaaS",
    summary:
      "Llevamos tu idea de negocio o canal comercial a la web con diseño cuidado, velocidad real y arquitectura preparada para recibir usuarios desde el primer día.",
    details: [
      "Portales de clientes, reservas, catálogos configurables y cotizadores",
      "Productos SaaS multiusuario con suscripciones, roles y panel propio",
      "Interfaces rápidas y responsivas pensadas primero para uso real en móvil y escritorio",
      "Despliegue moderno en la nube listo para crecer sin rehacer la base",
    ],
    idealFor: "Negocios lanzando un producto digital propio o modernizando su atención comercial.",
  },
  {
    id: "ingenieria-a-medida",
    index: "03",
    title: "Lógica de negocio exacta y código 100% tuyo",
    shortTag: "Arquitectura limpia · Sin amarras",
    summary:
      "Cada empresa calcula distinto su costo, su comisión o su flujo de entrega. Programamos tus reglas reales sobre código moderno que puedes escalar a tu ritmo.",
    details: [
      "Modelado fiel de cálculos, comisiones, insumos y estados propios de tu rubro",
      "Código limpio, tipado y mantenible — sin plantillas pesadas ni dependencias ocultas",
      "Evolución por etapas: partimos resolviendo lo urgente y crecemos contigo",
    ],
    idealFor: "Empresas que quieren control total sobre su herramienta tecnológica.",
  },
];
