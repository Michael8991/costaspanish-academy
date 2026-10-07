# Public form abuse controls

## Implemented in the application

- Strict Zod validation on `POST /api/contact` and `POST /api/preinscription`.
- A 16 KiB maximum JSON request body, checked against both `Content-Length` and the body actually read.
- Fixed server-side internal mailbox and no client-controlled CC, BCC, reply-to, headers, or sender.
- Public course resolution by validated slug on the server.
- HTML escaping for every visitor-controlled value rendered in email HTML.
- Minimal API responses that do not expose provider errors or message IDs.
- Optional Cloudflare Turnstile verification on the server.

## Cloudflare Turnstile deployment

Create a Turnstile widget for the production and preview hostnames, then configure both variables in the same Vercel environments:

```text
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

If `TURNSTILE_SECRET_KEY` is configured, both endpoints reject requests without a valid token. If neither variable is configured, the integration remains inactive so existing deployments are not broken. A deployment with only one of the two values is invalid configuration and must not be promoted.

Verify after deployment:

1. Both forms display a widget and can submit a valid token.
2. A missing, expired, duplicate, or invalid token returns `400 INVALID_REQUEST`.
3. The secret is server-only and never appears in browser bundles or logs.
4. CSP permits only `https://challenges.cloudflare.com` for the Turnstile script/frame/connect requirements.

## Distributed rate limiting still required

No in-memory rate limiter is used because a Vercel serverless deployment has multiple short-lived instances and cannot provide a reliable shared counter.

Preferred first option: configure Vercel Firewall/WAF rate limiting for each endpoint when the project plan supports it. Suggested starting policy, to be tuned against real traffic:

- `/api/contact`: 5 requests per source IP per 10 minutes.
- `/api/preinscription`: 3 requests per source IP per 15 minutes.
- Add a broader per-IP limit across both endpoints.
- Return/block as HTTP 429 and monitor false positives.

If Vercel's available plan cannot provide persistent rate limiting, use a shared managed store such as Upstash Redis only after approving the new processor, region, retention, cost, and failure policy. The key should combine a privacy-preserving IP hash, endpoint, and fixed window; raw IP addresses should not be retained longer than necessary.

Mail-bombing protection should also monitor repeated sends to the same normalized recipient. This requires a shared counter and is therefore not implemented locally. Until the distributed controls and Turnstile keys are active, `SEC-001` and `SEC-002` remain partially remediated rather than closed.
