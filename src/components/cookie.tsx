"use client";

import { Cookie, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function CookieConsent({ onPrivacy }: { onPrivacy: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("nouvia-fusion-cookie")) {
      const timer = window.setTimeout(() => setVisible(true), 900);
      return () => window.clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const choose = (value: string) => {
    localStorage.setItem("nouvia-fusion-cookie", value);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur md:flex-row md:items-center">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <span className="rounded-lg bg-blue-100 p-2 text-blue-700"><Cookie size={18} /></span>
            <h2 className="text-lg font-bold text-slate-900">Cookies y privacidad</h2>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            Usamos cookies técnicas para recordar esta elección. No activamos analítica de terceros desde este aviso.
          </p>
          <button type="button" onClick={onPrivacy} className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500 underline hover:text-blue-700">
            <ShieldCheck size={12} /> Ver política completa
          </button>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => choose("necessary")} className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600">
            Solo necesarias
          </button>
          <button type="button" onClick={() => choose("accepted")} className="rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
