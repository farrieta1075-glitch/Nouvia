"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { challenges, sectors, technologies, type SectorId } from "@/lib/content";
import { buildRecommendation } from "@/lib/recommendation";
import { cn } from "@/lib/cn";

type ChallengeId = (typeof challenges)[number]["id"];
type TechId = (typeof technologies)[number]["id"];

export function Diagnostic({
  onBook,
  compact = false,
}: {
  onBook: (lead: { sector: string; service: string; note: string }) => void;
  compact?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [sectorId, setSectorId] = useState<SectorId | null>(null);
  const [challengeId, setChallengeId] = useState<ChallengeId | null>(null);
  const [techId, setTechId] = useState<TechId | null>(null);
  const current = step === 0 ? sectorId : step === 1 ? challengeId : techId;
  const recommendation = sectorId && challengeId && techId ? buildRecommendation({ sectorId, challengeId, techId }) : null;

  const questions = [
    { title: "¿En qué sector opera la empresa?", options: sectors.map((item) => ({ id: item.id, label: item.label, description: item.summary })) },
    { title: "¿Cuál es el desafío principal?", options: challenges.map((item) => ({ id: item.id, label: item.label, description: item.description })) },
    { title: "¿Qué tecnología te interesa?", options: technologies.map((item) => ({ id: item.id, label: item.label, description: item.description })) },
  ];
  const question = questions[Math.min(step, 2)];

  return (
    <div className={cn("rounded-3xl border border-slate-200 bg-white shadow-card", compact ? "p-4" : "p-6")}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{step < 3 ? `Paso ${step + 1} de 3` : "Ruta sugerida"}</p>
      {step < 3 ? (
        <>
          <h3 className={cn("mt-2 font-bold text-slate-900", compact ? "text-lg" : "mt-3 text-2xl")}>{question.title}</h3>
          <div className={cn("grid gap-2", compact ? "mt-3 sm:grid-cols-2" : "mt-4")}>
            {question.options.map((option) => {
              const selected = current === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    if (step === 0) setSectorId(option.id as SectorId);
                    if (step === 1) setChallengeId(option.id as ChallengeId);
                    if (step === 2) setTechId(option.id as TechId);
                  }}
                  className={cn("rounded-xl border px-3 py-2 text-left", selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300")}
                >
                  <span className="block text-sm font-semibold text-slate-900">{option.label}</span>
                  {compact ? null : <span className="mt-1 block text-sm text-slate-500">{option.description}</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <button type="button" className="text-sm text-slate-500" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
              Atrás
            </button>
            <button
              type="button"
              disabled={!current}
              onClick={() => setStep((value) => Math.min(3, value + 1))}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              {step === 2 ? "Ver ruta" : "Continuar"}
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      ) : recommendation ? (
        <div>
          <h3 className="mt-3 text-2xl font-bold text-slate-900">{recommendation.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{recommendation.summary}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white"
              onClick={() => onBook({ sector: recommendation.sector, service: recommendation.service, note: recommendation.summary })}
            >
              Agendar esta ruta
            </button>
            <button type="button" className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700" onClick={() => setStep(0)}>
              Ajustar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
