import { describe, expect, it } from "vitest";

import {
  ANALYTICS_EVENT_PROPERTY_NAMES,
  ANALYTICS_EVENTS,
  ANALYTICS_LOCALES,
  CONTACT_METHODS,
  COURSE_TYPES,
  CTA_TYPES,
  EXTERNAL_PLATFORMS,
  FUTURE_ANALYTICS_EVENT_NAMES,
  PROHIBITED_ANALYTICS_PROPERTY_NAMES,
  SOURCE_SECTIONS,
  V1_ANALYTICS_EVENT_NAMES,
  type AnalyticsEventMap,
  type AnalyticsEventName,
} from "@/lib/analytics/events";

const expectedV1Events = [
  "course_view",
  "course_cta_click",
  "contact_start",
  "contact_submit",
  "preinscription_start",
  "preinscription_submit",
  "external_platform_click",
  "contact_method_click",
] as const;

const typedExamples = {
  course_view: {
    course_slug: "clases-privadas-espanol",
    course_type: "private",
    locale: "es",
  },
  course_cta_click: {
    course_slug: "clases-privadas-espanol",
    cta_type: "preinscription",
    source_section: "course_detail",
    locale: "en",
  },
  contact_start: { source_section: "contact", locale: "es" },
  contact_submit: { source_section: "contact", locale: "es" },
  preinscription_start: {
    course_slug: "curso-intensivo-espanol-b1",
    locale: "en",
  },
  preinscription_submit: {
    course_slug: "curso-intensivo-espanol-b1",
    locale: "en",
  },
  external_platform_click: {
    platform: "preply",
    source_section: "reviews",
    locale: "es",
  },
  contact_method_click: {
    contact_method: "email",
    source_section: "preinscription",
    course_slug: "clases-privadas-espanol",
    locale: "en",
  },
} satisfies { [EventName in AnalyticsEventName]: AnalyticsEventMap[EventName] };

describe("analytics event taxonomy", () => {
  it("centralizes the exact v1 event names in snake_case", () => {
    expect(V1_ANALYTICS_EVENT_NAMES).toEqual(expectedV1Events);
    expect(new Set(V1_ANALYTICS_EVENT_NAMES).size).toBe(V1_ANALYTICS_EVENT_NAMES.length);

    for (const eventName of V1_ANALYTICS_EVENT_NAMES) {
      expect(eventName).toMatch(/^[a-z]+(?:_[a-z]+)*$/);
    }

    expect(Object.values(ANALYTICS_EVENTS)).toEqual(expectedV1Events);
  });

  it("keeps the runtime property catalogue aligned with every typed event", () => {
    expect(Object.keys(ANALYTICS_EVENT_PROPERTY_NAMES)).toEqual(expectedV1Events);
    expect(Object.keys(typedExamples)).toEqual(expectedV1Events);
  });

  it("uses unique, stable snake_case values for controlled dimensions", () => {
    const dimensions = [
      ANALYTICS_LOCALES,
      COURSE_TYPES,
      CTA_TYPES,
      SOURCE_SECTIONS,
      EXTERNAL_PLATFORMS,
      CONTACT_METHODS,
    ];

    for (const values of dimensions) {
      expect(new Set(values).size).toBe(values.length);
      for (const value of values) {
        expect(value).toMatch(/^[a-z]+(?:_[a-z]+)*$/);
      }
    }
  });

  it("does not expose prohibited PII or free-text properties", () => {
    const allowedProperties = new Set<string>(
      Object.values(ANALYTICS_EVENT_PROPERTY_NAMES).flat(),
    );

    for (const prohibited of PROHIBITED_ANALYTICS_PROPERTY_NAMES) {
      expect(allowedProperties.has(prohibited)).toBe(false);
    }
  });

  it("keeps future events separate from the v1 contract", () => {
    const v1Events = new Set<string>(V1_ANALYTICS_EVENT_NAMES);

    expect(FUTURE_ANALYTICS_EVENT_NAMES).toEqual([
      "whatsapp_click",
      "level_test_start",
      "level_test_complete",
      "course_recommendation_view",
      "trial_booking_start",
      "trial_booking_submit",
      "lead_created",
      "student_converted",
      "payment_recorded",
    ]);

    for (const futureEvent of FUTURE_ANALYTICS_EVENT_NAMES) {
      expect(v1Events.has(futureEvent)).toBe(false);
      expect(futureEvent).toMatch(/^[a-z]+(?:_[a-z]+)*$/);
      expect(futureEvent).not.toBe("page_view");
    }
  });
});
