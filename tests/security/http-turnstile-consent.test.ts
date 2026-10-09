import { afterEach, describe, expect, it, vi } from "vitest";

import { filterAnalyticsEvent } from "@/components/cookies/AnalyticsLoader";
import {
  CONSENT_VERSION,
  createConsentState,
  DEFAULT_CONSENT_STATE,
  parseConsent,
  serializeConsent,
  type ConsentState,
} from "@/lib/cookies/consent";
import { InvalidRequestError, MAX_JSON_BODY_BYTES, readJsonBody } from "@/lib/security/http";
import { verifyTurnstile } from "@/lib/security/turnstile";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("request body protection", () => {
  it("rejects a body larger than the configured maximum", async () => {
    const request = new Request("https://www.costaspanishclass.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: "x".repeat(MAX_JSON_BODY_BYTES) }),
    });

    await expect(readJsonBody(request)).rejects.toBeInstanceOf(InvalidRequestError);
  });

  it("rejects non-JSON content", async () => {
    const request = new Request("https://www.costaspanishclass.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "hello",
    });

    await expect(readJsonBody(request)).rejects.toBeInstanceOf(InvalidRequestError);
  });
});

describe("Turnstile server verification", () => {
  it("remains disabled without a server secret", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    await expect(verifyTurnstile(undefined)).resolves.toBe(true);
  });

  it("requires a token when the server secret is configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "server-secret");
    await expect(verifyTurnstile(undefined)).resolves.toBe(false);
  });

  it("fails closed when only the public site key is configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "public-site-key");
    await expect(verifyTurnstile("visitor-token")).resolves.toBe(false);
  });

  it("verifies the token with Cloudflare on the server", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "server-secret");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(verifyTurnstile("visitor-token", "203.0.113.10")).resolves.toBe(true);
    const [, request] = fetchMock.mock.calls[0];
    expect(request.method).toBe("POST");
    expect(request.body.toString()).toContain("response=visitor-token");
    expect(request.body.toString()).toContain("remoteip=203.0.113.10");
  });
});

describe("consent format", () => {
  const now = "2026-10-08T12:00:00.000Z";
  const encode = (value: unknown) => encodeURIComponent(JSON.stringify(value));

  it("uses privacy-preserving defaults when no consent exists", () => {
    expect(parseConsent("")).toBeNull();
    expect(DEFAULT_CONSENT_STATE).toEqual({
      version: CONSENT_VERSION,
      necessary: true,
      analytics: false,
      marketing: false,
      updatedAt: "1970-01-01T00:00:00.000Z",
    });
  });

  it("parses the current version", () => {
    const current = createConsentState({ analytics: true, marketing: false }, now);
    expect(parseConsent(serializeConsent(current))).toEqual(current);
  });

  it.each([
    { necessary: true, analytics: true },
    { version: 1, necessary: true, analytics: true },
    {
      version: 2,
      necessary: true,
      analytics: true,
      marketing: true,
      updatedAt: now,
    },
  ])("requires a new decision for pre-v3 consent", (legacy) => {
    expect(parseConsent(encode(legacy))).toBeNull();
  });

  it("rejects malformed consent", () => {
    expect(parseConsent("not-json")).toBeNull();
    expect(parseConsent(encode({ version: CONSENT_VERSION }))).toBeNull();
  });

  it("never permits necessary consent to become false", () => {
    const invalid = encode({
      ...createConsentState({ analytics: true, marketing: true }, now),
      necessary: false,
    });
    expect(parseConsent(invalid)).toBeNull();

    const unsafe = {
      ...createConsentState({ analytics: false, marketing: false }, now),
      necessary: false,
    } as unknown as ConsentState;
    expect(parseConsent(serializeConsent(unsafe))?.necessary).toBe(true);
  });

  it("creates Accept All consent", () => {
    expect(createConsentState({ analytics: true, marketing: true }, now)).toMatchObject({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  });

  it("creates Reject All consent", () => {
    expect(createConsentState({ analytics: false, marketing: false }, now)).toMatchObject({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  });

  it.each([
    { analytics: true, marketing: false },
    { analytics: false, marketing: true },
  ])("creates custom consent for $analytics/$marketing", (preferences) => {
    expect(createConsentState(preferences, now)).toMatchObject(preferences);
  });

  it("stores updatedAt as canonical ISO 8601", () => {
    const consent = createConsentState({ analytics: false, marketing: false }, now);
    expect(new Date(consent.updatedAt).toISOString()).toBe(consent.updatedAt);
  });

  it("round-trips serialization and deserialization", () => {
    const consent = createConsentState({ analytics: true, marketing: false }, now);
    expect(parseConsent(serializeConsent(consent))).toEqual(consent);
  });

  it("rejects future or unknown versions safely", () => {
    expect(parseConsent(encode({
      version: CONSENT_VERSION + 1,
      necessary: true,
      analytics: true,
      marketing: true,
      updatedAt: now,
    }))).toBeNull();
  });

  it("blocks future Analytics events immediately after revocation", () => {
    const event = { type: "pageview", url: "https://www.costaspanishclass.com/en" };
    expect(filterAnalyticsEvent(true, event)).toBe(event);
    expect(filterAnalyticsEvent(false, event)).toBeNull();
  });
});
