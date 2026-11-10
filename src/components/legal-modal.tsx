"use client";

import { X } from "lucide-react";
import { legalContent, type LegalId } from "@/lib/legal";

export function LegalModal({ id, onClose }: { id: LegalId; onClose: () => void }) {
  const document = legalContent[id];
  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-slate-950/70" aria-label="Cerrar aviso" onClick={onClose} />
      <article className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 text-slate-700">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Cerrar">
          <X size={18} />
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Actualizado {document.updated}</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">{document.title}</h2>
        <p className="mt-4 leading-7">{document.intro}</p>
        <div className="mt-6 space-y-5">
          {document.sections.map((section) => (
            <section key={section.title}>
              <h3 className="font-semibold text-slate-900">{section.title}</h3>
              {section.content.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-sm leading-6">{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
