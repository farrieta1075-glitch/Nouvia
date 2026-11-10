"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const ink = "rgba(214, 226, 240, 0.92)";

const seeds: [number, number][][] = [
  [[-130, -108], [-130, -168], [-470, -168], [-470, -348]],
  [[-40, -108], [-40, -150], [70, -150], [70, -250], [70, -348]],
  [[50, -108], [50, -128], [250, -128], [250, -230], [470, -230], [470, -348]],
  [[145, -108], [145, -196], [390, -196], [390, -348]],
  [[-145, 108], [-145, 176], [-490, 176], [-490, 348]],
  [[-35, 108], [-35, 154], [80, 154], [80, 268], [80, 348]],
  [[55, 108], [55, 136], [270, 136], [270, 248], [500, 248], [500, 348]],
  [[150, 108], [150, 210], [410, 210], [410, 348]],
  [[-226, -42], [-330, -42], [-330, -210], [-620, -210]],
  [[-226, 6], [-286, 6], [-286, 130], [-540, 130], [-540, 300]],
  [[-226, 46], [-430, 46], [-430, 220], [-630, 220]],
  [[226, -46], [330, -46], [330, -200], [560, -200], [560, -348]],
  [[226, 4], [370, 4], [370, 150], [630, 150]],
  [[226, 48], [290, 48], [290, 210], [500, 210], [500, 348]],
];

function offsetPath(points: [number, number][], distance: number) {
  const segments = [];
  for (let index = 0; index < points.length - 1; index += 1) {
    const [x0, y0] = points[index];
    const [x1, y1] = points[index + 1];
    const dx = Math.sign(x1 - x0);
    const dy = Math.sign(y1 - y0);
    const nx = dy * distance;
    const ny = -dx * distance;
    segments.push({ x0: x0 + nx, y0: y0 + ny, x1: x1 + nx, y1: y1 + ny, dx, dy });
  }
  const routed: [number, number][] = [[segments[0].x0, segments[0].y0]];
  for (let index = 0; index < segments.length - 1; index += 1) {
    const current = segments[index];
    const next = segments[index + 1];
    if (current.dx !== 0 && next.dy !== 0) routed.push([next.x0, current.y0]);
    else if (current.dy !== 0 && next.dx !== 0) routed.push([current.x0, next.y0]);
    else routed.push([next.x0, next.y0]);
  }
  const last = segments[segments.length - 1];
  routed.push([last.x1, last.y1]);
  return routed;
}

function rounded(points: [number, number][]) {
  const radius = 16;
  let path = `M${points[0][0]} ${points[0][1]}`;
  for (let index = 1; index < points.length - 1; index += 1) {
    const [x0, y0] = points[index - 1];
    const [x1, y1] = points[index];
    const [x2, y2] = points[index + 1];
    const ix = Math.sign(x1 - x0);
    const iy = Math.sign(y1 - y0);
    const ox = Math.sign(x2 - x1);
    const oy = Math.sign(y2 - y1);
    const room = Math.min(Math.abs(x1 - x0) + Math.abs(y1 - y0), Math.abs(x2 - x1) + Math.abs(y2 - y1)) / 2;
    const bend = Math.min(radius, Math.max(0, room - 0.5));
    if (bend < 1) {
      path += ` L${x1} ${y1}`;
      continue;
    }
    const sweep = ix * oy - iy * ox > 0 ? 1 : 0;
    path += ` L${x1 - ix * bend} ${y1 - iy * bend} A${bend} ${bend} 0 0 ${sweep} ${x1 + ox * bend} ${y1 + oy * bend}`;
  }
  const end = points[points.length - 1];
  path += ` L${end[0]} ${end[1]}`;
  return path;
}

const traces = seeds.flatMap((seed, seedIndex) =>
  [-18, 0, 18].map((distance, lane) => {
    const points = distance === 0 ? seed : offsetPath(seed, distance);
    return {
      d: rounded(points),
      delay: 0.12 + (seedIndex % 7) * 0.06 + lane * 0.04,
      start: points[0],
      pads: points.slice(1),
    };
  }),
);

export function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(onDone, reduce ? 0 : 4400);
    return () => window.clearTimeout(timer);
  }, [onDone, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-hidden bg-slate-950"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: reduce ? 0.01 : 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.16),transparent_58%)]" />
      {reduce ? (
        <div className="flex h-full items-center justify-center">
          <img src="/logo.png" alt="" className="h-24 w-auto brightness-0 invert" />
        </div>
      ) : (
        <>
          <motion.div
            className="absolute inset-0"
            initial={{ filter: "blur(0px)", opacity: 1 }}
            animate={{ filter: "blur(20px)", opacity: 0 }}
            transition={{ delay: 2.5, duration: 1.05, ease: "easeInOut" }}
          >
            <svg className="h-full w-full" viewBox="-640 -360 1280 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect x="-210" y="-92" width="420" height="184" rx="16" fill="#070d18" stroke={ink} strokeWidth="1.6" />
              <rect x="-132" y="-46" width="264" height="92" rx="8" fill="#10192b" stroke={ink} strokeWidth="1.15" />
              <circle cx="-178" cy="-64" r="5" fill="none" stroke={ink} strokeWidth="1.4" />
              {traces.map((trace) => {
                const [x, y] = trace.start;
                const vertical = Math.abs(x) < 210;
                const pin = vertical
                  ? { x: x - 3, y: y < 0 ? y : 92, width: 6, height: y < 0 ? -92 - y : y - 92 }
                  : { x: x < 0 ? x : 210, y: y - 3, width: x < 0 ? -210 - x : x - 210, height: 6 };
                return <rect key={`pin-${trace.d}`} {...pin} rx="1" fill={ink} />;
              })}
              {traces.map((trace) => (
                <g key={trace.d}>
                  <motion.path
                    d={trace.d}
                    fill="none"
                    stroke={ink}
                    strokeWidth="1.5"
                    strokeLinecap="butt"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.85, delay: trace.delay, ease: [0.33, 0, 0.2, 1] }}
                  />
                  {trace.pads.map(([x, y], index) => (
                    <motion.circle
                      key={`${x}-${y}-${index}`}
                      cx={x}
                      cy={y}
                      r="3.1"
                      fill={ink}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: trace.delay + 0.28 + index * 0.32 }}
                    />
                  ))}
                </g>
              ))}
            </svg>
            <img src="/logo.png" alt="" className="absolute left-1/2 top-1/2 h-10 w-auto -translate-x-1/2 -translate-y-1/2 brightness-0 invert" />
          </motion.div>
          <motion.img
            src="/logo.png"
            alt=""
            className="absolute left-1/2 top-1/2 z-10 h-28 w-auto"
            initial={{ opacity: 0, scale: 0.38, x: "-50%", y: "-50%", filter: "brightness(0) invert(1)" }}
            animate={{ opacity: 1, scale: 1.7, x: "-50%", y: "-50%", filter: "brightness(0) invert(1) brightness(1.35)" }}
            transition={{ delay: 2.65, duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      )}
      <button type="button" onClick={onDone} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-sm text-slate-400 underline-offset-4 hover:text-white hover:underline">
        Entrar
      </button>
    </motion.div>
  );
}
