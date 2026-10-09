import {
  sanitizeAnalyticsProperties,
  type AnalyticsAdapter,
} from "@/lib/analytics/analytics";
import {
  getBrowserCampaignContext,
  type CampaignContext,
} from "@/lib/analytics/campaign";
import type {
  AnalyticsEventMap,
  AnalyticsEventName,
} from "@/lib/analytics/events";
import {
  getBrowserDataLayer,
  isGoogleTagManagerEventQueueEnabled,
  type GoogleDataLayer,
} from "@/lib/analytics/googleTagManager";

export const GTM_ANALYTICS_ENVELOPE = "costa_analytics" as const;

export type GtmAnalyticsEvent<EventName extends AnalyticsEventName = AnalyticsEventName> = {
  event: EventName;
  [GTM_ANALYTICS_ENVELOPE]: {
    event_name: EventName;
    properties: AnalyticsEventMap[EventName];
    campaign_context?: CampaignContext;
  };
};

type CreateGtmAdapterOptions = {
  isEnabled: () => boolean;
  getDataLayer: () => GoogleDataLayer | null;
  getCampaignContext: () => CampaignContext | null;
};

export function createGtmAnalyticsAdapter({
  isEnabled,
  getDataLayer,
  getCampaignContext,
}: CreateGtmAdapterOptions): AnalyticsAdapter {
  return {
    track(event, properties) {
      if (!isEnabled()) return;

      const dataLayer = getDataLayer();
      if (!dataLayer) return;

      const sanitizedProperties = sanitizeAnalyticsProperties(event, properties);
      const campaignContext = getCampaignContext();

      // GTM merges data layer state. Reset the complete envelope first so fields
      // from one event can never leak into a later event.
      dataLayer.push({ [GTM_ANALYTICS_ENVELOPE]: null });
      dataLayer.push({
        event,
        [GTM_ANALYTICS_ENVELOPE]: {
          event_name: event,
          properties: sanitizedProperties,
          ...(campaignContext ? { campaign_context: campaignContext } : {}),
        },
      } satisfies GtmAnalyticsEvent<typeof event>);
    },
  };
}

export const gtmAnalyticsAdapter = createGtmAnalyticsAdapter({
  isEnabled: isGoogleTagManagerEventQueueEnabled,
  getDataLayer: getBrowserDataLayer,
  getCampaignContext: getBrowserCampaignContext,
});
