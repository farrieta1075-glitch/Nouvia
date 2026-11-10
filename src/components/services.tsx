"use client";

import { ArrowRight, CheckCircle2, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { sectors, services, type SectorId, type Service } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Services({
  selected,
  onSelect,
  onRequest,
}: {
  selected: Service | null;
  onSelect: (service: Service | null) => void;
  onRequest: (service: Service, sector?: string) => void;
}) {
  return (
    <section id="servicios" className="relative z-20 rounded-t-[2.5rem] bg-slate-50 py-24 text-slate-900 shadow-[0_-30px_80px_rgba(0,0,0,0.35)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-600">Nuestras capacidades</h2>
          <h3 className="mt-2 text-3xl font-bold md:text-4xl">Soluciones integrales, con Web3 en primer plano</h3>
          <p className="mt-4 text-lg text-slate-600">
            La misma cobertura de consultoría, sistemas, datos, seguridad y automatización. La diferencia es que la descentralización ya no es un anexo.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onClick={onSelect} />
          ))}
        </div>
      </div>
      {selected ? <ServiceModal service={selected} onClose={() => onSelect(null)} onRequest={onRequest} /> : null}
    </section>
  );
}

function ServiceCard({ service, onClick }: { service: Service; onClick: (service: Service) => void }) {
  const web3 = service.id === "web3";
  return (
    <button
      type="button"
      onClick={() => onClick(service)}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border bg-white p-6 text-left shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl",
        web3 ? "border-gold-500/50 lg:col-span-2" : "border-slate-100",
      )}
    >
      <span className={cn("absolute inset-x-0 top-0 h-1", web3 ? "bg-gold-500" : "bg-gradient-to-r from-slate-200 to-slate-100 group-hover:from-blue-500 group-hover:to-indigo-400")} />
      {web3 ? <span className="mb-4 w-fit rounded-full bg-gold-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-500">Prioridad Web3</span> : null}
      <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">{service.description}</p>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Servicios base</p>
        <ul className="mt-2 space-y-1">
          {service.core.slice(0, 2).map((feature) => (
            <li key={feature} className="flex items-start text-sm text-slate-600">
              <ArrowRight size={14} className="mr-2 mt-1 shrink-0 text-slate-400" />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={cn("-mx-6 -mb-6 mt-5 border-t px-6 py-5", web3 ? "border-gold-500/20 bg-gold-500/10" : "border-blue-100 bg-blue-50/70")}>
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={15} className={web3 ? "text-gold-500" : "text-blue-700"} />
          <span className={cn("text-[11px] font-bold uppercase tracking-wide", web3 ? "text-gold-500" : "text-blue-800")}>{service.enhancedLabel}</span>
        </div>
        <p className="text-sm text-slate-700">{service.enhanced[0]}</p>
      </div>
    </button>
  );
}

function ServiceModal({
  service,
  onClose,
  onRequest,
}: {
  service: Service;
  onClose: () => void;
  onRequest: (service: Service, sector?: string) => void;
}) {
  const [sectorId, setSectorId] = useState<SectorId>("agro");
  const sector = sectors.find((item) => item.id === sectorId) ?? sectors[0];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button type="button" aria-label="Cerrar detalle" className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 z-20 rounded-full bg-black/30 p-2 text-white" aria-label="Cerrar">
          <X size={20} />
        </button>
        <div className="relative h-52">
          <img src={service.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
          <h3 className="absolute bottom-6 left-8 text-3xl font-bold text-white">{service.title}</h3>
        </div>
        <div className="grid gap-8 p-8 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <p className="leading-relaxed text-slate-600">{service.details}</p>
            {service.id === "web3" ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold-500">Sector</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sectors.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSectorId(item.id)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm",
                        sectorId === item.id ? "border-gold-500 bg-gold-500/10 text-slate-900" : "border-slate-200 text-slate-600",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <ul className="mt-4 space-y-2">
                  {sector.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ul className="space-y-3 rounded-xl bg-slate-50 p-5">
                {service.core.map((feature) => (
                  <li key={feature} className="flex gap-3 text-slate-700">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-blue-600" size={18} />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside className="rounded-xl bg-blue-950 p-6 text-white">
            <div className="mb-4 flex items-center gap-2 text-blue-200">
              <Sparkles size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">{service.enhancedLabel}</span>
            </div>
            <ul className="space-y-3">
              {service.enhanced.map((feature) => (
                <li key={feature} className="border-l-2 border-blue-400 pl-3 text-sm text-blue-100">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onRequest(service, service.id === "web3" ? sector.label : undefined)}
              className="mt-8 w-full rounded-lg bg-white py-3 text-sm font-bold text-blue-950"
            >
              Solicitar este servicio
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
