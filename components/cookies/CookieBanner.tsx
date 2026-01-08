"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  readConsentClient,
  writeConsentClient,
  CookieConsent
} from "@/lib/cookies/consent";

type Props = {
  policyHref: string; 
};

export default function CookieBanner({ policyHref }: Props) {
  const t = useTranslations("cookies.banner");

  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"simple" | "custom">("simple");
  const [analytics, setAnalytics] = useState(false);

  
  useEffect(() => {
    const existing = readConsentClient();
    if (!existing) {
      setVisible(true);
      setAnalytics(false);
      return;
    }
    
    setVisible(false);
  }, []);

  function acceptAnalytics() {
    const consent: CookieConsent = { necessary: true, analytics: true };
    writeConsentClient(consent);
    setVisible(false);
  }

  function rejectAnalytics() {
    const consent: CookieConsent = { necessary: true, analytics: false };
    writeConsentClient(consent);
    setVisible(false);
  }

  function saveCustom() {
    const consent: CookieConsent = { necessary: true, analytics };
    writeConsentClient(consent);
    setVisible(false);
  }

  // Exponer una forma simple de reabrir el banner desde cualquier sitio:
  // window.dispatchEvent(new Event("cookies:open"))
  useEffect(() => {
    const handler = () => {
      const existing = readConsentClient();
      setAnalytics(Boolean(existing?.analytics));
      setMode("custom");
      setVisible(true);
    };
    window.addEventListener("cookies:open", handler);
    return () => window.removeEventListener("cookies:open", handler);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold">{t("title")}</p>
            <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
              {t("text")}{" "}
              <a
                href={policyHref}
                className="underline underline-offset-2 text-neutral-900 dark:text-neutral-100"
              >
                {t("policy")}
              </a>
              .
            </p>
          </div>
        </div>

        {mode === "simple" ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={acceptAnalytics}
              className="rounded-md bg-black px-3 py-2 text-sm text-white"
            >
              {t("accept")}
            </button>

            <button
              onClick={rejectAnalytics}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700"
            >
              {t("reject")}
            </button>

            <button
              onClick={() => setMode("custom")}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700"
            >
              {t("customize")}
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{t("necessary")}</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {t("necessary")}
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full border dark:border-neutral-700">
                ON
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{t("analytics")}</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {t("analytics")}
                </p>
              </div>

              <button
                onClick={() => setAnalytics((v) => !v)}
                className={`h-7 w-12 rounded-full border px-1 transition ${
                  analytics ? "bg-black" : "bg-transparent"
                }`}
                aria-pressed={analytics}
                aria-label={t("analytics")}
              >
                <span
                  className={`block h-5 w-5 rounded-full bg-white transition ${
                    analytics ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={saveCustom}
                className="rounded-md bg-black px-3 py-2 text-sm text-white"
              >
                {t("save")}
              </button>

              <button
                onClick={() => setMode("simple")}
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700"
              >
                {t("reject")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
