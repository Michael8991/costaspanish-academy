export type CookieConsent = {
  version: 1;
  necessary: true; 
  analytics: boolean;
};

const COOKIE_NAME = "cookie_consent";
const MAX_AGE = 60 * 60 * 24 * 365; 

type StoredConsent = Partial<CookieConsent> & {
  version?: number;
};

export function parseConsent(raw: string): CookieConsent | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as StoredConsent;
    if (parsed.necessary !== true || typeof parsed.analytics !== "boolean") {
      return null;
    }

    if (parsed.version !== undefined && parsed.version !== 1) {
      return null;
    }

    return { version: 1, necessary: true, analytics: parsed.analytics };
  } catch {
    return null;
  }
}

export function readConsentClient(): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];

  if (!raw) return null;

  return parseConsent(raw);
}

export function writeConsentClient(consent: CookieConsent) {
  if (typeof document === "undefined") return;

  const value = encodeURIComponent(JSON.stringify(consent));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
}

export function clearConsentClient() {
  if (typeof document === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

export function consentCookieName() {
  return COOKIE_NAME;
}
