import { describe, expect, it, vi } from "vitest";

import {
  createAnalytics,
  sanitizeAnalyticsProperties,
  type AnalyticsAdapter,
} from "@/lib/analytics/analytics";
import { normalizeCourseType } from "@/lib/analytics/normalization";

function createAdapter() {
  const track = vi.fn();
  return {
    adapter: { track } as AnalyticsAdapter,
    track,
  };
}

describe("analytics runtime", () => {
  it("does not call an adapter without analytics consent", () => {
    const { adapter, track } = createAdapter();
    const analytics = createAnalytics({
      isAnalyticsAllowed: () => false,
      adapters: [adapter],
    });

    analytics.track("contact_start", {
      source_section: "contact",
      locale: "es",
    });

    expect(track).not.toHaveBeenCalled();
  });

  it("sends consented events and preserves their allowed properties", () => {
    const { adapter, track } = createAdapter();
    const analytics = createAnalytics({
      isAnalyticsAllowed: () => true,
      adapters: [adapter],
    });
    const properties = {
      course_slug: "clases-privadas-espanol",
      course_type: "private" as const,
      locale: "es" as const,
    };

    analytics.track("course_view", properties);

    expect(track).toHaveBeenCalledOnce();
    expect(track).toHaveBeenCalledWith("course_view", properties);
  });

  it("blocks subsequent events immediately after consent is revoked", () => {
    let allowed = true;
    const { adapter, track } = createAdapter();
    const analytics = createAnalytics({
      isAnalyticsAllowed: () => allowed,
      adapters: [adapter],
    });

    analytics.track("contact_start", {
      source_section: "contact",
      locale: "en",
    });
    allowed = false;
    analytics.track("contact_submit", {
      source_section: "contact",
      locale: "en",
    });

    expect(track).toHaveBeenCalledOnce();
    expect(track).toHaveBeenCalledWith("contact_start", {
      source_section: "contact",
      locale: "en",
    });
  });

  it("removes non-contract and non-primitive properties defensively", () => {
    const unsafeProperties = {
      course_slug: "clases-privadas-espanol",
      locale: "es",
      email: "private@example.com",
      nested: { message: "private" },
    } as never;

    expect(sanitizeAnalyticsProperties("course_view", unsafeProperties)).toEqual({
      course_slug: "clases-privadas-espanol",
      locale: "es",
    });
  });

  it("isolates adapter failures from user actions and other adapters", () => {
    const failingAdapter = {
      track: vi.fn(() => {
        throw new Error("adapter failed");
      }),
    } as AnalyticsAdapter;
    const { adapter, track } = createAdapter();
    const analytics = createAnalytics({
      isAnalyticsAllowed: () => true,
      adapters: [failingAdapter, adapter],
    });

    expect(() => analytics.track("contact_start", {
      source_section: "contact",
      locale: "es",
    })).not.toThrow();
    expect(track).toHaveBeenCalledOnce();
  });
});

describe("course type normalization", () => {
  it.each([
    ["Private", "private"],
    ["Standar", "standard"],
    ["SemiIntensive", "semi_intensive"],
    ["Intensive", "intensive"],
  ] as const)("maps %s to %s", (source, expected) => {
    expect(normalizeCourseType(source)).toBe(expected);
  });

  it.each([undefined, null, "Group", "private", 42])(
    "maps unknown modality %s to other",
    (source) => {
      expect(normalizeCourseType(source)).toBe("other");
    },
  );
});
