# GTM + GA4 setup

This runbook separates what is enforced by source code from what Michael must
configure in the Google interfaces. Do not publish the GTM container until the
preview checks at the end pass.

## Source code tasks (implemented)

- Consent cookie version 3 requires a fresh choice from v1/v2 users.
- Basic Consent Mode v2 initializes locally as denied. GTM is not requested and
  Google receives no analytics request before analytics consent.
- Analytics consent grants only `analytics_storage`. `ad_storage`,
  `ad_user_data`, and `ad_personalization` always remain denied in this phase.
- A valid `NEXT_PUBLIC_GTM_ID` is required. Local development is disabled;
  production and an explicitly configured Vercel preview can activate GTM.
- The eight typed v1 events use the existing central runtime. No component uses
  `gtag`, GA4, or GTM directly.
- Only the five allowlisted UTM parameters are retained in `sessionStorage`
  after consent. Revocation removes `costaspanish_campaign_context`.
- When first touch exists, its native GA4 campaign mapping is pushed before
  `gtm.js`, after consent has been granted. Nothing is pushed or persisted for
  campaign attribution before analytics consent.

## Data layer contract

When a consented first touch exists, the application pushes this bootstrap
context before `gtm.js`:

```js
{
  costa_campaign: {
    campaign_source: "newsletter",
    campaign_medium: "email",
    campaign_name: "autumn",
    campaign_content: "hero",
    campaign_term: "spanish course"
  }
}
```

The source mapping is `utm_source` -> `campaign_source`, `utm_medium` ->
`campaign_medium`, `utm_campaign` -> `campaign_name`, `utm_content` ->
`campaign_content`, and `utm_term` -> `campaign_term`. Missing values are
omitted. If first touch is absent, the complete `costa_campaign` push is omitted;
the application does not invent `direct`, `organic`, or `referral` values.

Every business event is preceded by an envelope reset:

```js
{ costa_analytics: null }
```

The next push has this stable shape:

```js
{
  event: "course_cta_click",
  costa_analytics: {
    event_name: "course_cta_click",
    properties: {
      course_slug: "clases-privadas-espanol",
      cta_type: "preinscription",
      source_section: "course_detail",
      locale: "es"
    },
    campaign_context: {
      version: 1,
      first_touch: {
        utm_source: "newsletter",
        utm_medium: "email",
        utm_campaign: "autumn"
      },
      last_touch: {
        utm_source: "newsletter",
        utm_medium: "email",
        utm_campaign: "autumn"
      }
    }
  }
}
```

`campaign_context` is `null` when the session has no valid campaign. The reset
prevents a property such as `course_type` from being inherited by a later
`contact_submit`. Campaign teams must never put PII in UTM values.

## Manual GTM/GA4 UI tasks

### 1. Create the Google resources

1. In Google Analytics Admin, create or verify the CostaSpanish GA4 property.
2. Under **Data collection and modification > Data streams**, create or verify
   the Web stream for the production site. Copy its `G-XXXXXXXXXX` Measurement ID.
3. In Google Tag Manager, create a **Web** container for the site. Copy its
   `GTM-XXXXXXX` container ID.
4. Do not add Google Ads, remarketing, Enhanced Conversions, user IDs, or any
   other provider in this phase.

### 2. Configure environments

1. In Vercel Production, set `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` to the real container.
2. Leave the variable unset in Development.
3. For Preview, leave it unset by default. Set an approved test container ID
   only on previews intended for analytics QA. A configured preview ID is an
   explicit opt-in.
4. Redeploy after changing this build-time public variable.

### 3. Create the Google tag in GTM

1. Create a **Google tag** using the GA4 `G-XXXXXXXXXX` Tag ID.
2. Trigger it on **Initialization - All Pages**. Since the application loads the
   entire GTM container only after consent, the tag cannot run beforehand.
3. Leave the initial page-view behavior enabled for this one Google tag.
4. Under **Configuration settings**, add these five parameters and variables:
   - `campaign_source` = `{{DLV - bootstrap campaign source}}`
   - `campaign_medium` = `{{DLV - bootstrap campaign medium}}`
   - `campaign_name` = `{{DLV - bootstrap campaign name}}`
   - `campaign_content` = `{{DLV - bootstrap campaign content}}`
   - `campaign_term` = `{{DLV - bootstrap campaign term}}`
5. Do not configure default values for those variables. When first touch is
   absent, they must remain `undefined` so no campaign field is established.
6. In **Consent Settings**, verify the built-in Google consent checks are shown.
   Do not add or grant advertising consent. The application supplies the
   Consent Mode default and update before the container starts.

### 4. Create Data Layer Variables

Create Version 2 Data Layer Variables with these exact names and paths:

| Suggested GTM variable | Data Layer Variable Name |
| --- | --- |
| `DLV - bootstrap campaign source` | `costa_campaign.campaign_source` |
| `DLV - bootstrap campaign medium` | `costa_campaign.campaign_medium` |
| `DLV - bootstrap campaign name` | `costa_campaign.campaign_name` |
| `DLV - bootstrap campaign content` | `costa_campaign.campaign_content` |
| `DLV - bootstrap campaign term` | `costa_campaign.campaign_term` |
| `DLV - event name` | `costa_analytics.event_name` |
| `DLV - course slug` | `costa_analytics.properties.course_slug` |
| `DLV - course type` | `costa_analytics.properties.course_type` |
| `DLV - CTA type` | `costa_analytics.properties.cta_type` |
| `DLV - source section` | `costa_analytics.properties.source_section` |
| `DLV - locale` | `costa_analytics.properties.locale` |
| `DLV - platform` | `costa_analytics.properties.platform` |
| `DLV - contact method` | `costa_analytics.properties.contact_method` |
| `DLV - first source` | `costa_analytics.campaign_context.first_touch.utm_source` |
| `DLV - first medium` | `costa_analytics.campaign_context.first_touch.utm_medium` |
| `DLV - first campaign` | `costa_analytics.campaign_context.first_touch.utm_campaign` |
| `DLV - first content` | `costa_analytics.campaign_context.first_touch.utm_content` |
| `DLV - first term` | `costa_analytics.campaign_context.first_touch.utm_term` |
| `DLV - last source` | `costa_analytics.campaign_context.last_touch.utm_source` |
| `DLV - last medium` | `costa_analytics.campaign_context.last_touch.utm_medium` |
| `DLV - last campaign` | `costa_analytics.campaign_context.last_touch.utm_campaign` |
| `DLV - last content` | `costa_analytics.campaign_context.last_touch.utm_content` |
| `DLV - last term` | `costa_analytics.campaign_context.last_touch.utm_term` |

### 5. Create the business-event trigger and GA4 Event tag

1. Create one **Custom Event** trigger with **Use regex matching** enabled and:

   ```text
   ^(course_view|course_cta_click|contact_start|contact_submit|preinscription_start|preinscription_submit|external_platform_click|contact_method_click)$
   ```

2. Create one **Google Analytics: GA4 Event** tag connected to the Google tag.
3. Set **Event Name** to `{{DLV - event name}}`.
4. Add the seven event parameters using the same GA4 parameter names:
   `course_slug`, `course_type`, `cta_type`, `source_section`, `locale`,
   `platform`, and `contact_method`. Map each to its DLV. Variables that are
   undefined for an event must not be populated with defaults.
5. Add the ten campaign values under distinct parameter names:
   `first_utm_source`, `first_utm_medium`, `first_utm_campaign`,
   `first_utm_content`, `first_utm_term`, `last_utm_source`, `last_utm_medium`,
   `last_utm_campaign`, `last_utm_content`, and `last_utm_term`.
6. Use the Custom Event trigger from step 1. Do not create duplicate component
   instrumentation or additional tags for the same eight events.

### 6. Configure SPA pageviews exactly once

Use this single approach:

1. Keep the initial page view emitted by the Google tag from step 3.
2. In the GA4 Web stream, open **Enhanced measurement > Page views > Show
   advanced settings** and disable **Page changes based on browser history
   events**. Enhanced Measurement itself can remain enabled; keep ordinary
   page-load measurement enabled.
3. In GTM, create a **History Change** trigger for all history changes.
4. Create a second **Google tag** named `Google Tag - SPA Update` using the same
   `G-XXXXXXXXXX` Tag ID. Under **Configuration settings**, set:
   - `page_location` = `{{Page URL}}`
   - `page_title` = `{{Page Title}}`
   - `update` = `true`
5. Do not give `Google Tag - SPA Update` a trigger of its own.
6. Create a **Google Analytics: GA4 Event** tag named
   `GA4 Event - Virtual Page View`, with the same Measurement ID and event name
   `page_view`. Trigger it with **History Change**.
7. In that event tag, open **Advanced Settings > Tag Sequencing**, select
   **Fire a tag before GA4 Event - Virtual Page View fires**, and choose
   `Google Tag - SPA Update`.
8. Do not add `page_view` to `AnalyticsEventMap` and do not add another router
   listener in application code.

This gives one initial page view and one page view per App Router history
navigation, without Enhanced Measurement duplicating the GTM history event.

### 7. Configure GA4 Key Events

After the events have appeared in GA4 Admin, mark only these as Key Events:

- `contact_submit`
- `preinscription_submit`

Keep `course_view`, both `*_start` events, `external_platform_click`, and
`contact_method_click` as normal events initially.

## Consent and revocation behavior

The queue order is: data layer creation, default-denied consent, granted update,
optional first-touch campaign bootstrap, `gtm.js`, then the initial Google Tag
and custom events. On revocation the runtime immediately blocks new events and
queues an update with all four Google consent states denied. The
already loaded GTM script remains in the document; removing it is not a
supported revocation mechanism.

The application deletes only its own session key. It does not generically
delete `_ga*` cookies because the exact GA4 configuration and cookie scope live
in GTM, a prefix deletion could affect unrelated configurations, and Google
Consent Mode must remain the authoritative control. Google documents `_ga` and
`_ga_<container-id>` as GA cookies, but the exact cookies, scope, retention, and
post-revocation handling must be verified against the published container.

Vercel Web Analytics is first-party measurement without cookies according to
Vercel's documentation. CostaSpanish still places it behind the internal
Analytics consent category as a product decision. GTM is only the tag manager;
Google Analytics is the provider that may set first-party measurement cookies.

**LEGAL/POLICY REVIEW:** before production publication, verify the actual GA4
cookie names and retention, controller/processor wording, international data
transfers, and the final consent-withdrawal description against the configured
GA4 property and legal advice. Do not infer these values from this runbook.

## CSP allowlist

The source adds only these Google origins:

- `script-src`: `https://www.googletagmanager.com` for the GTM loader and
  `https://tagmanager.google.com` for GTM Preview.
- `style-src`: `https://www.googletagmanager.com`,
  `https://tagmanager.google.com`, and `https://fonts.googleapis.com` for the
  GTM Preview UI.
- `connect-src`: `https://www.googletagmanager.com`,
  `https://www.google-analytics.com`, `https://region1.google-analytics.com`,
  and `https://www.google.com` for GTM/GA4 requests.
- `img-src`: `https://www.googletagmanager.com`,
  `https://www.google-analytics.com`, and `https://region1.google-analytics.com`
  for image-based measurement transport, plus `https://ssl.gstatic.com` and
  `https://www.gstatic.com` for GTM Preview.
- `font-src`: `https://fonts.gstatic.com` for GTM Preview.
- `frame-src` is unchanged; no GTM `noscript` iframe is installed.

No wildcard or Google advertising domain is allowed. If Tag Assistant shows a
blocked origin, confirm it is produced by this exact GTM/GA4 configuration
before changing CSP.

## Preview, DebugView, and publication checklist

1. Open a clean private window, clear site data, and start GTM Preview.
2. Before choosing analytics consent, verify no `gtm.js`, `collect`, or other
   Google analytics request exists in Network. The GTM container must not connect.
3. Reject analytics and verify the same result.
4. Accept analytics without a reload. Verify the consent sequence is default
   denied then update granted, with every advertising state still denied, and
   only afterward `gtm.js` loads.
5. Trigger each business action. In Preview, inspect the reset push and event
   payload; verify the corresponding GA4 tag fires once.
6. Enable GA4 DebugView through Tag Assistant/Preview (not a permanent
   production `debug_mode` parameter) and verify all eight names.
7. Navigate between App Router routes. Verify exactly one initial `page_view`
   and one per History Change, never two. In DebugView, verify that each virtual
   pageview has the expected `page_location` and `page_title`.
8. Visit a URL containing allowed UTMs and an ignored `gclid`/`fbclid`. After
   consent, verify only the five allowed UTM keys in session storage and GTM.
   Confirm `costa_campaign` appears after the granted consent update and before
   `gtm.js`, and that the initial Google tag receives the matching native
   `campaign_*` settings.
   Visit a second valid campaign URL and verify first touch is unchanged while
   last touch updates.
9. Inspect every request and event for absence of names, email, phone, address,
   messages, goals, notes, availability, Turnstile tokens, IP custom fields,
   full URLs, and query strings.
10. Revoke analytics. Verify the denied update, no new internal business events,
    and removal of `costaspanish_campaign_context`.
11. Only then submit and publish the GTM container.
12. Repeat the consent, one event, one route change, revocation, and no-PII
    checks as a production smoke test.

Official references: [Google consent setup](https://developers.google.com/tag-platform/security/guides/consent),
[Basic versus advanced consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode),
[Google SPA measurement with GTM](https://developers.google.com/analytics/devguides/collection/ga4/measure-spa-gtm),
[GA4 configuration fields](https://developers.google.com/analytics/devguides/collection/ga4/reference/config),
[Google tag CSP guidance](https://developers.google.com/tag-platform/security/guides/csp),
[Google Analytics cookie usage](https://support.google.com/analytics/answer/11397207),
and [Vercel Web Analytics](https://vercel.com/docs/analytics).
