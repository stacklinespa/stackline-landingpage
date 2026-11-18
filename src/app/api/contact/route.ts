import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/data/site";
import {
  buildContactSummary,
  buildMailtoUrl,
  getProjectTypeLabel,
  validateContactPayload,
} from "@/lib/contact-validation";

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "No pudimos leer los datos enviados. Intenta nuevamente.",
      },
      { status: 400 },
    );
  }

  const validation = validateContactPayload(rawBody);
  if (!validation.valid) {
    return NextResponse.json(
      {
        status: "error",
        message: "Revisa los campos marcados antes de enviar.",
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  if (validation.isSpam) {
    return NextResponse.json({ status: "sent" }, { status: 200 });
  }

  const { data } = validation;
  const summary = buildContactSummary(data);
  const mailtoUrl = buildMailtoUrl(data, SITE_CONFIG.email);
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      {
        status: "fallback",
        mailtoUrl,
        summary,
      },
      { status: 200 },
    );
  }

  const fromAddress =
    process.env.CONTACT_FROM_EMAIL?.trim() || "Stackline Web <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [SITE_CONFIG.email],
        reply_to: data.email,
        subject: `[Stackline Web] ${getProjectTypeLabel(data.projectType)} — ${data.company || data.name}`,
        text: summary,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "El envío automático no respondió en este momento. Puedes enviarnos el resumen en 1 clic por correo.",
          mailtoUrl,
          summary,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ status: "sent" }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message:
          "Hubo un problema de conexión al enviar. Usa el botón directo para enviar tu requerimiento por correo.",
        mailtoUrl,
        summary,
      },
      { status: 502 },
    );
  }
}
