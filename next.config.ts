import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  // next/font serves fonts from /_next/static — no external font domains needed
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' blob: data:",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
