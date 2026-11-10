"use client";

import type { LegalId } from "@/lib/legal";

const serviceLinks = [
  { id: "web3", label: "DApps y Web3" },
  { id: "ia", label: "Inteligencia artificial" },
  { id: "dev", label: "Desarrollo a la medida" },
  { id: "cloud", label: "Nube y custodia" },
];

export function Footer({ onLegal, onService }: { onLegal: (id: LegalId) => void; onService: (id: string) => void }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-14 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <img src="/logo.png" alt="Nouvia" className="h-12 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Tecnología con inteligencia artificial aplicada, Web3 sectorial y custodia de la infraestructura. Querétaro, México.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-white">Servicios</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {serviceLinks.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => onService(item.id)} className="hover:text-blue-300">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Legal</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><button type="button" onClick={() => onLegal("privacy")} className="hover:text-blue-300">Política de privacidad</button></li>
            <li><button type="button" onClick={() => onLegal("terms")} className="hover:text-blue-300">Términos de servicio</button></li>
            <li><button type="button" onClick={() => onLegal("custody")} className="hover:text-blue-300">Aviso de custodia</button></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-4 text-xs text-slate-500 sm:px-6 lg:px-8">© {new Date().getFullYear()} Nouvia. Todos los derechos reservados.</p>
    </footer>
  );
}
