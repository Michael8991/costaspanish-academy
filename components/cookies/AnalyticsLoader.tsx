"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/react";

import { useConsent } from "@/components/cookies/ConsentProvider";

export function filterAnalyticsEvent<T>(allowed: boolean, event: T): T | null {
  return allowed ? event : null;
}

export default function AnalyticsLoader() {
  const { analyticsActivated, isAnalyticsAllowed } = useConsent();

  if (!analyticsActivated) return null;

  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => (
        filterAnalyticsEvent(isAnalyticsAllowed(), event)
      )}
    />
  );
}
