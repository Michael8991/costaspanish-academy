export const CAMPAIGN_CONTEXT_VERSION = 1 as const;
export const CAMPAIGN_STORAGE_KEY = "costaspanish_campaign_context";
export const UTM_PARAMETER_NAMES = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
export const MAX_UTM_VALUE_LENGTH = 120;

export type UtmParameterName = (typeof UTM_PARAMETER_NAMES)[number];
export type CampaignTouch = Partial<Record<UtmParameterName, string>>;

export type GoogleCampaignBootstrap = Partial<Record<
  | "campaign_source"
  | "campaign_medium"
  | "campaign_name"
  | "campaign_content"
  | "campaign_term",
  string
>>;

export type CampaignContext = {
  version: typeof CAMPAIGN_CONTEXT_VERSION;
  first_touch: CampaignTouch;
  last_touch: CampaignTouch;
};

export type CampaignStorage = Pick<
  Storage,
  "getItem" | "setItem" | "removeItem"
>;

const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F]/;
const FULL_URL = /^(?:https?:)?\/\//i;

export function sanitizeUtmValue(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const sanitized = value.trim();
  if (
    sanitized.length === 0
    || sanitized.length > MAX_UTM_VALUE_LENGTH
    || CONTROL_CHARACTERS.test(sanitized)
    || FULL_URL.test(sanitized)
  ) {
    return null;
  }

  return sanitized;
}

export function parseCampaignTouch(searchParams: URLSearchParams): CampaignTouch | null {
  const touch: CampaignTouch = {};

  for (const parameterName of UTM_PARAMETER_NAMES) {
    const value = sanitizeUtmValue(searchParams.get(parameterName));
    if (value !== null) {
      touch[parameterName] = value;
    }
  }

  return Object.keys(touch).length > 0 ? touch : null;
}

export function buildGoogleCampaignBootstrap(
  firstTouch: CampaignTouch | null,
): GoogleCampaignBootstrap | null {
  if (!firstTouch) return null;

  const campaign: GoogleCampaignBootstrap = {};
  const mappings = [
    ["utm_source", "campaign_source"],
    ["utm_medium", "campaign_medium"],
    ["utm_campaign", "campaign_name"],
    ["utm_content", "campaign_content"],
    ["utm_term", "campaign_term"],
  ] as const;

  for (const [utmName, campaignName] of mappings) {
    const value = sanitizeUtmValue(firstTouch[utmName]);
    if (value !== null) campaign[campaignName] = value;
  }

  return Object.keys(campaign).length > 0 ? campaign : null;
}

function isCampaignTouch(value: unknown): value is CampaignTouch {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const entries = Object.entries(value);
  if (entries.length === 0) return false;

  return entries.every(([key, entryValue]) => (
    UTM_PARAMETER_NAMES.includes(key as UtmParameterName)
    && sanitizeUtmValue(entryValue) === entryValue
  ));
}

export function readCampaignContext(
  storage: CampaignStorage,
): CampaignContext | null {
  try {
    const raw = storage.getItem(CAMPAIGN_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CampaignContext>;
    if (
      parsed.version !== CAMPAIGN_CONTEXT_VERSION
      || !isCampaignTouch(parsed.first_touch)
      || !isCampaignTouch(parsed.last_touch)
    ) {
      return null;
    }

    return {
      version: CAMPAIGN_CONTEXT_VERSION,
      first_touch: parsed.first_touch,
      last_touch: parsed.last_touch,
    };
  } catch {
    return null;
  }
}

export function writeCampaignContext(
  storage: CampaignStorage,
  firstTouch: CampaignTouch,
  lastTouch: CampaignTouch,
): CampaignContext | null {
  if (!isCampaignTouch(firstTouch) || !isCampaignTouch(lastTouch)) return null;

  const context: CampaignContext = {
    version: CAMPAIGN_CONTEXT_VERSION,
    first_touch: firstTouch,
    last_touch: lastTouch,
  };

  try {
    storage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(context));
    return context;
  } catch {
    return null;
  }
}

export function recordCampaignTouch(
  storage: CampaignStorage,
  touch: CampaignTouch,
): CampaignContext | null {
  const existing = readCampaignContext(storage);
  return writeCampaignContext(
    storage,
    existing?.first_touch ?? touch,
    touch,
  );
}

export function clearCampaignContext(storage: CampaignStorage): void {
  try {
    storage.removeItem(CAMPAIGN_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }
}

export function synchronizeCampaignContext(
  storage: CampaignStorage,
  analyticsAllowed: boolean,
  firstTouch: CampaignTouch | null,
  lastTouch: CampaignTouch | null,
): CampaignContext | null {
  if (!analyticsAllowed) {
    clearCampaignContext(storage);
    return null;
  }

  const stored = readCampaignContext(storage);
  const first = stored?.first_touch ?? firstTouch;
  const last = lastTouch ?? stored?.last_touch;

  if (!first || !last) return stored;
  return writeCampaignContext(storage, first, last);
}

export function getBrowserCampaignContext(): CampaignContext | null {
  if (typeof window === "undefined") return null;
  return readCampaignContext(window.sessionStorage);
}

export function prepareBrowserCampaignContextForBootstrap(
  analyticsAllowed: boolean,
): CampaignContext | null {
  if (!analyticsAllowed || typeof window === "undefined") return null;

  const currentTouch = parseCampaignTouch(
    new URLSearchParams(window.location.search),
  );
  if (currentTouch) {
    return recordCampaignTouch(window.sessionStorage, currentTouch);
  }

  return readCampaignContext(window.sessionStorage);
}
