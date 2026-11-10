"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Approach } from "@/components/approach";
import { Contact, type Lead } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Quadrant } from "@/components/quadrant";
import { TunnelCards } from "@/components/tunnel";
import { stations } from "@/lib/content";
import { JOURNEY_VH, stops } from "@/lib/scroll";
import { cn } from "@/lib/cn";

export function Journey({ lead }: { lead: Lead | null }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState<"hero" | "services" | "enfoque" | "tunnel" | "contact">("hero");
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15], [1, 1, 0]);
  const servicesOpacity = useTransform(scrollYProgress, [0.1, 0.16, 0.34, 0.42], [0, 1, 1, 0]);
  const enfoqueOpacity = useTransform(scrollYProgress, [0.38, 0.46, 0.54, 0.62], [0, 1, 1, 0]);
  const tunnelOpacity = useTransform(scrollYProgress, [0.58, 0.64, 0.9, 0.96], [0, 1, 1, 0]);
  const contactOpacity = useTransform(scrollYProgress, [0.9, 0.97], [0, 1]);

  const toneRef = useRef<"light" | "dark">("dark");
  const coverRef = useRef<"snap" | "tunnel" | "off">("off");
  const [cover, setCover] = useState<"snap" | "tunnel" | "off">("off");
  const publish = (value: number) => {
    if (coverRef.current === "tunnel" && value >= 0.63) {
      coverRef.current = "off";
      setCover("off");
    }
    const locked = coverRef.current === "snap" || coverRef.current === "tunnel";
    const next = locked ? "tunnel" : value < 0.12 ? "hero" : value < 0.38 ? "services" : value < 0.6 ? "enfoque" : value < 0.92 ? "tunnel" : "contact";
    setActive((current) => (current === next ? current : next));
    const light = !locked && ((value >= 0.44 && value < 0.61) || value >= 0.945);
    const tone = light ? "light" : "dark";
    if (toneRef.current === tone) return;
    toneRef.current = tone;
    window.dispatchEvent(new CustomEvent("nouvia-tone", { detail: tone }));
  };

  useEffect(() => {
    const onCover = (event: Event) => {
      const next = (event as CustomEvent<"snap" | "tunnel" | "off">).detail;
      coverRef.current = next === "snap" || next === "tunnel" ? next : "off";
      setCover(coverRef.current);
      publish(scrollYProgress.get());
    };
    window.addEventListener("nouvia-cover", onCover);
    return () => window.removeEventListener("nouvia-cover", onCover);
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", publish);
  useEffect(() => {
    publish(scrollYProgress.get());
  }, [scrollYProgress]);

  if (reduce) {
    return (
      <div>
        <Hero />
        <Quadrant />
        <Approach />
        <section className="bg-slate-950 px-4 py-24 text-white">
          <div className="mx-auto grid max-w-3xl gap-6">
            {stations.map((station) => (
              <article key={station.kicker} className="rounded-3xl border border-white/30 px-8 py-8 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">{station.kicker}</p>
                <p className="mt-4 text-2xl font-semibold">{station.lines.join(" ")}</p>
              </article>
            ))}
          </div>
        </section>
        <Contact lead={lead} />
      </div>
    );
  }

  return (
    <section ref={ref} id="recorrido" className="relative bg-slate-950" style={{ height: `${JOURNEY_VH}vh` }}>
      {(Object.keys(stops) as Array<keyof typeof stops>).map((id) => (
        <div key={id} id={id} className="pointer-events-none absolute left-0 h-px w-px" style={{ top: `${stops[id] * (JOURNEY_VH - 100)}vh` }} />
      ))}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ opacity: cover === "off" ? heroOpacity : 0 }} className={cn("absolute inset-0", cover === "off" && active === "hero" ? "" : "pointer-events-none")}>
          <Hero />
        </motion.div>
        <motion.div style={{ opacity: cover === "off" ? servicesOpacity : 0 }} className={cn("absolute inset-0", cover === "off" && active === "services" ? "" : "pointer-events-none")}>
          <Quadrant />
        </motion.div>
        <motion.div style={{ opacity: cover === "off" ? enfoqueOpacity : 0 }} className={cn("absolute inset-0 overflow-y-auto bg-white", cover === "off" && active === "enfoque" ? "" : "pointer-events-none")}>
          <Approach />
        </motion.div>
        <motion.div style={{ opacity: cover === "off" ? tunnelOpacity : 1 }} className={cn("absolute inset-0 bg-slate-950", cover !== "snap" && (cover === "tunnel" || active === "tunnel") ? "" : "pointer-events-none")}>
          <TunnelCards progress={scrollYProgress} />
        </motion.div>
        <motion.div style={{ opacity: cover === "off" ? contactOpacity : 0 }} className={cn("absolute inset-0 overflow-y-auto bg-slate-50", cover === "off" && active === "contact" ? "" : "pointer-events-none")}>
          <Contact lead={lead} />
        </motion.div>
        {cover === "snap" ? <div className="absolute inset-0 z-10 bg-slate-950" /> : null}
      </div>
    </section>
  );
}
