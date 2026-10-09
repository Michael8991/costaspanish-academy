import {
  ANALYTICS_EVENT_PROPERTY_NAMES,
  type AnalyticsEventMap,
  type AnalyticsEventName,
  type AnalyticsTrackContract,
} from "@/lib/analytics/events";

type AnalyticsPropertyValue = string | number | boolean | null;

export type AnalyticsAdapter = {
  track: AnalyticsTrackContract;
};

export type AnalyticsRuntime = {
  track: AnalyticsTrackContract;
};

type CreateAnalyticsOptions = {
  isAnalyticsAllowed: () => boolean;
  adapters: readonly AnalyticsAdapter[];
};

function isAnalyticsPropertyValue(value: unknown): value is AnalyticsPropertyValue {
  return (
    value === null
    || typeof value === "string"
    || typeof value === "number"
    || typeof value === "boolean"
  );
}

export function sanitizeAnalyticsProperties<EventName extends AnalyticsEventName>(
  event: EventName,
  properties: AnalyticsEventMap[EventName],
): AnalyticsEventMap[EventName] {
  const source = properties as Record<string, unknown>;
  const sanitized: Record<string, AnalyticsPropertyValue> = {};

  for (const propertyName of ANALYTICS_EVENT_PROPERTY_NAMES[event]) {
    const value = source[propertyName];
    if (isAnalyticsPropertyValue(value)) {
      sanitized[propertyName] = value;
    }
  }

  return sanitized as AnalyticsEventMap[EventName];
}

export function createAnalytics({
  isAnalyticsAllowed,
  adapters,
}: CreateAnalyticsOptions): AnalyticsRuntime {
  const track: AnalyticsTrackContract = (event, properties) => {
    if (!isAnalyticsAllowed()) return;

    const sanitizedProperties = sanitizeAnalyticsProperties(event, properties);

    for (const adapter of adapters) {
      try {
        adapter.track(event, sanitizedProperties);
      } catch {
        // Analytics must never interrupt navigation, forms, or other user actions.
      }
    }
  };

  return { track };
}
