"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { useConsent } from "@/components/cookies/ConsentProvider";
import {
  parseCampaignTouch,
  synchronizeCampaignContext,
  type CampaignTouch,
} from "@/lib/analytics/campaign";

export function CampaignContextManager() {
  const searchParams = useSearchParams();
  const { consent, initialized } = useConsent();
  const firstTouchInMemory = useRef<CampaignTouch | null>(null);
  const lastTouchInMemory = useRef<CampaignTouch | null>(null);
  const previouslyAllowed = useRef(false);
  const serializedSearch = searchParams.toString();
  const currentTouch = useMemo(
    () => parseCampaignTouch(new URLSearchParams(serializedSearch)),
    [serializedSearch],
  );

  useEffect(() => {
    if (currentTouch) {
      firstTouchInMemory.current ??= currentTouch;
      lastTouchInMemory.current = currentTouch;
    }

    if (!initialized) return;

    if (!consent.analytics) {
      synchronizeCampaignContext(window.sessionStorage, false, null, null);

      if (previouslyAllowed.current) {
        firstTouchInMemory.current = currentTouch;
        lastTouchInMemory.current = currentTouch;
      }

      previouslyAllowed.current = false;
      return;
    }

    const context = synchronizeCampaignContext(
      window.sessionStorage,
      true,
      firstTouchInMemory.current,
      lastTouchInMemory.current,
    );

    if (context) {
      firstTouchInMemory.current = context.first_touch;
      lastTouchInMemory.current = context.last_touch;
    }

    previouslyAllowed.current = true;
  }, [consent.analytics, currentTouch, initialized]);

  return null;
}
