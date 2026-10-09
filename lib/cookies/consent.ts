export const CONSENT_VERSION = 2 as const;

export type ConsentState = {
  version: typeof CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export type ConsentPreferences = Pick<ConsentState, "analytics" | "marketing">;

const COOKIE_NAME = "cookie_consent";
const MAX_AGE = 60 * 60 * 24 * 365;
const INITIAL_UPDATED_AT = "1970-01-01T00:00:00.000Z";

export const DEFAULT_CONSENT_STATE: ConsentState = {
  version: CONSENT_VERSION,
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: INITIAL_UPDATED_AT,
};

type StoredConsent = Record<string, unknown>;

function isRecord(value: unknown): value is StoredConsent {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.toISOString() === value;
}

function toIsoDate(value: Date | string): string {
  return (value instanceof Date ? value : new Date(value)).toISOString();
}

export function createConsentState(
  preferences: ConsentPreferences,
  updatedAt: Date | string = new Date(),
): ConsentState {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    updatedAt: toIsoDate(updatedAt),
  };
}

export function parseConsent(
  raw: string,
  migratedAt: Date | string = new Date(),
): ConsentState | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as unknown;
    if (!isRecord(parsed) || parsed.necessary !== true || typeof parsed.analytics !== "boolean") {
      return null;
    }

    if (parsed.version === CONSENT_VERSION) {
      if (typeof parsed.marketing !== "boolean" || !isIsoDate(parsed.updatedAt)) {
        return null;
      }

      return {
        version: CONSENT_VERSION,
        necessary: true,
        analytics: parsed.analytics,
        marketing: parsed.marketing,
        updatedAt: parsed.updatedAt,
      };
    }

    if (parsed.version === 1 || parsed.version === undefined) {
      return createConsentState(
        { analytics: parsed.analytics, marketing: false },
        migratedAt,
      );
    }

    return null;
  } catch {
    return null;
  }
}

export function serializeConsent(consent: ConsentState): string {
  const normalized: ConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: consent.analytics,
    marketing: consent.marketing,
    updatedAt: isIsoDate(consent.updatedAt) ? consent.updatedAt : new Date().toISOString(),
  };

  return encodeURIComponent(JSON.stringify(normalized));
}

export function readConsentClient(): ConsentState | null {
  if (typeof document === "undefined") return null;

  const prefix = `${COOKIE_NAME}=`;
  const row = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix));

  if (!row) return null;
  return parseConsent(row.slice(prefix.length));
}

export function writeConsentClient(consent: ConsentState) {
  if (typeof document === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${serializeConsent(consent)}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
}

export function clearConsentClient() {
  if (typeof document === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

export function consentCookieName() {
  return COOKIE_NAME;
}
