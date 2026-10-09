"use client";

import { useEffect } from "react";

import { useConsent } from "@/components/cookies/ConsentProvider";
import { prepareBrowserCampaignContextForBootstrap } from "@/lib/analytics/campaign";
import {
  canLoadGoogleTagManager,
  getBrowserDataLayer,
  initializeGoogleConsentMode,
  loadGoogleTagManager,
  setGoogleTagManagerEventQueueEnabled,
  updateGoogleConsentMode,
  type GoogleTagManagerConfig,
} from "@/lib/analytics/googleTagManager";

type GoogleTagManagerLoaderProps = {
  config: GoogleTagManagerConfig;
};

export function GoogleTagManagerLoader({ config }: GoogleTagManagerLoaderProps) {
  const { consent, initialized } = useConsent();

  useEffect(() => {
    const dataLayer = getBrowserDataLayer();
    if (dataLayer) initializeGoogleConsentMode(dataLayer);

    return () => setGoogleTagManagerEventQueueEnabled(false);
  }, []);

  useEffect(() => {
    if (!initialized) {
      setGoogleTagManagerEventQueueEnabled(false);
      return;
    }

    const dataLayer = getBrowserDataLayer();
    if (!dataLayer) return;

    if (!canLoadGoogleTagManager(config, initialized, consent.analytics)) {
      setGoogleTagManagerEventQueueEnabled(false);
      updateGoogleConsentMode(dataLayer, false, consent.marketing);
      return;
    }

    updateGoogleConsentMode(dataLayer, true, consent.marketing);
    // This runs only after consent. It also covers an already-consented visitor
    // landing on a campaign URL before the route observer has persisted it.
    const campaignContext = prepareBrowserCampaignContextForBootstrap(
      consent.analytics,
    );
    const loaded = loadGoogleTagManager(
      config.gtmId,
      campaignContext?.first_touch ?? null,
    );
    setGoogleTagManagerEventQueueEnabled(loaded);
  }, [config, consent.analytics, consent.marketing, initialized]);

  return null;
}
