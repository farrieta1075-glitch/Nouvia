import { challenges, sectors, technologies, type SectorId } from "@/lib/content";

type ChallengeId = (typeof challenges)[number]["id"];
type TechId = (typeof technologies)[number]["id"];

export function buildRecommendation(input: { sectorId: SectorId; challengeId: ChallengeId; techId: TechId }) {
  const sector = sectors.find((item) => item.id === input.sectorId);
  const challenge = challenges.find((item) => item.id === input.challengeId);
  const tech = technologies.find((item) => item.id === input.techId);
  if (!sector || !challenge || !tech) {
    throw new Error("Respuesta incompleta");
  }

  const route =
    input.techId === "web3"
      ? `La ruta recomendada es una DApp para ${sector.label.toLowerCase()}: trazabilidad, activos y acuerdos con gobernanza visible.`
      : input.techId === "ia"
        ? `La ruta recomendada es un programa de inteligencia artificial para ${sector.label.toLowerCase()}, de la prueba de concepto a producción.`
        : `La ruta recomendada empieza por la infraestructura de ${sector.label.toLowerCase()}: nube, custodia y ciberseguridad.`;

  const move =
    input.challengeId === "eficiencia"
      ? "El primer alcance retira el workflow repetitivo de mayor volumen."
      : input.challengeId === "trazabilidad"
        ? "El diseño se ancla en los eventos que hoy no pueden probarse."
        : input.challengeId === "seguridad"
          ? "El punto de partida es clasificar el dato crítico y dejar evidencia de la custodia."
          : "El diagnóstico traduce la iniciativa a esfuerzo, beneficio y talento interno.";

  return {
    title: tech.label,
    service: tech.label,
    sector: sector.label,
    challenge: challenge.label,
    summary: `${route} ${move}`,
  };
}
