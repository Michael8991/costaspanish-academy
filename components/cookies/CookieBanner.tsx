"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useConsent } from "@/components/cookies/ConsentProvider";

type Props = {
  policyHref: string;
};

type PreferenceToggleProps = {
  checked: boolean;
  description: string;
  label: string;
  onChange: () => void;
};

function PreferenceToggle({ checked, description, label, onChange }: PreferenceToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`h-7 w-12 rounded-full border px-1 transition ${
          checked ? "bg-black" : "bg-transparent"
        }`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

type PreferencesPanelProps = {
  analytics: boolean;
  canClose: boolean;
  marketing: boolean;
  onClose: () => void;
  onReject: () => void;
  onSave: (analytics: boolean, marketing: boolean) => void;
};

function PreferencesPanel({
  analytics: initialAnalytics,
  canClose,
  marketing: initialMarketing,
  onClose,
  onReject,
  onSave,
}: PreferencesPanelProps) {
  const t = useTranslations("cookies.banner");
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [marketing, setMarketing] = useState(initialMarketing);

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">{t("necessaryTitle")}</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {t("necessaryDescription")}
          </p>
        </div>
        <span className="rounded-full border px-2 py-1 text-xs font-semibold dark:border-neutral-700">
          {t("alwaysActive")}
        </span>
      </div>

      <PreferenceToggle
        checked={analytics}
        description={t("analyticsDescription")}
        label={t("analyticsTitle")}
        onChange={() => setAnalytics((value) => !value)}
      />

      <PreferenceToggle
        checked={marketing}
        description={t("marketingDescription")}
        label={t("marketingTitle")}
        onChange={() => setMarketing((value) => !value)}
      />

      <div className="flex flex-wrap gap-2 pt-2">
        <button
          type="button"
          onClick={() => onSave(analytics, marketing)}
          className="rounded-md bg-black px-3 py-2 text-sm text-white"
        >
          {t("save")}
        </button>
        <button
          type="button"
          onClick={onReject}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700"
        >
          {t("reject")}
        </button>
        {canClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700"
          >
            {t("cancel")}
          </button>
        )}
      </div>
    </div>
  );
}

export default function CookieBanner({ policyHref }: Props) {
  const t = useTranslations("cookies.banner");
  const {
    consent,
    initialized,
    hasStoredConsent,
    preferencesOpen,
    acceptAll,
    rejectAll,
    updatePreferences,
    openPreferences,
    closePreferences,
  } = useConsent();

  if (!initialized || (hasStoredConsent && !preferencesOpen)) return null;

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
                className="text-neutral-900 underline underline-offset-2 dark:text-neutral-100"
              >
                {t("policy")}
              </a>
              .
            </p>
          </div>
        </div>

        {preferencesOpen ? (
          <PreferencesPanel
            key={consent.updatedAt}
            analytics={consent.analytics}
            marketing={consent.marketing}
            canClose={hasStoredConsent}
            onClose={closePreferences}
            onReject={rejectAll}
            onSave={(analytics, marketing) => updatePreferences({ analytics, marketing })}
          />
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-md bg-black px-3 py-2 text-sm text-white"
            >
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700"
            >
              {t("reject")}
            </button>
            <button
              type="button"
              onClick={openPreferences}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700"
            >
              {t("customize")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
