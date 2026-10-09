# CostaSpanish Analytics Runtime

## Flow

```text
component
  -> useAnalytics().track(event, explicitProperties)
  -> current ConsentProvider analytics gate
  -> property allowlist and primitive-value filter
  -> provider adapters
     |-> Vercel Analytics track()
     `-> GTM dataLayer -> GA4
```

`useAnalytics()` does not read cookies. It uses the reactive consent source and
its current ref-backed gate. A revocation therefore blocks the next call even
before React finishes a rerender. Vercel Analytics `beforeSend` remains a second
gate for queued pageviews and custom events.

## Runtime boundaries

- `lib/analytics/events.ts` owns event names, payload types, and controlled values.
- `lib/analytics/analytics.ts` owns consent gating, property filtering, and
  adapter failure isolation.
- `lib/analytics/providers/vercel.ts` forwards the existing clean v1 event to
  Vercel Analytics.
- `lib/analytics/providers/gtm.ts` forwards the same event contract to the
  namespaced GTM data layer and adds approved session campaign context.
- `lib/analytics/googleTagManager.ts` owns environment gating, Consent Mode v2,
  the data layer, and idempotent script loading.
- `lib/analytics/campaign.ts` owns the UTM allowlist and versioned session
  first/last-touch context.
- `components/analytics/useAnalytics.ts` injects the existing consent source and
  the configured adapters.
- `components/analytics/GoogleVirtualPageView.tsx` is provider infrastructure,
  not a business-event component. It waits for both the committed App Router
  pathname and the updated document title before queuing the GTM-only technical
  `costa_virtual_page_view` event.
- Components call only the internal hook or a shared tracked link component.

No component imports Vercel's custom-event function directly.

## Instrumentation rules

- `course_view` waits for consent hydration and is deduplicated by locale and
  course slug.
- Form `start` events require a real field value change and fire once per mounted
  form instance.
- Form `submit` events occur only after the corresponding API reports success.
- Link tracking never prevents default navigation, waits for analytics, or adds
  an artificial delay.
- Every component constructs a small explicit payload. Form data, course
  objects, URLs, and query parameters are never forwarded.
- Adapter errors are swallowed without user-facing output or PII logging.

## Course-type normalization

The mapping is explicit and independent of display labels:

| Domain modality | Analytics value |
| --- | --- |
| `Private` | `private` |
| `Standar` | `standard` |
| `SemiIntensive` | `semi_intensive` |
| `Intensive` | `intensive` |
| Unknown or absent | `other` |

## Providers and consent

Vercel Analytics and GTM use the same reactive analytics-consent gate. GTM uses
Basic Consent Mode: its script is not requested before consent. The local data
layer receives a default-denied state first, then a granted update, and only
then an optional first-touch campaign context followed by the GTM bootstrap
entry. Revocation blocks new internal events immediately and queues a denied
consent update; it does not remove an already loaded script.

Vercel receives only the original v1 event. GTM receives that event plus the
separate campaign context documented in `gtm-ga4-setup.md`.
