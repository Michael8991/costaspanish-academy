import { describe, expect, it } from "vitest";

import enCookies from "@/messages/en/cookies.json";
import enCookiesPolicy from "@/messages/en/cookiesPolicy.json";
import enPrivacyPolicy from "@/messages/en/privacyPolicy.json";
import esCookies from "@/messages/es/cookies.json";
import esCookiesPolicy from "@/messages/es/cookiesPolicy.json";
import esPrivacyPolicy from "@/messages/es/privacyPolicy.json";
import { createGtmAnalyticsAdapter } from "@/lib/analytics/providers/gtm";
import {
  buildGoogleConsentState,
  canLoadGoogleTagManager,
  initializeGoogleConsentMode,
  loadGoogleTagManager,
  queueGoogleTagManagerBootstrap,
  resolveGoogleTagManagerConfig,
  updateGoogleConsentMode,
  type GoogleDataLayer,
} from "@/lib/analytics/googleTagManager";

function commandAt(dataLayer: GoogleDataLayer, index: number) {
  return Array.from(dataLayer[index] as IArguments);
}

function translationKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    translationKeys(child, prefix ? `${prefix}.${key}` : key));
}

describe("Google Tag Manager configuration", () => {
  it("fails closed when the GTM ID is absent or invalid", () => {
    const absent = resolveGoogleTagManagerConfig({ nodeEnv: "production" });
    const invalid = resolveGoogleTagManagerConfig({
      gtmId: "G-INVALID",
      nodeEnv: "production",
    });

    expect(canLoadGoogleTagManager(absent, true, true)).toBe(false);
    expect(canLoadGoogleTagManager(invalid, true, true)).toBe(false);
  });

  it("stays disabled in development and permits explicitly configured preview and production", () => {
    expect(resolveGoogleTagManagerConfig({
      gtmId: "GTM-ABC123",
      nodeEnv: "development",
    }).enabled).toBe(false);
    expect(resolveGoogleTagManagerConfig({
      gtmId: "GTM-TEST123",
      nodeEnv: "production",
      vercelEnv: "preview",
    }).enabled).toBe(true);
    expect(resolveGoogleTagManagerConfig({
      gtmId: "GTM-PROD123",
      nodeEnv: "production",
      vercelEnv: "production",
    }).enabled).toBe(true);
  });

  it("requires initialized analytics consent before an enabled container can load", () => {
    const config = resolveGoogleTagManagerConfig({
      gtmId: "GTM-ABC123",
      nodeEnv: "production",
    });

    expect(canLoadGoogleTagManager(config, false, true)).toBe(false);
    expect(canLoadGoogleTagManager(config, true, false)).toBe(false);
    expect(canLoadGoogleTagManager(config, true, true)).toBe(true);
  });
});

describe("Google Consent Mode v2", () => {
  it("queues a single default-denied state before GTM", () => {
    const dataLayer: GoogleDataLayer = [];

    expect(initializeGoogleConsentMode(dataLayer)).toBe(true);
    expect(initializeGoogleConsentMode(dataLayer)).toBe(false);
    expect(commandAt(dataLayer, 0)).toEqual([
      "consent",
      "default",
      {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    ]);
    expect(dataLayer).toHaveLength(1);
  });

  it("grants analytics while every advertising state remains denied", () => {
    expect(buildGoogleConsentState(true, true)).toEqual({
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });

  it("updates to granted and back to denied on revocation", () => {
    const dataLayer: GoogleDataLayer = [];

    updateGoogleConsentMode(dataLayer, true, true);
    updateGoogleConsentMode(dataLayer, false, true);

    expect(commandAt(dataLayer, 1)[2]).toMatchObject({
      analytics_storage: "granted",
      ad_storage: "denied",
    });
    expect(commandAt(dataLayer, 2)[2]).toMatchObject({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });

  it("cannot load GTM without a browser and granted consent", () => {
    expect(loadGoogleTagManager("GTM-ABC123")).toBe(false);
  });

  it("queues granted consent, first-touch campaign, then gtm.js in order", () => {
    const dataLayer: GoogleDataLayer = [];
    initializeGoogleConsentMode(dataLayer);
    updateGoogleConsentMode(dataLayer, true);

    expect(queueGoogleTagManagerBootstrap(dataLayer, {
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "autumn",
    }, 123)).toBe(true);

    expect(commandAt(dataLayer, 1).slice(0, 2)).toEqual(["consent", "update"]);
    expect(dataLayer[2]).toEqual({
      costa_campaign: {
        campaign_source: "newsletter",
        campaign_medium: "email",
        campaign_name: "autumn",
      },
    });
    expect(dataLayer[3]).toEqual({ "gtm.start": 123, event: "gtm.js" });
  });

  it("does not emit a campaign bootstrap or gtm.js without consent", () => {
    const dataLayer: GoogleDataLayer = [];
    initializeGoogleConsentMode(dataLayer);

    expect(queueGoogleTagManagerBootstrap(dataLayer, {
      utm_source: "newsletter",
    }, 123)).toBe(false);
    expect(dataLayer).toHaveLength(1);
  });

  it("queues gtm.js without campaign fields when first touch is absent", () => {
    const dataLayer: GoogleDataLayer = [];
    updateGoogleConsentMode(dataLayer, true);

    expect(queueGoogleTagManagerBootstrap(dataLayer, null, 123)).toBe(true);
    expect(dataLayer[2]).toEqual({ "gtm.start": 123, event: "gtm.js" });
    expect(JSON.stringify(dataLayer)).not.toContain("campaign_source");
  });
});

describe("GTM analytics adapter", () => {
  it("does not queue events while its consent gate is closed", () => {
    const dataLayer: GoogleDataLayer = [];
    const adapter = createGtmAnalyticsAdapter({
      isEnabled: () => false,
      getDataLayer: () => dataLayer,
      getCampaignContext: () => null,
    });

    adapter.track("contact_submit", {
      source_section: "contact",
      locale: "es",
    });

    expect(dataLayer).toEqual([]);
  });

  it("queues only allowlisted event properties and excludes PII", () => {
    const dataLayer: GoogleDataLayer = [];
    const adapter = createGtmAnalyticsAdapter({
      isEnabled: () => true,
      getDataLayer: () => dataLayer,
      getCampaignContext: () => null,
    });

    adapter.track("course_view", {
      course_slug: "clases-privadas-espanol",
      course_type: "private",
      locale: "es",
      email: "private@example.com",
      message: "private",
    } as never);

    expect(dataLayer[1]).toEqual({
      event: "course_view",
      costa_analytics: {
        event_name: "course_view",
        properties: {
          course_slug: "clases-privadas-espanol",
          course_type: "private",
          locale: "es",
        },
        campaign_context: null,
      },
    });
    expect(JSON.stringify(dataLayer)).not.toContain("private@example.com");
  });

  it("resets the namespaced envelope so stale properties cannot leak", () => {
    const dataLayer: GoogleDataLayer = [];
    const adapter = createGtmAnalyticsAdapter({
      isEnabled: () => true,
      getDataLayer: () => dataLayer,
      getCampaignContext: () => null,
    });

    adapter.track("course_view", {
      course_slug: "a-course",
      course_type: "private",
      locale: "en",
    });
    adapter.track("contact_submit", {
      source_section: "contact",
      locale: "en",
    });

    expect(dataLayer[2]).toEqual({ costa_analytics: null });
    expect(dataLayer[3]).toEqual({
      event: "contact_submit",
      costa_analytics: {
        event_name: "contact_submit",
        properties: { source_section: "contact", locale: "en" },
        campaign_context: null,
      },
    });
    expect(JSON.stringify(dataLayer[3])).not.toContain("course_type");
  });
});

describe("analytics legal translation parity", () => {
  it.each([
    [esCookies, enCookies],
    [esCookiesPolicy, enCookiesPolicy],
    [esPrivacyPolicy, enPrivacyPolicy],
  ])("keeps ES and EN translation keys aligned", (spanish, english) => {
    expect(translationKeys(spanish).sort()).toEqual(translationKeys(english).sort());
  });
});
