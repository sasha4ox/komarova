"use client";

import { useEffect } from "react";
import { captureAttribution } from "../../helpers/attribution";
import { isGoogleTagDebugSession } from "../../helpers/googleTagVerification";
import { useCookieConsent } from "../../hooks/useCookieConsent";

export default function AttributionCapture() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    isGoogleTagDebugSession();
  }, []);

  useEffect(() => {
    if (consent?.marketing) {
      captureAttribution();
    }
  }, [consent?.marketing]);

  return null;
}
