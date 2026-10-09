import {
  buildGoogleCampaignBootstrap,
  type CampaignTouch,
} from "@/lib/analytics/campaign";

export type GoogleConsentValue = "denied" | "granted";

export type GoogleConsentState = {
  analytics_storage: GoogleConsentValue;
  ad_storage: "denied";
  ad_user_data: "denied";
  ad_personalization: "denied";
};

export type GoogleTagManagerConfig = {
  enabled: boolean;
  gtmId: string | null;
  environment: string;
};

export type GoogleTagManagerConfigInput = {
  gtmId?: string;
  nodeEnv?: string;
  vercelEnv?: string;
};

export type DataLayerMessage = IArguments | Record<string, unknown>;
export type GoogleDataLayer = DataLayerMessage[];
export const GTM_CAMPAIGN_NAMESPACE = "costa_campaign" as const;

const consentStateByDataLayer = new WeakMap<
  GoogleDataLayer,
  GoogleConsentValue
>();
let browserEventQueueEnabled = false;

export function isValidGtmId(value: unknown): value is string {
  return typeof value === "string" && /^GTM-[A-Z0-9]+$/.test(value);
}

export function resolveGoogleTagManagerConfig({
  gtmId,
  nodeEnv,
  vercelEnv,
}: GoogleTagManagerConfigInput): GoogleTagManagerConfig {
  const normalizedId = gtmId?.trim() ?? "";
  const environment = vercelEnv ?? nodeEnv ?? "unknown";
  const environmentAllowsGtm = nodeEnv === "production" && vercelEnv !== "development";
  const validId = isValidGtmId(normalizedId) ? normalizedId : null;

  return {
    enabled: environmentAllowsGtm && validId !== null,
    gtmId: validId,
    environment,
  };
}

export function canLoadGoogleTagManager(
  config: GoogleTagManagerConfig,
  initialized: boolean,
  analyticsAllowed: boolean,
): config is GoogleTagManagerConfig & { gtmId: string } {
  return initialized && analyticsAllowed && config.enabled && config.gtmId !== null;
}

export function buildGoogleConsentState(
  analyticsAllowed: boolean,
  marketingAllowed = false,
): GoogleConsentState {
  void marketingAllowed;
  return {
    analytics_storage: analyticsAllowed ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

function pushGtagCommand(
  dataLayer: GoogleDataLayer,
  command: "default" | "update",
  state: GoogleConsentState,
) {
  function gtag(...args: unknown[]) {
    void args;
    // Google's command queue deliberately requires the function arguments object.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  }

  gtag("consent", command, state);
}

export function initializeGoogleConsentMode(
  dataLayer: GoogleDataLayer,
): boolean {
  if (consentStateByDataLayer.has(dataLayer)) return false;

  pushGtagCommand(dataLayer, "default", buildGoogleConsentState(false));
  consentStateByDataLayer.set(dataLayer, "denied");
  return true;
}

export function updateGoogleConsentMode(
  dataLayer: GoogleDataLayer,
  analyticsAllowed: boolean,
  marketingAllowed = false,
): boolean {
  initializeGoogleConsentMode(dataLayer);
  const nextState = buildGoogleConsentState(analyticsAllowed, marketingAllowed);
  const currentState = consentStateByDataLayer.get(dataLayer);

  if (currentState === nextState.analytics_storage) return false;

  pushGtagCommand(dataLayer, "update", nextState);
  consentStateByDataLayer.set(dataLayer, nextState.analytics_storage);
  return true;
}

export function getBrowserDataLayer(): GoogleDataLayer | null {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer ?? [];
  return window.dataLayer;
}

export function setGoogleTagManagerEventQueueEnabled(enabled: boolean): void {
  browserEventQueueEnabled = enabled;
}

export function isGoogleTagManagerEventQueueEnabled(): boolean {
  return browserEventQueueEnabled;
}

export function queueGoogleTagManagerBootstrap(
  dataLayer: GoogleDataLayer,
  firstTouch: CampaignTouch | null,
  startedAt = Date.now(),
): boolean {
  if (consentStateByDataLayer.get(dataLayer) !== "granted") return false;

  const campaign = buildGoogleCampaignBootstrap(firstTouch);
  if (campaign) {
    dataLayer.push({ [GTM_CAMPAIGN_NAMESPACE]: campaign });
  }

  dataLayer.push({
    "gtm.start": startedAt,
    event: "gtm.js",
  });
  return true;
}

export function loadGoogleTagManager(
  gtmId: string,
  firstTouch: CampaignTouch | null = null,
): boolean {
  if (typeof document === "undefined" || !isValidGtmId(gtmId)) return false;

  const dataLayer = getBrowserDataLayer();
  if (
    !dataLayer
    || consentStateByDataLayer.get(dataLayer) !== "granted"
  ) {
    return false;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    "script[data-costaspanish-gtm]",
  );
  if (existingScript) return existingScript.dataset.costaspanishGtm === gtmId;

  if (!queueGoogleTagManagerBootstrap(dataLayer, firstTouch)) return false;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  script.dataset.costaspanishGtm = gtmId;
  document.head.appendChild(script);
  return true;
}
