"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useLocale } from "next-intl";

import { useAnalytics } from "@/components/analytics/useAnalytics";
import { normalizeAnalyticsLocale } from "@/lib/analytics/normalization";
import type { ExternalPlatform, SourceSection } from "@/lib/analytics/events";

type TrackedExternalLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "onClick"
> & {
  platform: ExternalPlatform;
  sourceSection: SourceSection;
};

export function TrackedExternalLink({
  platform,
  sourceSection,
  children,
  ...anchorProps
}: TrackedExternalLinkProps) {
  const locale = normalizeAnalyticsLocale(useLocale());
  const analytics = useAnalytics();

  return (
    <a
      {...anchorProps}
      onClick={() => analytics.track("external_platform_click", {
        platform,
        source_section: sourceSection,
        locale,
      })}
    >
      {children}
    </a>
  );
}
