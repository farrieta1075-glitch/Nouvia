"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { stations } from "@/lib/content";

const ORIGIN = 0.64;
const SPAN = 0.09;
const GAP = SPAN * 0.5;

function mark(index: number, local: number) {
  return ORIGIN + index * GAP + (local - 0.5) * SPAN;
}

export function TunnelCards({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0">
      {stations.map((station, index) => (
        <Flyer key={station.kicker} station={station} index={index} progress={progress} />
      ))}
    </div>
  );
}

function Flyer({
  station,
  index,
  progress,
}: {
  station: (typeof stations)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const last = index === stations.length - 1;
  const side = index % 2 === 0 ? -1 : 1;
  const locals = [0, 0.14, 0.5, 0.84, 0.94, 1];
  const marks = locals.map((local) => mark(index, local));
  const x = useTransform(progress, marks, last ? ["0vw", "0vw", "0vw", "0vw", "0vw", "0vw"] : [`${side * 3}vw`, `${side * 8}vw`, `${side * 16}vw`, `${side * 28}vw`, `${side * 36}vw`, `${side * 48}vw`]);
  const y = useTransform(progress, marks, ["-10vh", "-6vh", "0vh", "4vh", "4vh", "4vh"]);
  const scale = useTransform(progress, marks, [0.42, 0.52, 0.74, 1, 1, 1.04]);
  const opacity = useTransform(progress, marks, index === 0 ? [1, 1, 1, 1, 1, 0] : last ? [0, 0, 1, 1, 1, 0] : [0, 1, 1, 1, 1, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center" style={{ zIndex: stations.length - index }}>
      <motion.div style={{ x, y, scale, opacity }} className="w-[min(78vw,520px)] rounded-3xl border border-white/35 bg-slate-950/45 px-8 py-8 text-center">
        <p className={`text-xs font-bold uppercase tracking-[0.22em] ${last ? "text-gold-400" : "text-blue-200"}`}>{station.kicker}</p>
        <p className="mt-4 text-2xl font-semibold leading-snug text-white md:text-4xl">
          {station.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </motion.div>
    </div>
  );
}
