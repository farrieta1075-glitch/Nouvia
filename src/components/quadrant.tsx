"use client";

import { useEffect, useState } from "react";
import { services } from "@/lib/content";
import { cn } from "@/lib/cn";

const cells = services;

function tracks(index: number, boost: number, rest: number) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const cols = [0, 1, 2].map((item) => (item === col ? boost : rest));
  const rows = [0, 1, 2].map((item) => (item === row ? boost : rest));
  return { gridTemplateColumns: cols.map((value) => `${value}fr`).join(" "), gridTemplateRows: rows.map((value) => `${value}fr`).join(" ") };
}

export function Quadrant() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const apply = () => setWide(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const index = cells.findIndex((service) => service.id === id);
      if (index >= 0) setHovered(index);
    };
    window.addEventListener("nouvia-open-service", onOpen);
    return () => window.removeEventListener("nouvia-open-service", onOpen);
  }, []);

  const layout = hovered !== null ? tracks(hovered, 2.05, 0.72) : undefined;

  return (
    <section className="flex h-full flex-col bg-slate-950 text-white">
      <div className="px-4 pb-3 pt-20 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Servicios</h2>
      </div>
      <div
        className="grid min-h-0 flex-1 gap-px bg-white/10"
        style={wide && layout ? { ...layout, transition: "grid-template-columns 0.45s ease, grid-template-rows 0.45s ease" } : { gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gridTemplateRows: "repeat(3, minmax(0, 1fr))" }}
        onMouseLeave={() => setHovered(null)}
      >
        {cells.map((service, index) => {
          const web3 = service.id === "web3";
          const live = hovered === index;
          return (
            <article
              key={service.id}
              className={cn("relative min-h-0 overflow-hidden", live ? "z-10" : "z-0")}
              onMouseEnter={() => setHovered(index)}
              onClick={() => {
                if (window.matchMedia("(hover: none)").matches) setHovered((current) => (current === index ? null : index));
              }}
            >
              {live ? (
                <video
                  key={`${service.id}-live`}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={service.video}
                  poster={service.image}
                  muted
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              )}
              <span className={cn("pointer-events-none absolute inset-0 transition", live ? "bg-slate-950/35" : "bg-slate-950/68")} />
              {web3 ? <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gold-500" /> : null}
              <span className="pointer-events-none relative flex h-full flex-col justify-end p-3 sm:p-4">
                <span className={cn("text-[10px] font-semibold uppercase tracking-[0.16em]", web3 ? "text-gold-400" : "text-blue-200")}>{service.enhancedLabel}</span>
                <span className="mt-1 block text-sm font-bold sm:text-base md:text-lg">{service.title}</span>
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
