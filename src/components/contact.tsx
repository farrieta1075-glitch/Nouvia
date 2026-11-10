"use client";

import { ChevronDown } from "lucide-react";
import { useActionState, useEffect, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { submitInquiry } from "@/app/actions";
import { budgetOptions, formSectors, formServices } from "@/lib/content";
import type { InquiryField, InquiryState } from "@/lib/inquiry";
import { cn } from "@/lib/cn";

const initialState: InquiryState = { ok: false, message: "" };

export type Lead = { token: number; sector: string; service: string; note: string };

export function Contact({ lead }: { lead: Lead | null }) {
  const [cycle, setCycle] = useState(0);

  return (
    <section className="flex min-h-full items-center bg-slate-50 py-20 text-slate-900">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Tu siguiente movimiento</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Hablemos de la transformación, con contexto.</h2>
        <p className="mt-3 text-slate-600">Empresa, sector, servicio y presupuesto quedan listos para la llamada.</p>
        <div className="mt-6">
          <InquiryForm key={`${lead?.token ?? "base"}-${cycle}`} lead={lead} onReset={() => setCycle((value) => value + 1)} />
        </div>
      </div>
    </section>
  );
}

function InquiryForm({ lead, onReset }: { lead: Lead | null; onReset: () => void }) {
  const [state, action, pending] = useActionState(submitInquiry, initialState);
  const [localLead, setLocalLead] = useState(lead);

  useEffect(() => {
    const onLead = (event: Event) => {
      const detail = (event as CustomEvent<{ sector: string; service: string; note: string }>).detail;
      setLocalLead({ ...detail, token: Date.now() });
    };
    window.addEventListener("nouvia-lead", onLead);
    return () => window.removeEventListener("nouvia-lead", onLead);
  }, []);

  useEffect(() => {
    const errors = state.fieldErrors;
    if (!errors) return;
    const order: InquiryField[] = ["name", "email", "company", "phone", "sector", "service", "budget", "message", "consent"];
    const first = order.find((field) => errors[field]);
    if (first) document.getElementById(first)?.focus();
  }, [state]);

  if (state.ok) {
    return (
      <div id="solicitud" role="status" className="rounded-3xl bg-blue-950 p-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Solicitud registrada</p>
        <h3 className="mt-3 text-2xl font-bold">Gracias. Ya tenemos el contexto para la llamada.</h3>
        <button type="button" onClick={onReset} className="mt-6 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-blue-950">
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const active = localLead ?? lead;
  const errors = state.fieldErrors;

  return (
    <form id="solicitud" action={action} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      {active?.note ? <p className="mb-4 rounded-2xl bg-gold-500/10 px-4 py-3 text-sm leading-6 text-slate-700">{active.note}</p> : null}
      {state.message ? <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.message}</p> : null}
      <div key={active?.token ?? "base"} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="name" label="Nombre" error={errors?.name} required autoComplete="name" placeholder="Nombre y apellidos" />
          <Field id="email" label="Correo corporativo" type="email" error={errors?.email} required autoComplete="email" placeholder="nombre@empresa.com" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="company" label="Empresa" error={errors?.company} required autoComplete="organization" placeholder="Nombre comercial" />
          <Field id="phone" label="Teléfono" error={errors?.phone} autoComplete="tel" placeholder="Opcional" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select id="sector" label="Sector" error={errors?.sector} defaultValue={active?.sector ?? ""}>
            <option value="" disabled>Selecciona un sector</option>
            {formSectors.map((option) => <option key={option}>{option}</option>)}
          </Select>
          <Select id="service" label="Servicio de interés" error={errors?.service} defaultValue={active?.service ?? ""}>
            <option value="" disabled>Selecciona un servicio</option>
            {formServices.map((option) => <option key={option}>{option}</option>)}
          </Select>
        </div>
        <Select id="budget" label="Presupuesto estimado" error={errors?.budget} defaultValue="">
          <option value="" disabled>Selecciona un rango</option>
          {budgetOptions.map((option) => <option key={option}>{option}</option>)}
        </Select>
        <label className="block text-sm font-medium" htmlFor="message">
          Mensaje
          <textarea id="message" name="message" rows={3} placeholder="Proceso, sistema o acuerdo que quieres transformar." className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
        </label>
        <input type="hidden" name="diagnostic" value={active?.note ?? ""} />
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input id="consent" name="consent" type="checkbox" className="mt-1 accent-blue-700" />
          <span>Acepto el aviso de privacidad y el tratamiento de estos datos para atender la solicitud.</span>
        </label>
        {errors?.consent ? <p className="text-sm text-rose-700">{errors.consent}</p> : null}
        <button type="submit" disabled={pending} className="rounded-lg bg-blue-700 py-3 text-sm font-bold text-white disabled:opacity-50">
          {pending ? "Enviando…" : "Solicitar diagnóstico"}
        </button>
      </div>
    </form>
  );
}

function Field({ id, label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; error?: string }) {
  return (
    <label className="block text-sm font-medium" htmlFor={id}>
      {label}
      <input id={id} name={id} className={cn("mt-2 w-full rounded-xl border px-4 py-3 text-sm", error ? "border-rose-400" : "border-slate-200")} {...props} />
      {error ? <span className="mt-1 block text-xs font-normal text-rose-700">{error}</span> : null}
    </label>
  );
}

function Select({
  id,
  label,
  error,
  defaultValue,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  defaultValue?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-medium" htmlFor={id}>
      {label}
      <span className="relative mt-2 block">
        <select id={id} name={id} defaultValue={defaultValue ?? ""} className={cn("w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm", error ? "border-rose-400" : "border-slate-200")}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </span>
      {error ? <span className="mt-1 block text-xs font-normal text-rose-700">{error}</span> : null}
    </label>
  );
}
