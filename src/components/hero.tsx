"use client";

import { ArrowRight, CircuitBoard } from "lucide-react";
import { goTo } from "@/lib/scroll";

export function Hero() {
  return (
    <section className="relative flex h-full min-h-screen items-center overflow-hidden pt-28">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/55" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-24 text-center sm:px-6">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-100 backdrop-blur">
          <CircuitBoard size={14} />
          Visión estratégica · Web3 e inteligencia artificial
        </div>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg md:text-6xl">
          Transformando empresas con
          <span className="mt-2 block bg-gradient-to-r from-blue-300 to-indigo-200 bg-clip-text text-transparent">
            inteligencia artificial y DApps Web3
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-lg font-light leading-relaxed text-slate-100 md:text-2xl">
          Consultoría, desarrollo, nube, custodia y descentralización para industria, campo, comercio y servicios. De la prueba de concepto a la operación.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button type="button" onClick={() => goTo("servicios")} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-bold text-white shadow-xl shadow-blue-950/40 transition hover:-translate-y-0.5 hover:bg-blue-500">
            Explorar servicios
            <ArrowRight size={18} />
          </button>
          <button type="button" onClick={() => goTo("contacto")} className="rounded-lg border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20">
            Agendar diagnóstico
          </button>
        </div>
      </div>
    </section>
  );
}
