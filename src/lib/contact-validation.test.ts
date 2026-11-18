import { describe, expect, it } from "vitest";
import {
  buildContactSummary,
  buildMailtoUrl,
  validateContactPayload,
} from "./contact-validation";

describe("validateContactPayload", () => {
  it("accepts a complete valid payload and normalizes whitespace", () => {
    const result = validateContactPayload({
      name: "  Camila Rojas  ",
      company: "  Clínica Norte  ",
      email: "  CAMILA@clinicanorte.cl ",
      projectType: "sistema-interno",
      message: "Necesitamos un sistema de inventario y agenda para 3 sucursales.",
      website: "",
    });

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.isSpam).toBe(false);
      expect(result.data).toEqual({
        name: "Camila Rojas",
        company: "Clínica Norte",
        email: "camila@clinicanorte.cl",
        projectType: "sistema-interno",
        message: "Necesitamos un sistema de inventario y agenda para 3 sucursales.",
      });
    }
  });

  it("returns field errors for missing name, invalid email, and short message", () => {
    const result = validateContactPayload({
      name: "A",
      email: "correo-invalido",
      projectType: "plataforma-web",
      message: "Hola",
    });

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.fieldErrors.name).toBeTruthy();
      expect(result.fieldErrors.email).toBeTruthy();
      expect(result.fieldErrors.message).toBeTruthy();
    }
  });

  it("flags filled honeypot field as spam without failing validation", () => {
    const result = validateContactPayload({
      name: "Bot",
      email: "bot@example.com",
      projectType: "otro",
      message: "Mensaje suficientemente largo para pasar validacion",
      website: "https://spam.example",
    });

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.isSpam).toBe(true);
    }
  });

  it("defaults unknown projectType to 'otro'", () => {
    const result = validateContactPayload({
      name: "Diego Soto",
      email: "diego@empresa.cl",
      projectType: "valor-raro",
      message: "Queremos cotizar una plataforma a medida para clientes.",
    });

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.data.projectType).toBe("otro");
    }
  });
});

describe("buildContactSummary & buildMailtoUrl", () => {
  it("builds a readable Spanish summary and properly encoded mailto URL", () => {
    const payload = {
      name: "Camila Rojas",
      company: "Clínica Norte",
      email: "camila@clinicanorte.cl",
      projectType: "sistema-interno" as const,
      message: "Necesitamos controlar stock e ingresos diarios.",
    };

    const summary = buildContactSummary(payload);
    expect(summary).toContain("Camila Rojas");
    expect(summary).toContain("Clínica Norte");
    expect(summary).toContain("Sistema empresarial interno");

    const url = buildMailtoUrl(payload, "stacklinespa@gmail.com");
    expect(url.startsWith("mailto:stacklinespa@gmail.com?subject=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Camila Rojas");
  });
});
