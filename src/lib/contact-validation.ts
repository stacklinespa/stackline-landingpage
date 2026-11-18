import { SITE_CONFIG } from "@/data/site";

export type ProjectTypeId = "sistema-interno" | "plataforma-web" | "otro";

export const PROJECT_TYPE_OPTIONS: {
  id: ProjectTypeId;
  label: string;
  shortLabel: string;
}[] = [
  {
    id: "sistema-interno",
    label: "Sistema empresarial interno (ERP, CRM, gestión)",
    shortLabel: "Sistema interno",
  },
  {
    id: "plataforma-web",
    label: "Aplicación web o plataforma SaaS",
    shortLabel: "Web / SaaS",
  },
  {
    id: "otro",
    label: "Otro requerimiento a medida",
    shortLabel: "Otro a medida",
  },
];

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  projectType: ProjectTypeId;
  message: string;
}

export type ContactFieldErrors = Partial<
  Record<"name" | "company" | "email" | "message", string>
>;

export type ContactValidationResult =
  | { valid: true; data: ContactPayload; isSpam: boolean }
  | { valid: false; fieldErrors: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VALID_PROJECT_TYPES = new Set<ProjectTypeId>([
  "sistema-interno",
  "plataforma-web",
  "otro",
]);

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactPayload(raw: unknown): ContactValidationResult {
  if (!raw || typeof raw !== "object") {
    return {
      valid: false,
      fieldErrors: {
        name: "Ingresa tu nombre para poder responderte.",
        email: "Ingresa un correo electrónico válido.",
        message: "Cuéntanos brevemente qué necesitas construir.",
      },
    };
  }

  const record = raw as Record<string, unknown>;
  const name = asTrimmedString(record.name);
  const company = asTrimmedString(record.company);
  const email = asTrimmedString(record.email).toLowerCase();
  const rawType = asTrimmedString(record.projectType) as ProjectTypeId;
  const projectType: ProjectTypeId = VALID_PROJECT_TYPES.has(rawType)
    ? rawType
    : "otro";
  const message = asTrimmedString(record.message);
  const honeypot = asTrimmedString(record.website);

  if (honeypot.length > 0) {
    return {
      valid: true,
      isSpam: true,
      data: { name, company, email, projectType, message },
    };
  }

  const fieldErrors: ContactFieldErrors = {};

  if (name.length < 2) {
    fieldErrors.name = "Ingresa tu nombre (al menos 2 caracteres).";
  } else if (name.length > 120) {
    fieldErrors.name = "El nombre es demasiado largo (máximo 120 caracteres).";
  }

  if (company.length > 140) {
    fieldErrors.company =
      "El nombre de la empresa no puede superar 140 caracteres.";
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 180) {
    fieldErrors.email =
      "Ingresa un correo electrónico válido (ej. nombre@empresa.cl).";
  }

  if (message.length < 15) {
    fieldErrors.message =
      "Cuéntanos un poco más sobre tu requerimiento (mínimo 15 caracteres).";
  } else if (message.length > 3000) {
    fieldErrors.message =
      "El mensaje supera el límite de 3.000 caracteres.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { valid: false, fieldErrors };
  }

  return {
    valid: true,
    isSpam: false,
    data: { name, company, email, projectType, message },
  };
}

export function getProjectTypeLabel(type: ProjectTypeId): string {
  return (
    PROJECT_TYPE_OPTIONS.find((item) => item.id === type)?.label ??
    "Requerimiento a medida"
  );
}

export function buildContactSummary(data: ContactPayload): string {
  const lines = [
    `Nombre: ${data.name}`,
    data.company ? `Empresa: ${data.company}` : null,
    `Correo: ${data.email}`,
    `Tipo de proyecto: ${getProjectTypeLabel(data.projectType)}`,
    "",
    "Requerimiento:",
    data.message,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export function buildMailtoUrl(
  data: ContactPayload,
  recipient: string = SITE_CONFIG.email,
): string {
  const subject = `Nuevo proyecto a medida — ${data.company || data.name}`;
  const body = buildContactSummary(data);
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
