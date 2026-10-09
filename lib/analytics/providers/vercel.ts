import { track as vercelTrack } from "@vercel/analytics";

import type { AnalyticsAdapter } from "@/lib/analytics/analytics";

type VercelPropertyValue = string | number | boolean | null | undefined;

function toVercelProperties(properties: object): Record<string, VercelPropertyValue> {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined),
  ) as Record<string, VercelPropertyValue>;
}

export const vercelAnalyticsAdapter: AnalyticsAdapter = {
  track(event, properties) {
    vercelTrack(event, toVercelProperties(properties));
  },
};
