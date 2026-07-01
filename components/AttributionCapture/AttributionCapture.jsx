"use client";

import { useEffect } from "react";
import { captureAttribution } from "../../helpers/attribution";
import { useCookieConsent } from "../../hooks/useCookieConsent";

export default function AttributionCapture() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (consent?.marketing) {
      captureAttribution();
    }
  }, [consent?.marketing]);

  return null;
}
