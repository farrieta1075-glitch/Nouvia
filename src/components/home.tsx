"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { CookieConsent } from "@/components/cookie";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Intro } from "@/components/intro";
import { Journey } from "@/components/journey";
import { LegalModal } from "@/components/legal-modal";
import type { LegalId } from "@/lib/legal";
import { goTo } from "@/lib/scroll";

export function Home() {
  const [intro, setIntro] = useState(true);
  const [legal, setLegal] = useState<LegalId | null>(null);
  const closeIntro = useCallback(() => setIntro(false), []);

  return (
    <>
      <AnimatePresence>{intro ? <Intro onDone={closeIntro} /> : null}</AnimatePresence>
      <Header />
      <main>
        <Journey lead={null} />
      </main>
      <Footer
        onLegal={setLegal}
        onService={(id) => {
          window.dispatchEvent(new CustomEvent("nouvia-open-service", { detail: id }));
          void goTo("servicios");
        }}
      />
      <CookieConsent onPrivacy={() => setLegal("privacy")} />
      {legal ? <LegalModal id={legal} onClose={() => setLegal(null)} /> : null}
    </>
  );
}
