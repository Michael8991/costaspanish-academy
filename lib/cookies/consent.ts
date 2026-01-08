export type CookieConsent = {
  necessary: true; 
  analytics: boolean;
};

const COOKIE_NAME = "cookie_consent";
const MAX_AGE = 60 * 60 * 24 * 365; 

export function readConsentClient(): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];

  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw)) as CookieConsent;
  } catch {
    return null;
  }
}

export function writeConsentClient(consent: CookieConsent) {
  if (typeof document === "undefined") return;

  const value = encodeURIComponent(JSON.stringify(consent));
  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
}

export function clearConsentClient() {
  if (typeof document === "undefined") return;

  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function consentCookieName() {
  return COOKIE_NAME;
}
