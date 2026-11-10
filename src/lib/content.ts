export const brand = {
  name: "Nouvia",
  description:
    "Nouvia combina consultoría, inteligencia artificial, DApps Web3, sistemas a la medida y custodia cloud para empresas de industria, campo, comercio y servicios.",
};

export const nav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#enfoque", label: "Enfoque" },
  { href: "#contacto", label: "Contacto" },
] as const;

export type SectorId = "agro" | "industria" | "servicios" | "comercio";

export const sectors: Array<{
  id: SectorId;
  label: string;
  summary: string;
  points: string[];
}> = [
  {
    id: "agro",
    label: "Agroindustria y campo",
    summary: "Del lote al contrato de cosecha, con evidencia que las partes pueden verificar.",
    points: [
      "Trazabilidad de la cadena de suministro en blockchain.",
      "Tokenización de activos agrícolas.",
      "Smart contracts para compraventa de cosechas.",
    ],
  },
  {
    id: "industria",
    label: "Industria y manufactura",
    summary: "Producción, calidad y logística sobre un registro que no se reescribe en silencio.",
    points: [
      "Registro inmutable de producción.",
      "Auditoría descentralizada de calidad.",
      "Gestión logística con DApps.",
    ],
  },
  {
    id: "servicios",
    label: "Servicios",
    summary: "Credenciales y acuerdos que no quedan atrapados en la cuenta de un solo proveedor.",
    points: [
      "Identidad digital descentralizada (DID).",
      "Autenticación soberana.",
      "Acuerdos digitales auto-ejecutables.",
    ],
  },
  {
    id: "comercio",
    label: "Comercio y retail",
    summary: "Lealtad, pago e inventario que pueden viajar con el cliente y con la mercancía.",
    points: [
      "Lealtad basada en Web3.",
      "Micropagos sin intermediarios innecesarios.",
      "Tokenización de inventarios.",
    ],
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  video: string;
  core: string[];
  enhanced: string[];
  enhancedLabel: string;
  quadrant?: { index: string; kicker: string; promise: string };
};

export const services: Service[] = [
  {
    id: "web3",
    title: "DApps y Web3",
    description: "Trazabilidad, activos y acuerdos verificables para campo, planta, servicios y comercio.",
    details:
      "Diseñamos DApps sobre la operación real: seguridad criptográfica, gobernanza transparente, interoperabilidad con los sistemas que ya usa la empresa y contratos inteligentes a la medida.",
    image: "/dapps.jpg",
    video: "/dapps.mp4",
    core: [
      "Seguridad criptográfica y permisos por rol",
      "Gobernanza transparente entre las partes",
      "Contratos inteligentes escritos sobre el proceso",
    ],
    enhanced: [
      "Trazabilidad de cadena de suministro",
      "Tokenización de activos e inventarios",
      "Identidad soberana y acuerdos auto-ejecutables",
    ],
    enhancedLabel: "Enfoque sectorial",
    quadrant: {
      index: "01",
      kicker: "Prioridad",
      promise: "Acuerdos y registros que no dependen de un único intermediario.",
    },
  },
  {
    id: "ia",
    title: "Inteligencia artificial",
    description: "De la prueba de concepto a producción, con métrica de retorno y equipo interno capaz de sostenerla.",
    details:
      "Diagnosticamos madurez, detectamos ineficiencias y llevamos agentes o modelos a la operación. Incluye automatización de workflows, CRM predictivo y formación ejecutiva.",
    image: "/agent-points.jpg",
    video: "/agent-speaking.mp4",
    core: [
      "Diagnóstico de madurez tecnológica",
      "Agentes para workflows repetitivos",
      "Capacitación ejecutiva y de equipos",
    ],
    enhanced: [
      "IA aplicada a ventas, marketing y CRM",
      "Criterio de salida del piloto",
      "Supervisión humana y medición de retorno",
    ],
    enhancedLabel: "Potenciado en operación",
    quadrant: {
      index: "02",
      kicker: "Adopción",
      promise: "El piloto entra a la operación con dueño, dato y métrica.",
    },
  },
  {
    id: "dev",
    title: "Desarrollo a la medida",
    description: "ERPs, CRMs, tableros y analítica que siguen el proceso real de la empresa.",
    details:
      "Sistemas escalables que integran inteligencia artificial y arquitecturas modernas en la nube. El software se adapta a la operación, no al revés.",
    image: "/dev.jpg",
    video: "/dev.mp4",
    core: [
      "ERPs y CRMs a la medida",
      "Dashboards en tiempo real",
      "Integración con plataformas existentes",
    ],
    enhanced: [
      "Analítica avanzada",
      "Espacio para modelos de IA",
      "APIs y permisos por función",
    ],
    enhancedLabel: "Sistema vivo",
    quadrant: {
      index: "03",
      kicker: "Sistemas",
      promise: "Una plataforma que crece con la operación y puede hablar con la DApp.",
    },
  },
  {
    id: "cloud",
    title: "Nube, custodia y ciberseguridad",
    description: "Almacenamiento seguro, custodia de datos críticos, auditoría y protección de infraestructura.",
    details:
      "La nube es el suelo de la IA, las DApps y los sistemas a la medida. Clasificamos el dato crítico, limitamos el acceso y dejamos evidencia de quién lo tocó.",
    image: "/cloud.jpg",
    video: "/cloud.mp4",
    core: [
      "Almacenamiento seguro en la nube",
      "Custodia de datos críticos",
      "Auditorías de seguridad informática",
    ],
    enhanced: [
      "Protección de infraestructura",
      "Separación de prueba y producción",
      "Continuidad y recuperación",
    ],
    enhancedLabel: "Suelo defendible",
    quadrant: {
      index: "04",
      kicker: "Custodia",
      promise: "El dato crítico tiene responsable, acceso mínimo y evidencia.",
    },
  },
  {
    id: "consulting",
    title: "Consultoría y estrategia",
    description: "Arquitectura tecnológica, lectura de riesgo y una hoja de ruta que la empresa puede ejecutar.",
    details:
      "Actuamos como socio tecnológico: leemos el estado actual y diseñamos una arquitectura alineada con el negocio, no con un catálogo de herramientas.",
    image: "/meet.jpg",
    video: "/meet.mp4",
    core: ["Arquitectura y CTO externo", "Evaluación de riesgos", "Hoja de ruta digital"],
    enhanced: ["Caso de negocio de IA y Web3", "Priorización por retorno", "Criterios de salida de cada fase"],
    enhancedLabel: "Dirección",
  },
  {
    id: "security",
    title: "Soporte técnico",
    description: "Atención y resolución de problemas técnicos, con un canal claro para el equipo.",
    details:
      "Cuando algo deja de operar, alguien atiende, diagnostica y da seguimiento hasta dejar el servicio funcionando.",
    image: "/support.jpg",
    video: "/support.mp4",
    core: ["Atención de incidentes", "Diagnóstico de la falla", "Seguimiento hasta el cierre"],
    enhanced: ["Canal de soporte para el equipo", "Prioridad según el impacto", "Registro de lo atendido"],
    enhancedLabel: "Servicio",
  },
  {
    id: "data",
    title: "Datos y business intelligence",
    description: "Tableros y modelos para decidir con el dato que la operación ya produce.",
    details:
      "Transformamos historiales dispersos en una lectura compartida del negocio, lista para alimentar sistemas, agentes y registros verificables.",
    image: "/data.jpg",
    video: "/data.mp4",
    core: ["Tableros de reporteo", "Modelos de demanda y riesgo", "Calidad del dato de origen"],
    enhanced: ["Señales para CRM y operación", "Historial utilizable por una DApp", "Una métrica común para dirección"],
    enhancedLabel: "Decisión",
  },
  {
    id: "automation",
    title: "Automatización",
    description: "Retiramos trabajo repetitivo con flujos acotados y, cuando conviene, con agentes.",
    details:
      "El primer corte ataca el workflow de mayor volumen, con un responsable y un antes y un después medibles.",
    image: "/robot.jpg",
    video: "/robot.mp4",
    core: ["Flujos administrativos", "Integración entre sistemas", "Menos captura manual"],
    enhanced: ["Agentes con supervisión", "Excepciones explícitas", "Medición del tiempo devuelto"],
    enhancedLabel: "Operación",
  },
  {
    id: "telecom",
    title: "Telecomunicaciones",
    description: "Enlaces, redes y continuidad para que la operación no dependa de un solo canal.",
    details:
      "Diseñamos la conectividad que sostiene sistemas, DApps y equipos distribuidos: enlaces, redundancia y un responsable cuando el canal falla.",
    image: "/router.jpg",
    video: "/telecom.mp4",
    core: ["Enlaces y redes empresariales", "Redundancia de canal", "Cobertura entre sedes"],
    enhanced: ["Continuidad ante falla", "Prioridad para sistemas críticos", "Visibilidad del canal"],
    enhancedLabel: "Conectividad",
  },
];

export const quadrantIds = ["web3", "ia", "dev", "cloud", "consulting", "security", "data", "automation", "telecom"] as const;

export const stations = [
  {
    kicker: "El piloto eterno",
    lines: ["¿La prueba de concepto", "se queda en una demo", "que nunca opera?"],
  },
  {
    kicker: "La brecha",
    lines: ["¿Cuánto valor se pierde", "entre la idea", "y la operación?"],
  },
  {
    kicker: "El laberinto",
    lines: ["¿Hacen falta demasiados", "proveedores para", "un solo sistema?"],
  },
  {
    kicker: "El punto ciego",
    lines: ["¿Puedes probar el origen,", "la calidad y quién", "tocó el dato?"],
  },
  {
    kicker: "La posibilidad",
    lines: ["¿Y si la IA, Web3", "y la operación avanzaran", "como un solo sistema?"],
  },
  {
    kicker: "Tu siguiente movimiento",
    lines: ["Un diagnóstico breve", "y una conversación", "con contexto."],
  },
] as const;

export const challenges = [
  { id: "eficiencia", label: "Ineficiencia operativa", description: "Tareas repetitivas que consumen al equipo." },
  { id: "trazabilidad", label: "Trazabilidad y confianza", description: "Origen, calidad o cumplimiento que hoy no se auditan." },
  { id: "seguridad", label: "Seguridad y custodia", description: "Datos críticos e infraestructura que piden más control." },
  { id: "roi", label: "Retorno y talento", description: "Interés en adoptar tecnología sin un caso de negocio claro." },
] as const;

export const technologies = [
  { id: "web3", label: "DApps y Web3", description: "Trazabilidad, activos y acuerdos descentralizados." },
  { id: "ia", label: "Inteligencia artificial", description: "Workflows y decisiones con IA aplicada." },
  { id: "cloud", label: "Nube, custodia y ciberseguridad", description: "Resguardo, custodia y protección." },
] as const;

export const formSectors = [
  "Agroindustria y campo",
  "Industria y manufactura",
  "Servicios",
  "Comercio y retail",
  "Otro",
] as const;

export const formServices = [
  "DApps y Web3",
  "Inteligencia artificial",
  "Desarrollo a la medida",
  "Nube, custodia y ciberseguridad",
  "Consultoría y estrategia",
  "Soporte técnico",
  "Datos y business intelligence",
  "Automatización",
  "Telecomunicaciones",
] as const;

export const budgetOptions = [
  "Aún por definir",
  "Menos de 25,000 USD",
  "25,000 a 75,000 USD",
  "75,000 a 200,000 USD",
  "Más de 200,000 USD",
] as const;

export function serviceById(id: string) {
  return services.find((service) => service.id === id);
}
