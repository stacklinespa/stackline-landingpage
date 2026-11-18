import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const validBody = {
  name: "Sebastián Pérez",
  company: "Logística Maule",
  email: "sebastian@logisticamaule.cl",
  projectType: "sistema-interno",
  message: "Necesitamos un sistema web para gestionar despachos y bodegas.",
  website: "",
};

function makeRequest(body: unknown) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  const originalKey = process.env.RESEND_API_KEY;

  beforeEach(() => {
    delete process.env.RESEND_API_KEY;
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (originalKey === undefined) {
      delete process.env.RESEND_API_KEY;
    } else {
      process.env.RESEND_API_KEY = originalKey;
    }
  });

  it("returns 400 on malformed JSON", async () => {
    const res = await POST(makeRequest("{invalid"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.status).toBe("error");
  });

  it("returns 400 with fieldErrors on invalid fields", async () => {
    const res = await POST(makeRequest({ name: "", email: "bad", message: "hi" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.status).toBe("error");
    expect(json.fieldErrors.name).toBeTruthy();
    expect(json.fieldErrors.email).toBeTruthy();
    expect(json.fieldErrors.message).toBeTruthy();
  });

  it("silently returns sent when honeypot is filled", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const res = await POST(makeRequest({ ...validBody, website: "http://spam.tld" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("sent");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns explicit fallback payload when RESEND_API_KEY is not configured", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("fallback");
    expect(json.mailtoUrl).toContain("mailto:stacklinespa@gmail.com");
    expect(json.summary).toContain("Sebastián Pérez");
  });

  it("sends email via Resend API when RESEND_API_KEY is configured", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ id: "email_123" }), { status: 200 }));

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("sent");
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("returns 502 with mailtoUrl recovery when Resend fails", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 }),
    );

    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.status).toBe("error");
    expect(json.mailtoUrl).toContain("mailto:stacklinespa@gmail.com");
  });
});
