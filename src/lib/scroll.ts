export const JOURNEY_VH = 560;

export const stops = {
  inicio: 0,
  servicios: 0.16,
  enfoque: 0.46,
  contacto: 0.64,
} as const;

export type StopId = keyof typeof stops;

function journeyRange() {
  const section = document.getElementById("recorrido");
  if (!section) return null;
  const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
  return { start: section.offsetTop, distance };
}

export function journeyY(progress: number) {
  const range = journeyRange();
  if (!range) return 0;
  return range.start + range.distance * progress;
}

function frame(to: number, ms: number, token: number) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  const from = window.scrollY;
  const start = performance.now();
  return new Promise<void>((resolve) => {
    const tick = (now: number) => {
      if (token !== journeyRun) {
        root.style.scrollBehavior = previous;
        resolve();
        return;
      }
      const t = Math.min(1, (now - start) / ms);
      const eased = t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
      window.scrollTo(0, from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
      else {
        root.style.scrollBehavior = previous;
        resolve();
      }
    };
    requestAnimationFrame(tick);
  });
}

let journeyRun = 0;

function cover(phase: "snap" | "tunnel" | "off") {
  window.dispatchEvent(new CustomEvent("nouvia-cover", { detail: phase }));
}

async function snap(progress: number, token: number) {
  const range = journeyRange();
  if (!range) return;
  const target = range.start + range.distance * progress;
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  const from = window.scrollY;
  const steps = 28;
  for (let step = 1; step <= steps; step += 1) {
    if (token !== journeyRun) break;
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        window.scrollTo(0, from + ((target - from) * step) / steps);
        resolve();
      });
    });
  }
  root.style.scrollBehavior = previous;
}

export async function goTo(id: StopId) {
  const token = ++journeyRun;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (id !== "contacto") cover("off");
  if (id === "contacto") {
    if (reduce) {
      window.scrollTo(0, journeyY(0.97));
      return;
    }
    cover("snap");
    await snap(stops.contacto, token);
    if (token !== journeyRun) return;
    cover("tunnel");
    await frame(journeyY(0.97), 7800, token);
    if (token === journeyRun) cover("off");
    return;
  }
  const target = journeyY(stops[id]);
  if (reduce) {
    window.scrollTo(0, target);
    return;
  }
  await frame(target, id === "inicio" ? 500 : 800, token);
}
