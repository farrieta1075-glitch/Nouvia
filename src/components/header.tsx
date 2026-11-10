"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { goTo, type StopId } from "@/lib/scroll";
import { cn } from "@/lib/cn";

export function Header({ light = false }: { light?: boolean }) {
  const [tone, setTone] = useState<"light" | "dark">(light ? "light" : "dark");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onTone = (event: Event) => {
      const next = (event as CustomEvent<"light" | "dark">).detail;
      if (next === "light" || next === "dark") setTone(next);
    };
    window.addEventListener("nouvia-tone", onTone);
    return () => window.removeEventListener("nouvia-tone", onTone);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = open || tone === "light";
  const links = nav.filter((item) => item.href !== "#contacto");

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", solid ? "bg-white/95 py-2 shadow-md backdrop-blur" : "bg-transparent py-4")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center" onClick={(event) => { event.preventDefault(); setOpen(false); void goTo("inicio"); }}>
          <img src="/logo.png" alt="Nouvia" className={cn("h-12 w-auto object-contain sm:h-14", solid ? "" : "brightness-0 invert")} />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {links.map((item) => (
            <a key={item.href} href={item.href} onClick={(event) => { event.preventDefault(); void goTo(item.href.slice(1) as StopId); }} className={cn("text-sm font-medium uppercase tracking-wide transition hover:text-blue-300", solid ? "text-slate-700" : "text-white")}>
              {item.label}
            </a>
          ))}
          <a href="#contacto" onClick={(event) => { event.preventDefault(); void goTo("contacto"); }} className="rounded-full bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-800">
            Contacto
          </a>
        </nav>
        <button type="button" className={cn("inline-flex h-11 w-11 items-center justify-center md:hidden", solid ? "text-slate-800" : "text-white")} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((item) => (
              <a key={item.href} href={item.href} onClick={(event) => { event.preventDefault(); setOpen(false); void goTo(item.href.slice(1) as StopId); }} className="rounded-xl px-3 py-3 text-base text-slate-800">
                {item.label}
              </a>
            ))}
            <a href="#contacto" onClick={(event) => { event.preventDefault(); setOpen(false); void goTo("contacto"); }} className="mt-2 rounded-full bg-blue-900 px-4 py-3 text-center text-sm font-semibold text-white">
              Contacto
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
