"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { useConsent } from "@/components/cookies/ConsentProvider";
import {
  getBrowserDataLayer,
  isGoogleTagManagerEventQueueEnabled,
} from "@/lib/analytics/googleTagManager";
import { createVirtualPageViewTracker } from "@/lib/analytics/virtualPageView";

function containsTitleMutation(records: MutationRecord[]): boolean {
  return records.some((record) => {
    if (record.target instanceof HTMLTitleElement) return true;
    if (record.target.parentElement instanceof HTMLTitleElement) return true;

    // A removal alone can temporarily expose a parent-layout fallback title.
    // Wait for a title addition or text update before considering it committed.
    return [...record.addedNodes].some((node) => (
      node instanceof HTMLTitleElement
      || (node instanceof Element && node.querySelector("title"))
    ));
  });
}

export function GoogleVirtualPageView() {
  const pathname = usePathname();
  const { consent, initialized } = useConsent();
  const trackerRef = useRef(createVirtualPageViewTracker());
  const wasActiveRef = useRef(false);

  useEffect(() => {
    const tracker = trackerRef.current;
    const active = initialized
      && consent.analytics
      && isGoogleTagManagerEventQueueEnabled();

    if (!active) {
      tracker.reset(window.location.origin, pathname, document.title);
      wasActiveRef.current = false;
      return;
    }

    if (!wasActiveRef.current) {
      // The initial Google tag owns the current pageview. Establish a baseline
      // so accepting consent or hydrating never creates a duplicate.
      tracker.reset(window.location.origin, pathname, document.title);
      wasActiveRef.current = true;
      return;
    }

    const emitIfReady = () => {
      if (window.location.pathname !== pathname) return false;

      const event = tracker.capture(
        window.location.origin,
        pathname,
        document.title,
      );
      if (!event) return false;

      getBrowserDataLayer()?.push(event);
      return true;
    };

    if (emitIfReady()) return;

    const observer = new MutationObserver((records) => {
      if (containsTitleMutation(records) && emitIfReady()) {
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [consent.analytics, initialized, pathname]);

  return null;
}
