# CostaSpanish Analytics Event Taxonomy

## Status and scope

This document defines the provider-agnostic v1 event contract. The eight v1
events are instrumented through the internal analytics runtime and the Vercel
Analytics and GTM adapters. GA4 receives the GTM events after its manual tags
are configured and published. Meta and other advertising providers are not integrated.
Vercel Analytics pageviews remain separate from this taxonomy; there is
deliberately no generic `page_view` event.

Every runtime integration must check analytics consent before sending an event.
Revocation must prevent subsequent events from being sent.

## Naming conventions

- Event names and property names use `snake_case`.
- Controlled values come from the unions exported by `lib/analytics/events.ts`.
- `course_slug` is the public course identifier, never a full URL.
- `locale` is `en` or `es`.
- Campaign attribution is separate common context for the GTM adapter. UTM
  fields do not belong in individual event payloads or `AnalyticsEventMap`.

## V1 events

| Event | Trigger | Business purpose | Allowed properties |
| --- | --- | --- | --- |
| `course_view` | A public course detail page loads successfully. | Measure meaningful interest in a specific course without duplicating generic pageviews. | `course_slug`, optional `course_type`, `locale` |
| `course_cta_click` | A visitor selects a course-specific details, preinscription, or contact CTA. | Understand movement from course discovery to the next funnel step. | `course_slug`, `cta_type`, `source_section`, `locale` |
| `contact_start` | The first meaningful interaction with one contact form instance. Fire once per instance, not once per field. | Measure contact intent and form abandonment. | `source_section`, `locale` |
| `contact_submit` | The contact backend confirms a successful submission. Validation attempts and failures do not qualify. | Measure successfully delivered contact requests. | `source_section`, `locale` |
| `preinscription_start` | The first meaningful interaction with one course preinscription form instance. Fire once per instance. | Measure course-specific preinscription intent and abandonment. | `course_slug`, `locale` |
| `preinscription_submit` | The preinscription backend confirms success. Validation attempts and failures do not qualify. | Measure successfully delivered preinscriptions. | `course_slug`, `locale` |
| `external_platform_click` | A visitor follows a commercially relevant external platform link, such as Preply or a social profile. | Measure qualified exits to external acquisition and trust channels. | `platform`, `source_section`, `locale` |
| `contact_method_click` | A visitor activates a real `tel:` or `mailto:` contact link. | Measure direct lead intent not represented by form submissions. | `contact_method`, `source_section`, optional `course_slug`, `locale` |

## Controlled values

### `course_type`

`private`, `standard`, `semi_intensive`, `intensive`, `other`

Raw database modality values must be normalized to these stable values before a
future tracking call.

### `cta_type`

`details`, `preinscription`, `contact`, `other`

### `source_section`

`hero`, `courses`, `course_catalog`, `course_detail`, `reviews`, `footer`,
`contact`, `preinscription`, `navbar`, `other`

Use the semantic UI location, not a CSS selector or translated label. Home
course cards use `courses`; the Spanish catalogue uses `course_catalog`.

### `platform`

`preply`, `facebook`, `instagram`, `linkedin`, `student_portal`, `other`

The destination URL and its query string are never event properties.

### `contact_method`

`phone`, `email`

This describes the method only. The phone number or email address must never be
included.

## Privacy rules

Event payloads must never contain:

- first name, last name, full name, email address, phone number, or postal address;
- IP address or another user identifier;
- contact messages, free text, goals, notes, availability, or WhatsApp message;
- form values or Turnstile tokens;
- full URLs, query strings, or URL fragments;
- `utm_source`, `utm_medium`, or `utm_campaign` as event-specific properties.

The central TypeScript contract exposes none of these fields. The runtime
property catalogue and prohibited-property list provide a lightweight guard for
tests and future reviews.

## Current implementation points

- Course cards exist in Home and the Spanish course catalogue.
- Public course detail pages provide preinscription and contact CTAs.
- Contact and preinscription forms expose clear interaction and backend-success
  boundaries.
- Preply and social-platform links exist in reviews, the top navigation, and the
  footer.
- Phone and email links exist in the contact experience.
- WhatsApp is currently displayed only as text. There is no clickable WhatsApp
  action, so `whatsapp_click` is not a v1 event.

All instrumentation uses explicit payloads and the shared consent-aware runtime.
See `docs/analytics/runtime.md` for the runtime flow and component map.

## Future events

Future names are exported separately and are not keys of `AnalyticsEventMap`:

- `whatsapp_click` — add only when a real WhatsApp link or CTA exists;
- `level_test_start`;
- `level_test_complete`;
- `course_recommendation_view`;
- `trial_booking_start`;
- `trial_booking_submit`;
- `lead_created`;
- `student_converted`;
- `payment_recorded`.

Their properties and consent/provider routing must be designed when the related
features exist.
