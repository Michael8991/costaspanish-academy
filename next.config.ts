import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

// Indica la ruta de tu archivo de configuración de i18n
const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');
const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://avatars.preply.com https://static.preply.com",
  "font-src 'self' data:",
  `connect-src 'self' https://challenges.cloudflare.com${isDevelopment ? " ws: http:" : ""}`,
  "frame-src https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:locale/cookies",
        destination: "/:locale/cookiesPolicy",
        permanent: true,
      },
      {
        source: "/:locale/privacy-policy",
        destination: "/:locale/privacyPolicy",
        permanent: true,
      },
      {
        source: "/:locale/legal-notice",
        destination: "/:locale/legalNotice",
        permanent: true,
      },
    ];
  },
};
export default withNextIntl(nextConfig);
