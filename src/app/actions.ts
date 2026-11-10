"use server";

import { budgetOptions, formSectors, formServices } from "@/lib/content";
import type { InquiryField, InquiryState } from "@/lib/inquiry";
import { saveInquiry } from "@/lib/inquiries";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function singleLine(value: string, min: number, max: number) {
  return value.length >= min && value.length <= max && !/[\u0000-\u001F\u007F]/.test(value);
}

export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const name = text(formData, "name");
  const email = text(formData, "email").toLowerCase();
  const company = text(formData, "company");
  const phone = text(formData, "phone");
  const sector = text(formData, "sector");
  const service = text(formData, "service");
  const budget = text(formData, "budget");
  const message = text(formData, "message");
  const diagnostic = text(formData, "diagnostic").slice(0, 4000);
  const consent = formData.get("consent") === "on";
  const fieldErrors: Partial<Record<InquiryField, string>> = {};

  if (!singleLine(name, 2, 120)) fieldErrors.name = "Escribe el nombre de contacto.";
  if (!singleLine(email, 6, 160) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Ingresa un correo válido.";
  }
  if (!singleLine(company, 2, 160)) fieldErrors.company = "Indica la empresa.";
  if (phone && !singleLine(phone, 7, 30)) fieldErrors.phone = "Revisa el teléfono.";
  if (!formSectors.includes(sector as (typeof formSectors)[number])) fieldErrors.sector = "Selecciona un sector.";
  if (!formServices.includes(service as (typeof formServices)[number])) fieldErrors.service = "Selecciona un servicio.";
  if (!budgetOptions.includes(budget as (typeof budgetOptions)[number])) fieldErrors.budget = "Selecciona un presupuesto.";
  if (message.length > 2000) fieldErrors.message = "El mensaje es demasiado largo.";
  if (!consent) fieldErrors.consent = "Necesitamos tu consentimiento para atender la solicitud.";

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, message: "Revisa los campos marcados.", fieldErrors };
  }

  try {
    const result = await saveInquiry({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      email,
      company,
      phone,
      sector,
      service,
      budget,
      message,
      diagnostic,
    });
    if (result === "limited") {
      return { ok: false, message: "Ya registramos una solicitud reciente con este correo. Espera un momento." };
    }
  } catch {
    return { ok: false, message: "No pudimos registrar la solicitud. Intenta de nuevo." };
  }

  return { ok: true, message: "Solicitud registrada." };
}
