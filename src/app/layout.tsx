import type { Metadata } from "next";
import type { ReactNode } from "react";
import { brand } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nouvia | IA, Web3 y tecnología que opera",
  description: brand.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
