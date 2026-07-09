"use client";

import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "../../hooks/useCookieConsent";
import { GOOGLE_ADS_CONVERSION, GOOGLE_ADS_ID } from "../../helpers/googleAds";
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

function defineConversionHelper() {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag_report_conversion = function gtagReportConversion(url) {
    const callback = function callbackFn() {
      if (typeof url !== "undefined") {
        window.location = url;
      }
    };

    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CONVERSION,
      value: 1.0,
      currency: "UAH",
      event_callback: callback,
    });

    return false;
  };
}

function initGoogleAdsTag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);
  defineConversionHelper();
}

function loadGoogleAdsTag(onReady) {
  if (typeof document === "undefined") {
    return;
  }

  const scriptId = "google-ads-gtag-js";
  const existingScript = document.getElementById(scriptId);

  if (existingScript) {
    initGoogleAdsTag();
    onReady();
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  script.onload = () => {
    initGoogleAdsTag();
    onReady();
  };

  document.head.appendChild(script);
}

export default function ConditionalGoogleAds() {
  const { consent } = useCookieConsent();
  const marketingConsented = consent?.marketing ?? false;
  const analyticsConsented = consent?.analytics ?? false;
  const [tagReady, setTagReady] = useState(false);
  const loadStartedRef = useRef(false);

  useEffect(() => {
    if (loadStartedRef.current) {
      return;
    }

    loadStartedRef.current = true;
    loadGoogleAdsTag(() => setTagReady(true));
  }, []);

  useEffect(() => {
    if (!tagReady) {
      return;
    }

    const debugSession = isGoogleTagDebugSession();
    updateConsentMode(
      marketingConsented || debugSession,
      analyticsConsented || debugSession,
    );
  }, [tagReady, marketingConsented, analyticsConsented]);

  return null;
}
