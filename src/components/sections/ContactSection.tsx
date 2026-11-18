"use client";

import { useState, type FormEvent } from "react";
import {
  Check,
  Clock,
  Copy,
  PaperPlaneTilt,
  WarningCircle,
} from "@phosphor-icons/react";
import { PillButton } from "@/components/ui/PillButton";
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
    <section
      id="contacto"
      className="relative scroll-mt-24 overflow-x-clip bg-navy-deep pt-24 pb-20 text-white lg:pt-36 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/4 h-[380px] w-[380px] rounded-full bg-accent/[0.12] blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left studio invitation */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Conversemos sobre tu proyecto
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.6rem]">
                ¿Listo para construir algo{" "}
                <span className="text-accent">a tu medida?</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
                Cuéntanos qué quieres resolver, ordenar o lanzar. Te respondemos directo desde
                ingeniería con ideas concretas — sin compromiso y sin letra chica.
              </p>

              <div className="mt-8 flex items-center gap-2.5 text-sm text-white/80">
                <Clock size={18} weight="light" className="text-accent" />
                <span>Respuesta habitual: {SITE_CONFIG.responseSla}</span>
              </div>
            </div>

            <div className="mt-10 border-t border-white/12 pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
                Correo directo
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="mt-2 inline-block break-all font-display text-2xl font-bold tracking-tight text-white underline decoration-accent/80 decoration-2 underline-offset-8 transition-colors hover:text-accent sm:text-3xl"
              >
                {SITE_CONFIG.email}
              </a>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => copyText(SITE_CONFIG.email, setCopiedEmail)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2.5 text-xs font-semibold text-white ring-1 ring-white/14 transition-[background-color,transform] duration-200 hover:bg-white/[0.15] active:scale-[0.97]"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} weight="bold" className="text-accent" />
                      <span>Correo copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} weight="light" />
                      <span>Copiar correo</span>
                    </>
                  )}
                </button>

                <PillButton href={`mailto:${SITE_CONFIG.email}`} variant="ghost-dark" size="sm">
                  Abrir cliente de correo
                </PillButton>
              </div>
              <span className="sr-only" aria-live="polite">
                {copiedEmail ? "Correo stacklinespa@gmail.com copiado al portapapeles" : ""}
              </span>
            </div>
          </div>

          {/* Right clean architectural form */}
          <div className="lg:col-span-7">
            <div className="rounded-[1.75rem] bg-white/[0.04] p-6 ring-1 ring-white/12 sm:p-9">
              {submitState.kind === "sent" ? (
                <div className="py-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30">
                    <Check size={24} weight="bold" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    Requerimiento recibido
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Enviamos tu mensaje a{" "}
                    <strong className="text-white">{SITE_CONFIG.email}</strong>. Te responderemos
                    en menos de 24 horas hábiles.
                  </p>
                  <div className="mt-6">
                    <PillButton
                      variant="ghost-dark"
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
                      <label htmlFor="contact-name" className="block text-xs font-medium text-white/80">
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
                        className="mt-1.5 w-full rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 ring-1 ring-white/12 transition-[box-shadow,background-color] focus:bg-white/[0.09] focus:ring-2 focus:ring-accent"
                      />
                      {fieldErrors.name ? (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-red-300">
                          {fieldErrors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-medium text-white/80">
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
                        className="mt-1.5 w-full rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 ring-1 ring-white/12 transition-[box-shadow,background-color] focus:bg-white/[0.09] focus:ring-2 focus:ring-accent"
                      />
                      {fieldErrors.company ? (
                        <p id="contact-company-error" className="mt-1.5 text-xs text-red-300">
                          {fieldErrors.company}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-white/80">
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
                      className="mt-1.5 w-full rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 ring-1 ring-white/12 transition-[box-shadow,background-color] focus:bg-white/[0.09] focus:ring-2 focus:ring-accent"
                    />
                    {fieldErrors.email ? (
                      <p id="contact-email-error" className="mt-1.5 text-xs text-red-300">
                        {fieldErrors.email}
                      </p>
                    ) : null}
                  </div>

                  <fieldset>
                    <legend className="text-xs font-medium text-white/80">
                      ¿Qué tipo de proyecto tienes en mente?
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
                            className={`rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] ${
                              selected
                                ? "bg-accent text-white shadow-sm"
                                : "bg-white/[0.05] text-white/75 ring-1 ring-white/12 hover:bg-white/[0.1] hover:text-white"
                            }`}
                          >
                            {option.shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-white/80">
                      Cuéntanos sobre tu requerimiento *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Qué necesitas resolver, cómo trabajan hoy o qué te gustaría lanzar..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                      className="mt-1.5 w-full resize-y rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 ring-1 ring-white/12 transition-[box-shadow,background-color] focus:bg-white/[0.09] focus:ring-2 focus:ring-accent"
                    />
                    {fieldErrors.message ? (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-red-300">
                        {fieldErrors.message}
                      </p>
                    ) : null}
                  </div>

                  {submitState.kind === "fallback" ? (
                    <div
                      role="status"
                      className="rounded-2xl bg-accent/15 p-4 ring-1 ring-accent/40"
                    >
                      <div className="flex items-start gap-2.5">
                        <PaperPlaneTilt
                          size={18}
                          weight="regular"
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-white">
                            Resumen listo para enviar a {SITE_CONFIG.email}
                          </p>
                          <p className="text-xs leading-relaxed text-white/75">
                            Haz clic abajo para abrir tu cliente de correo con el requerimiento ya
                            redactado, o copia el texto en un clic.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <PillButton href={submitState.mailtoUrl} variant="accent" size="sm">
                              Abrir correo prellenado
                            </PillButton>
                            <button
                              type="button"
                              onClick={() => copyText(submitState.summary, setCopiedSummary)}
                              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white ring-1 ring-white/15 hover:bg-white/16"
                            >
                              {copiedSummary ? (
                                <>
                                  <Check size={13} weight="bold" className="text-accent" />
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
                      className="rounded-2xl bg-red-500/15 p-4 ring-1 ring-red-400/35"
                    >
                      <div className="flex items-start gap-2.5">
                        <WarningCircle
                          size={18}
                          weight="regular"
                          className="mt-0.5 shrink-0 text-red-300"
                        />
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-red-100">{submitState.message}</p>
                          {submitState.mailtoUrl ? (
                            <PillButton href={submitState.mailtoUrl} variant="light" size="sm">
                              Enviar por correo directo
                            </PillButton>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                    <p className="text-xs text-white/50">
                      Trato directo con ingeniería. Cero spam.
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
