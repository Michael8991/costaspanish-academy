import { describe, expect, it } from "vitest";

import { escapeHtml, escapeHtmlWithLineBreaks } from "@/lib/security/html";
import { contactSchema, preinscriptionSchema } from "@/lib/security/validation";

const validContact = {
  firstName: "Ana",
  lastName: "García",
  email: "ana@example.com",
  topic: "general",
  textMessage: "Quiero información sobre los cursos.",
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

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ ...validContact, email: "invalid" }).success).toBe(false);
  });

  it("rejects an oversized message", () => {
    expect(contactSchema.safeParse({ ...validContact, textMessage: "x".repeat(2001) }).success).toBe(false);
  });

  it("rejects unknown fields", () => {
    expect(contactSchema.safeParse({ ...validContact, bcc: "victim@example.com" }).success).toBe(false);
  });

  it("allows HTML-looking text so it can be handled as plain text", () => {
    expect(contactSchema.safeParse({ ...validContact, textMessage: "<script>alert(1)</script>" }).success).toBe(true);
  });
});

describe("preinscriptionSchema", () => {
  it("accepts a valid payload", () => {
    expect(preinscriptionSchema.safeParse(validPreinscription).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(preinscriptionSchema.safeParse({ ...validPreinscription, email: "invalid" }).success).toBe(false);
  });

  it("rejects a missing required field", () => {
    const withoutGoals: Record<string, unknown> = { ...validPreinscription };
    delete withoutGoals.goals;
    expect(preinscriptionSchema.safeParse(withoutGoals).success).toBe(false);
  });

  it("rejects an oversized field", () => {
    expect(preinscriptionSchema.safeParse({ ...validPreinscription, notes: "x".repeat(1501) }).success).toBe(false);
  });

  it("rejects unknown fields and recipient controls", () => {
    expect(preinscriptionSchema.safeParse({ ...validPreinscription, bcc: "victim@example.com" }).success).toBe(false);
  });

  it("rejects arrays as email recipients", () => {
    expect(preinscriptionSchema.safeParse({ ...validPreinscription, email: ["a@example.com"] }).success).toBe(false);
  });
});

describe("HTML escaping", () => {
  it("escapes markup in names", () => {
    expect(escapeHtml('<script data-x="1">alert(1)</script>')).toBe(
      "&lt;script data-x=&quot;1&quot;&gt;alert(1)&lt;/script&gt;",
    );
  });

  it("escapes markup in notes and preserves line breaks", () => {
    expect(escapeHtmlWithLineBreaks("hello\n<img src=x>")).toBe(
      "hello<br>&lt;img src=x&gt;",
    );
  });
});
