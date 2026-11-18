"use client";

import { useState, type FormEvent } from "react";
import {
  Check,
  Clock,
  Copy,
  EnvelopeSimple,
  PaperPlaneTilt,
  WarningCircle,
} from "@phosphor-icons/react";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PillButton } from "@/components/ui/PillButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SITE_CONFIG } from "@/data/site";
import {
  PROJECT_TYPE_OPTIONS,
  buildContactSummary,
  buildMailtoUrl,
  validateContactPayload,
  type ContactFieldErrors,
  type ProjectTypeId,
} from "@/lib/contact-validation";

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "fallback"; mailtoUrl: string; summary: string }
  | { kind: "error"; message: string; mailtoUrl?: string; summary?: string };

export function ContactSection() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState<ProjectTypeId>("sistema-interno");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  async function copyText(text: string, onDone: (val: boolean) => void) {
    try {
      await navigator.clipboard.writeText(text);
      onDone(true);
      window.setTimeout(() => onDone(false), 2400);
    } catch {
      onDone(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const rawPayload = { name, company, email, projectType, message, website };
    const validation = validateContactPayload(rawPayload);

    if (!validation.valid) {
      setFieldErrors(validation.fieldErrors);
      setSubmitState({ kind: "idle" });
      return;
    }

    setSubmitState({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rawPayload),
      });

      const body = await response.json();

      if (response.ok && body.status === "sent") {
        setSubmitState({ kind: "sent" });
        setName("");
        setCompany("");
        setEmail("");
        setMessage("");
        setWebsite("");
        return;
      }

      if (response.ok && body.status === "fallback") {
        setSubmitState({
          kind: "fallback",
          mailtoUrl: body.mailtoUrl,
          summary: body.summary,
        });
        return;
      }

      if (body.fieldErrors) {
        setFieldErrors(body.fieldErrors);
      }

      setSubmitState({
        kind: "error",
        message:
          body.message ||
          "No pudimos completar el envío automático. Puedes escribirnos directo por correo.",
        mailtoUrl: body.mailtoUrl || buildMailtoUrl(validation.data, SITE_CONFIG.email),
        summary: body.summary || buildContactSummary(validation.data),
      });
    } catch {
      setSubmitState({
        kind: "error",
        message:
          "Sin conexión con el servidor en este momento. Tu mensaje sigue intacto: puedes enviarlo en 1 clic por correo.",
        mailtoUrl: buildMailtoUrl(validation.data, SITE_CONFIG.email),
        summary: buildContactSummary(validation.data),
      });
    }
  }

  return (
    <section id="contacto" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left direct contact column */}
          <MotionReveal className="lg:col-span-5">
            <SectionEyebrow>Conversemos</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy sm:text-4xl lg:leading-[1.08]">
              Cuéntanos qué requiere tu operación.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              Ya sea un sistema empresarial interno desde cero o una nueva plataforma web,
              revisamos tu requerimiento y te respondemos directo desde ingeniería.
            </p>

            <div className="mt-7 flex items-center gap-2.5 text-sm font-medium text-navy">
              <Clock size={18} weight="light" className="text-accent" />
              <span>Tiempo habitual de respuesta: {SITE_CONFIG.responseSla}</span>
            </div>

            <DoubleBezel className="mt-7" innerClassName="p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                Correo directo
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="mt-2 flex items-center gap-2.5 break-all font-display text-lg font-bold tracking-tight text-navy transition-colors hover:text-accent sm:text-xl"
              >
                <EnvelopeSimple size={22} weight="light" className="shrink-0 text-accent" />
                <span>{SITE_CONFIG.email}</span>
              </a>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => copyText(SITE_CONFIG.email, setCopiedEmail)}
                  className="inline-flex items-center gap-2 rounded-full bg-tray px-4 py-2 text-xs font-semibold text-navy ring-1 ring-[#162B47]/[0.08] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white active:scale-[0.97]"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} weight="bold" />
                      <span>Correo copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} weight="light" />
                      <span>Copiar correo</span>
                    </>
                  )}
                </button>

                <PillButton href={`mailto:${SITE_CONFIG.email}`} variant="ghost" size="sm">
                  Abrir correo
                </PillButton>
              </div>
              <span className="sr-only" aria-live="polite">
                {copiedEmail ? "Correo stacklinespa@gmail.com copiado al portapapeles" : ""}
              </span>
            </DoubleBezel>
          </MotionReveal>

          {/* Right guided form column */}
          <MotionReveal delay={0.08} className="lg:col-span-7">
            <DoubleBezel innerClassName="p-6 sm:p-8">
              {submitState.kind === "sent" ? (
                <div className="py-6 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                    <Check size={24} weight="bold" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-navy">
                    Requerimiento recibido
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    Enviamos tu mensaje a <strong className="text-navy">{SITE_CONFIG.email}</strong>.
                    Te responderemos directamente en menos de 24 horas hábiles.
                  </p>
                  <div className="mt-6">
                    <PillButton
                      variant="ghost"
                      showArrow={false}
                      onClick={() => setSubmitState({ kind: "idle" })}
                    >
                      Enviar otra consulta
                    </PillButton>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot anti-spam field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Sitio web</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-navy"
                      >
                        Nombre *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Ej. Camila Rojas"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                        className="mt-1.5 w-full rounded-xl bg-canvas px-3.5 py-3 text-sm text-navy placeholder:text-ink-muted ring-1 ring-[#162B47]/[0.1] transition-[box-shadow,background-color] focus:bg-surface focus:ring-2 focus:ring-accent"
                      />
                      {fieldErrors.name ? (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-red-600">
                          {fieldErrors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold text-navy"
                      >
                        Empresa u organización
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Ej. Distribuidora Sur"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.company)}
                        aria-describedby={
                          fieldErrors.company ? "contact-company-error" : undefined
                        }
                        className="mt-1.5 w-full rounded-xl bg-canvas px-3.5 py-3 text-sm text-navy placeholder:text-ink-muted ring-1 ring-[#162B47]/[0.1] transition-[box-shadow,background-color] focus:bg-surface focus:ring-2 focus:ring-accent"
                      />
                      {fieldErrors.company ? (
                        <p id="contact-company-error" className="mt-1.5 text-xs text-red-600">
                          {fieldErrors.company}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-navy"
                    >
                      Correo electrónico *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="nombre@empresa.cl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                      className="mt-1.5 w-full rounded-xl bg-canvas px-3.5 py-3 text-sm text-navy placeholder:text-ink-muted ring-1 ring-[#162B47]/[0.1] transition-[box-shadow,background-color] focus:bg-surface focus:ring-2 focus:ring-accent"
                    />
                    {fieldErrors.email ? (
                      <p id="contact-email-error" className="mt-1.5 text-xs text-red-600">
                        {fieldErrors.email}
                      </p>
                    ) : null}
                  </div>

                  <fieldset>
                    <legend className="text-xs font-semibold text-navy">
                      ¿Qué necesitas construir?
                    </legend>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {PROJECT_TYPE_OPTIONS.map((option) => {
                        const selected = projectType === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setProjectType(option.id)}
                            className={`rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] ${
                              selected
                                ? "bg-navy text-white shadow-sm"
                                : "bg-canvas text-ink-secondary ring-1 ring-[#162B47]/[0.1] hover:text-navy"
                            }`}
                          >
                            {option.shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-navy"
                    >
                      Cuéntanos sobre tu requerimiento *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe brevemente qué proceso quieres ordenar, automatizar o lanzar en la web..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                      className="mt-1.5 w-full resize-y rounded-xl bg-canvas px-3.5 py-3 text-sm text-navy placeholder:text-ink-muted ring-1 ring-[#162B47]/[0.1] transition-[box-shadow,background-color] focus:bg-surface focus:ring-2 focus:ring-accent"
                    />
                    {fieldErrors.message ? (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-red-600">
                        {fieldErrors.message}
                      </p>
                    ) : null}
                  </div>

                  {submitState.kind === "fallback" ? (
                    <div
                      role="status"
                      className="rounded-2xl bg-accent-tint/80 p-4 ring-1 ring-accent/25"
                    >
                      <div className="flex items-start gap-2.5">
                        <PaperPlaneTilt
                          size={18}
                          weight="regular"
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-navy">
                            Resumen listo para enviar a {SITE_CONFIG.email}
                          </p>
                          <p className="text-xs leading-relaxed text-ink-secondary">
                            Haz clic abajo para abrir tu cliente de correo con el requerimiento
                            ya redactado, o copia el texto en un clic.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <PillButton href={submitState.mailtoUrl} variant="accent" size="sm">
                              Abrir correo prellenado
                            </PillButton>
                            <button
                              type="button"
                              onClick={() => copyText(submitState.summary, setCopiedSummary)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-2 text-xs font-semibold text-navy ring-1 ring-[#162B47]/[0.12] hover:bg-tray"
                            >
                              {copiedSummary ? (
                                <>
                                  <Check size={13} weight="bold" />
                                  <span>Resumen copiado</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={13} weight="light" />
                                  <span>Copiar resumen</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {submitState.kind === "error" ? (
                    <div
                      role="alert"
                      className="rounded-2xl bg-red-50/90 p-4 ring-1 ring-red-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <WarningCircle
                          size={18}
                          weight="regular"
                          className="mt-0.5 shrink-0 text-red-600"
                        />
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-red-900">
                            {submitState.message}
                          </p>
                          {submitState.mailtoUrl ? (
                            <PillButton href={submitState.mailtoUrl} variant="navy" size="sm">
                              Enviar por correo directo
                            </PillButton>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-col items-start justify-between gap-4 pt-1 sm:flex-row sm:items-center">
                    <p className="text-xs text-ink-muted">
                      Sin spam ni listas comerciales. Solo conversación técnica directa.
                    </p>
                    <PillButton
                      type="submit"
                      variant="accent"
                      disabled={submitState.kind === "submitting"}
                      className="w-full sm:w-auto"
                    >
                      {submitState.kind === "submitting"
                        ? "Preparando envío..."
                        : "Enviar requerimiento"}
                    </PillButton>
                  </div>
                </form>
              )}
            </DoubleBezel>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
