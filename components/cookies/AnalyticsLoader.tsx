"use client";

import { useEffect } from "react";
import { readConsentClient } from "@/lib/cookies/consent";

export default function AnalyticsLoader() {
  useEffect(() => {
    const consent = readConsentClient();
    if (!consent?.analytics) return;

    // Inyecta Vercel Analytics solo si analytics=true
    import("@vercel/analytics").then(({ inject }) => inject());
  }, []);

  return null;
}
