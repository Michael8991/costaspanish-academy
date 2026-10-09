export const ANALYTICS_EVENTS = {
  COURSE_VIEW: "course_view",
  COURSE_CTA_CLICK: "course_cta_click",
  CONTACT_START: "contact_start",
  CONTACT_SUBMIT: "contact_submit",
  PREINSCRIPTION_START: "preinscription_start",
  PREINSCRIPTION_SUBMIT: "preinscription_submit",
  EXTERNAL_PLATFORM_CLICK: "external_platform_click",
  CONTACT_METHOD_CLICK: "contact_method_click",
} as const;

export const V1_ANALYTICS_EVENT_NAMES = [
  ANALYTICS_EVENTS.COURSE_VIEW,
  ANALYTICS_EVENTS.COURSE_CTA_CLICK,
  ANALYTICS_EVENTS.CONTACT_START,
  ANALYTICS_EVENTS.CONTACT_SUBMIT,
  ANALYTICS_EVENTS.PREINSCRIPTION_START,
  ANALYTICS_EVENTS.PREINSCRIPTION_SUBMIT,
  ANALYTICS_EVENTS.EXTERNAL_PLATFORM_CLICK,
  ANALYTICS_EVENTS.CONTACT_METHOD_CLICK,
] as const;

export const ANALYTICS_LOCALES = ["en", "es"] as const;

export const COURSE_TYPES = [
  "private",
  "standard",
  "semi_intensive",
  "intensive",
  "other",
] as const;

export const CTA_TYPES = [
  "details",
  "preinscription",
  "contact",
  "other",
] as const;

export const SOURCE_SECTIONS = [
  "hero",
  "courses",
  "course_catalog",
  "course_detail",
  "reviews",
  "footer",
  "contact",
  "preinscription",
  "navbar",
  "other",
] as const;

export const EXTERNAL_PLATFORMS = [
  "preply",
  "facebook",
  "instagram",
  "linkedin",
  "student_portal",
  "other",
] as const;

export const CONTACT_METHODS = ["phone", "email"] as const;

export const FUTURE_ANALYTICS_EVENT_NAMES = [
  "whatsapp_click",
  "level_test_start",
  "level_test_complete",
  "course_recommendation_view",
  "trial_booking_start",
  "trial_booking_submit",
  "lead_created",
  "student_converted",
  "payment_recorded",
] as const;

export const PROHIBITED_ANALYTICS_PROPERTY_NAMES = [
  "first_name",
  "last_name",
  "full_name",
  "email",
  "phone",
  "address",
  "ip",
  "message",
  "text_message",
  "contact_message",
  "goals",
  "notes",
  "availability",
  "whatsapp_message",
  "url",
  "query_string",
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;

export type AnalyticsEventName = (typeof V1_ANALYTICS_EVENT_NAMES)[number];
export type FutureAnalyticsEventName = (typeof FUTURE_ANALYTICS_EVENT_NAMES)[number];
export type Locale = (typeof ANALYTICS_LOCALES)[number];
export type CourseType = (typeof COURSE_TYPES)[number];
export type CtaType = (typeof CTA_TYPES)[number];
export type SourceSection = (typeof SOURCE_SECTIONS)[number];
export type ExternalPlatform = (typeof EXTERNAL_PLATFORMS)[number];
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type AnalyticsEventMap = {
  [ANALYTICS_EVENTS.COURSE_VIEW]: {
    course_slug: string;
    course_type?: CourseType;
    locale: Locale;
  };
  [ANALYTICS_EVENTS.COURSE_CTA_CLICK]: {
    course_slug: string;
    cta_type: CtaType;
    source_section: SourceSection;
    locale: Locale;
  };
  [ANALYTICS_EVENTS.CONTACT_START]: {
    source_section: SourceSection;
    locale: Locale;
  };
  [ANALYTICS_EVENTS.CONTACT_SUBMIT]: {
    source_section: SourceSection;
    locale: Locale;
  };
  [ANALYTICS_EVENTS.PREINSCRIPTION_START]: {
    course_slug: string;
    locale: Locale;
  };
  [ANALYTICS_EVENTS.PREINSCRIPTION_SUBMIT]: {
    course_slug: string;
    locale: Locale;
  };
  [ANALYTICS_EVENTS.EXTERNAL_PLATFORM_CLICK]: {
    platform: ExternalPlatform;
    source_section: SourceSection;
    locale: Locale;
  };
  [ANALYTICS_EVENTS.CONTACT_METHOD_CLICK]: {
    contact_method: ContactMethod;
    source_section: SourceSection;
    course_slug?: string;
    locale: Locale;
  };
};

export const ANALYTICS_EVENT_PROPERTY_NAMES = {
  [ANALYTICS_EVENTS.COURSE_VIEW]: ["course_slug", "course_type", "locale"],
  [ANALYTICS_EVENTS.COURSE_CTA_CLICK]: [
    "course_slug",
    "cta_type",
    "source_section",
    "locale",
  ],
  [ANALYTICS_EVENTS.CONTACT_START]: ["source_section", "locale"],
  [ANALYTICS_EVENTS.CONTACT_SUBMIT]: ["source_section", "locale"],
  [ANALYTICS_EVENTS.PREINSCRIPTION_START]: ["course_slug", "locale"],
  [ANALYTICS_EVENTS.PREINSCRIPTION_SUBMIT]: ["course_slug", "locale"],
  [ANALYTICS_EVENTS.EXTERNAL_PLATFORM_CLICK]: [
    "platform",
    "source_section",
    "locale",
  ],
  [ANALYTICS_EVENTS.CONTACT_METHOD_CLICK]: [
    "contact_method",
    "source_section",
    "course_slug",
    "locale",
  ],
} as const satisfies Record<AnalyticsEventName, readonly string[]>;

type PropertyCatalogMatchesEventMap = {
  [EventName in AnalyticsEventName]:
    Exclude<
      keyof AnalyticsEventMap[EventName],
      (typeof ANALYTICS_EVENT_PROPERTY_NAMES)[EventName][number]
    > extends never
      ? Exclude<
          (typeof ANALYTICS_EVENT_PROPERTY_NAMES)[EventName][number],
          keyof AnalyticsEventMap[EventName]
        > extends never
        ? true
        : false
      : false;
}[AnalyticsEventName];

type AssertAllPropertiesAreCatalogued<T extends true> = T;
export type AnalyticsPropertyCatalogIsInSync = AssertAllPropertiesAreCatalogued<
  PropertyCatalogMatchesEventMap
>;

export type AnalyticsEventProperties<EventName extends AnalyticsEventName> =
  AnalyticsEventMap[EventName];

export type AnalyticsEvent<EventName extends AnalyticsEventName = AnalyticsEventName> =
  EventName extends AnalyticsEventName
    ? {
        name: EventName;
        properties: AnalyticsEventMap[EventName];
      }
    : never;

export type AnalyticsTrackContract = <EventName extends AnalyticsEventName>(
  event: EventName,
  properties: AnalyticsEventMap[EventName],
) => void;
