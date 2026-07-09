"use client";

import { useEffect } from "react";
import { useCookieConsent } from "../../hooks/useCookieConsent";
import { isGoogleTagDebugSession } from "../../helpers/googleTagVerification";

function updateConsentMode(marketingGranted, analyticsGranted) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", {
    ad_storage: marketingGranted ? "granted" : "denied",
    ad_user_data: marketingGranted ? "granted" : "denied",
    ad_personalization: marketingGranted ? "granted" : "denied",
    analytics_storage: analyticsGranted ? "granted" : "denied",
  });
}

export default function ConditionalGoogleAds() {
  const { consent } = useCookieConsent();
  const marketingConsented = consent?.marketing ?? false;
  const analyticsConsented = consent?.analytics ?? false;

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    const debugSession = isGoogleTagDebugSession();
    updateConsentMode(
      marketingConsented || debugSession,
      analyticsConsented || debugSession,
    );
  }, [marketingConsented, analyticsConsented]);

  return null;
}
