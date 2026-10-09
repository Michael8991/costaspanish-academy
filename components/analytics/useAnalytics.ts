"use client";

import { useMemo } from "react";

import { useConsent } from "@/components/cookies/ConsentProvider";
import { createAnalytics, type AnalyticsRuntime } from "@/lib/analytics/analytics";
import { gtmAnalyticsAdapter } from "@/lib/analytics/providers/gtm";
import { vercelAnalyticsAdapter } from "@/lib/analytics/providers/vercel";

export type UseAnalyticsResult = AnalyticsRuntime & {
  enabled: boolean;
};

export function useAnalytics(): UseAnalyticsResult {
  const { consent, initialized, isAnalyticsAllowed } = useConsent();
  const runtime = useMemo(
    () => createAnalytics({
      isAnalyticsAllowed,
      adapters: [vercelAnalyticsAdapter, gtmAnalyticsAdapter],
    }),
    [isAnalyticsAllowed],
  );
  const enabled = initialized && consent.analytics;

  return useMemo(
    () => ({ track: runtime.track, enabled }),
    [enabled, runtime.track],
  );
}
