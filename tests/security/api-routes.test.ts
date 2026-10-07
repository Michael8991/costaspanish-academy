import { beforeEach, describe, expect, it, vi } from "vitest";

const { dbConnectMock, getPublicCourseBySlugMock, sendMock } = vi.hoisted(() => ({
  dbConnectMock: vi.fn(),
  getPublicCourseBySlugMock: vi.fn(),
  sendMock: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock("@/lib/mongo", () => ({ default: dbConnectMock }));
vi.mock("@/lib/courses/publicCourses", () => ({
  getPublicCourseBySlug: getPublicCourseBySlugMock,
}));

import { POST as contactPost } from "@/app/api/contact/route";
import { POST as preinscriptionPost } from "@/app/api/preinscription/route";

const validContact = {
  firstName: "Ana",
  lastName: "García",
  email: "ana@example.com",
  topic: "general",
  textMessage: "Quiero información.",
};

const validPreinscription = {
  name: "Ana García",
  email: "ana@example.com",
  phone: "+34 600 000 000",
  country: "España",
  courseSlug: "curso-intensivo-espanol-a1",
  level: "A1",
  nativeLanguage: "Español",
  availability: "morning",
  experience: "none",
  previousCourses: "no",
  goals: "Aprender español para trabajar.",
  notes: "Prefiero clases por la mañana.",
  privacy: true,
};

function jsonRequest(path: string, payload: unknown) {
  return new Request(`https://www.costaspanishclass.com${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

beforeEach(() => {
  delete process.env.TURNSTILE_SECRET_KEY;
  sendMock.mockResolvedValue({ data: { id: "internal-provider-id" }, error: null });
  dbConnectMock.mockResolvedValue(undefined);
  getPublicCourseBySlugMock.mockResolvedValue({
    title: "Curso intensivo de español A1",
    slug: "curso-intensivo-espanol-a1",
  });
});

describe("POST /api/contact", () => {
  it("accepts a valid payload and returns only success", async () => {
    const response = await contactPost(jsonRequest("/api/contact", validContact));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("rejects invalid email, oversized messages and unknown fields", async () => {
    for (const payload of [
      { ...validContact, email: "invalid" },
      { ...validContact, textMessage: "x".repeat(2001) },
      { ...validContact, bcc: "victim@example.com" },
    ]) {
      const response = await contactPost(jsonRequest("/api/contact", payload));
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ success: false, error: "INVALID_REQUEST" });
    }

    expect(sendMock).not.toHaveBeenCalled();
  });

  it("sends HTML-looking input as plain text", async () => {
    const textMessage = "<script>alert(1)</script>";
    const response = await contactPost(
      jsonRequest("/api/contact", { ...validContact, textMessage }),
    );

    expect(response.status).toBe(200);
    const email = sendMock.mock.calls[0][0];
    expect(email.text).toContain(textMessage);
    expect(email).not.toHaveProperty("html");
  });
});

describe("POST /api/preinscription", () => {
  it("resolves the canonical public course and fixes the visitor recipient", async () => {
    const response = await preinscriptionPost(
      jsonRequest("/api/preinscription", validPreinscription),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(getPublicCourseBySlugMock).toHaveBeenCalledWith(
      validPreinscription.courseSlug,
      expect.any(Object),
    );
    expect(sendMock).toHaveBeenCalledTimes(2);

    const visitorEmail = sendMock.mock.calls[1][0];
    expect(visitorEmail.to).toBe(validPreinscription.email);
    expect(visitorEmail).not.toHaveProperty("cc");
    expect(visitorEmail).not.toHaveProperty("bcc");
    expect(visitorEmail).not.toHaveProperty("replyTo");
  });

  it("escapes HTML in name and notes before rendering email HTML", async () => {
    const response = await preinscriptionPost(
      jsonRequest("/api/preinscription", {
        ...validPreinscription,
        name: "<script>alert(1)</script>",
        notes: "<img src=x onerror=alert(1)>",
      }),
    );

    expect(response.status).toBe(200);
    const adminHtml = sendMock.mock.calls[0][0].html as string;
    expect(adminHtml).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(adminHtml).toContain("&lt;img src=x onerror=alert(1)&gt;");
    expect(adminHtml).not.toContain("<script>alert(1)</script>");
    expect(adminHtml).not.toContain("<img src=x onerror=alert(1)>");
  });

  it("rejects an invalid or private course", async () => {
    getPublicCourseBySlugMock.mockResolvedValueOnce(null);
    const response = await preinscriptionPost(
      jsonRequest("/api/preinscription", validPreinscription),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ success: false, error: "INVALID_REQUEST" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects recipient manipulation and unknown fields", async () => {
    const response = await preinscriptionPost(
      jsonRequest("/api/preinscription", {
        ...validPreinscription,
        email: ["victim@example.com", "other@example.com"],
        bcc: "attacker@example.com",
      }),
    );

    expect(response.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const request = new Request("https://www.costaspanishclass.com/api/preinscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not-json",
    });
    const response = await preinscriptionPost(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ success: false, error: "INVALID_REQUEST" });
  });

  it("does not leak Resend errors", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    sendMock.mockRejectedValueOnce(new Error("provider-secret-detail"));

    const response = await preinscriptionPost(
      jsonRequest("/api/preinscription", validPreinscription),
    );

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ success: false, error: "INTERNAL_ERROR" });
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain("provider-secret-detail");
    consoleError.mockRestore();
  });
});
