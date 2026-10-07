import { afterEach, describe, expect, it, vi } from "vitest";

import { parseConsent } from "@/lib/cookies/consent";
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
  it("migrates the legacy unversioned shape", () => {
    const legacy = encodeURIComponent(JSON.stringify({ necessary: true, analytics: false }));
    expect(parseConsent(legacy)).toEqual({ version: 1, necessary: true, analytics: false });
  });

  it("rejects unsupported or malformed consent", () => {
    const unsupported = encodeURIComponent(
      JSON.stringify({ version: 2, necessary: true, analytics: true }),
    );
    expect(parseConsent(unsupported)).toBeNull();
    expect(parseConsent("not-json")).toBeNull();
  });
});
