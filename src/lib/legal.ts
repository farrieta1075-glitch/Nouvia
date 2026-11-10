export type LegalId = "privacy" | "terms" | "custody";

export const legalContent: Record<
  LegalId,
  { title: string; updated: string; intro: string; sections: Array<{ title: string; content: string[] }> }
> = {
  privacy: {
    title: "Política de privacidad",
    updated: "8 de noviembre de 2026",
    intro:
      "Nouvia trata los datos que dejas en este sitio para responder una solicitud de diagnóstico o una conversación comercial.",
    sections: [
      {
        title: "Datos que solicitamos",
        content: [
          "Nombre, correo, empresa y, si los compartes, teléfono, sector, servicio, presupuesto y objetivo.",
          "La recomendación del diagnóstico, cuando llegas desde esa herramienta.",
        ],
      },
      {
        title: "Para qué los usamos",
        content: [
          "Preparar la llamada y dar seguimiento al servicio que indicaste.",
          "No los usamos para vender listas ni para publicidad de terceros.",
        ],
      },
      {
        title: "Derechos",
        content: [
          "Puedes pedir acceso, rectificación, cancelación u oposición desde el formulario, indicando que se trata de una solicitud de privacidad.",
        ],
      },
    ],
  },
  terms: {
    title: "Términos de servicio",
    updated: "15 de enero de 2025",
    intro: "Al usar el sitio de Nouvia aceptas estas condiciones. La descripción de servicios no es una oferta vinculante.",
    sections: [
      {
        title: "Uso del sitio",
        content: ["El uso debe ser lícito. Nouvia puede restringir el acceso si estas condiciones no se respetan."],
      },
      {
        title: "Propiedad",
        content: ["Textos, logotipo y software del sitio pertenecen a Nouvia o se usan con licencia."],
      },
      {
        title: "Jurisdicción",
        content: ["Estas condiciones se rigen por las leyes mexicanas. Las controversias corresponden a los tribunales de Querétaro."],
      },
    ],
  },
  custody: {
    title: "Aviso de custodia",
    updated: "8 de noviembre de 2026",
    intro:
      "Custodia, en Nouvia, es clasificar, resguardar y poder demostrar el acceso a los datos que sostienen la operación. El contrato de cada proyecto precisa el alcance.",
    sections: [
      {
        title: "Principios",
        content: [
          "Clasificar antes de ampliar el acceso.",
          "Dar el mínimo permiso que la función requiere.",
          "Cifrar en tránsito y en reposo en los entornos que administramos.",
          "Dejar evidencia de accesos y cambios relevantes.",
        ],
      },
      {
        title: "Este sitio",
        content: [
          "El formulario guarda la solicitud para el seguimiento comercial. La custodia de sistemas en producción se acuerda por escrito.",
        ],
      },
    ],
  },
};
