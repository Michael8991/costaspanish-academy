# CostaSpanish Analytics Runtime

## Flow

```text
component
  -> useAnalytics().track(event, explicitProperties)
  -> current ConsentProvider analytics gate
  -> property allowlist and primitive-value filter
  -> provider adapters
  -> Vercel Analytics track()
```

`useAnalytics()` does not read cookies. It uses the reactive consent source and
its current ref-backed gate. A revocation therefore blocks the next call even
before React finishes a rerender. Vercel Analytics `beforeSend` remains a second
gate for queued pageviews and custom events.

## Runtime boundaries

- `lib/analytics/events.ts` owns event names, payload types, and controlled values.
- `lib/analytics/analytics.ts` owns consent gating, property filtering, and
  adapter failure isolation.
- `lib/analytics/providers/vercel.ts` is the only custom-event adapter for the
  installed Vercel Analytics package.
- `components/analytics/useAnalytics.ts` injects the existing consent source and
  the configured adapters.
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

## Providers

Only Vercel Analytics is configured. Adding GA4 or another provider later means
adding an adapter to the runtime configuration; event names and component
payloads must remain unchanged.
