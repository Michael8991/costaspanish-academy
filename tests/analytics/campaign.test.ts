import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CAMPAIGN_STORAGE_KEY,
  MAX_UTM_VALUE_LENGTH,
  buildGoogleCampaignBootstrap,
  parseCampaignTouch,
  prepareBrowserCampaignContextForBootstrap,
  readCampaignContext,
  recordCampaignTouch,
  sanitizeUtmValue,
  synchronizeCampaignContext,
  type CampaignStorage,
} from "@/lib/analytics/campaign";

afterEach(() => {
  vi.unstubAllGlobals();
});

function createMemoryStorage(): CampaignStorage & { has(key: string): boolean } {
  const values = new Map<string, string>();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
    has: (key) => values.has(key),
  };
}

describe("campaign UTM parsing", () => {
  it("accepts only the five allowlisted UTM fields", () => {
    const params = new URLSearchParams({
      utm_source: " newsletter ",
      utm_medium: "email",
      utm_campaign: "autumn",
      utm_content: "hero",
      utm_term: "spanish course",
      gclid: "secret-click-id",
      fbclid: "secret-meta-id",
      arbitrary: "discard-me",
    });

    expect(parseCampaignTouch(params)).toEqual({
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "autumn",
      utm_content: "hero",
      utm_term: "spanish course",
    });
  });

  it("rejects empty, control-character, full-URL and oversized values", () => {
    expect(sanitizeUtmValue("   ")).toBeNull();
    expect(sanitizeUtmValue("email\nprivate")).toBeNull();
    expect(sanitizeUtmValue("https://example.com/campaign")).toBeNull();
    expect(sanitizeUtmValue("//example.com/campaign")).toBeNull();
    expect(sanitizeUtmValue("x".repeat(MAX_UTM_VALUE_LENGTH + 1))).toBeNull();
  });

  it("maps only first-touch UTMs to GA4 native campaign fields", () => {
    expect(buildGoogleCampaignBootstrap({
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "autumn",
      utm_content: "hero",
      utm_term: "spanish course",
      gclid: "ignored-click-id",
      fbclid: "ignored-meta-id",
      email: "private@example.com",
    } as never)).toEqual({
      campaign_source: "newsletter",
      campaign_medium: "email",
      campaign_name: "autumn",
      campaign_content: "hero",
      campaign_term: "spanish course",
    });
  });

  it("does not create campaign fields without a valid first touch", () => {
    expect(buildGoogleCampaignBootstrap(null)).toBeNull();
    expect(buildGoogleCampaignBootstrap({})).toBeNull();
  });
});

describe("session campaign context", () => {
  it("keeps first touch immutable and updates last touch", () => {
    const storage = createMemoryStorage();
    const first = { utm_source: "newsletter", utm_campaign: "launch" };
    const second = { utm_source: "partner", utm_campaign: "follow-up" };

    recordCampaignTouch(storage, first);
    recordCampaignTouch(storage, second);

    expect(readCampaignContext(storage)).toMatchObject({
      version: 1,
      first_touch: first,
      last_touch: second,
    });
  });

  it("does not persist without analytics consent", () => {
    const storage = createMemoryStorage();

    synchronizeCampaignContext(
      storage,
      false,
      { utm_source: "newsletter" },
      { utm_source: "newsletter" },
    );

    expect(storage.has(CAMPAIGN_STORAGE_KEY)).toBe(false);
  });

  it("does not prepare browser campaign storage before consent", () => {
    const storage = createMemoryStorage();
    vi.stubGlobal("window", {
      location: { search: "?utm_source=newsletter&utm_campaign=autumn" },
      sessionStorage: storage,
    });

    expect(prepareBrowserCampaignContextForBootstrap(false)).toBeNull();
    expect(storage.has(CAMPAIGN_STORAGE_KEY)).toBe(false);
  });

  it("persists after consent and clears the owned session key on revocation", () => {
    const storage = createMemoryStorage();
    const touch = { utm_source: "newsletter", utm_medium: "email" };

    synchronizeCampaignContext(storage, true, touch, touch);
    expect(readCampaignContext(storage)?.first_touch).toEqual(touch);

    synchronizeCampaignContext(storage, false, null, null);
    expect(storage.has(CAMPAIGN_STORAGE_KEY)).toBe(false);
  });
});
