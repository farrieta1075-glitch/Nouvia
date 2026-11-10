"use client";

import { BrainCircuit, Hexagon, Lock, Zap } from "lucide-react";

const points = [
  {
    icon: Hexagon,
    title: "Web3 en la operación",
    text: "Trazabilidad, activos y acuerdos viven en la misma arquitectura que el sistema de la empresa.",
  },
  {
    icon: Zap,
    title: "Del piloto a producción",
    text: "Cada iniciativa de IA sale con dueño, dato disponible y una métrica de retorno.",
  },
  {
    icon: BrainCircuit,
    title: "Talento que se queda",
    text: "La formación ejecutiva y de equipos forma parte del encargo, no de un anexo posterior.",
  },
  {
    icon: Lock,
    title: "Custodia con responsable",
    text: "El dato crítico se clasifica, se cifra y deja evidencia de quién accedió.",
  },
];

export function Approach() {
  return (
    <section className="flex min-h-full items-center bg-white py-24 text-slate-900">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Enfoque Nouvia</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
            Más que tecnología,
            <span className="block text-blue-700">inteligencia aplicada.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Consultoría, desarrollo, nube y seguridad siguen en la misma mesa. Web3 entra cuando el acuerdo, el activo o la trazabilidad no deben depender de un solo intermediario.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((point) => (
            <article key={point.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <point.icon className="text-blue-700" size={22} />
              <h3 className="mt-4 font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
