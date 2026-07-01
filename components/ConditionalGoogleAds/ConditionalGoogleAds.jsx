"use client";

import { useEffect, useRef } from "react";
import { useCookieConsent } from "../../hooks/useCookieConsent";

const GOOGLE_ADS_ID = "AW-18083838611";

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
      send_to: "AW-18083838611/MoN6CJDR1uAbEIe-g_MC",
      value: 1.0,
      currency: "UAH",
      event_callback: callback,
    });

    return false;
  };
}

function loadGoogleAdsTag() {
  if (typeof document === "undefined") {
    return;
  }

  const scriptId = "google-ads-gtag-js";
  if (document.getElementById(scriptId)) {
    updateConsentMode(true, true);
    defineConversionHelper();
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };

    window.gtag("js", new Date());
    updateConsentMode(true, true);
    window.gtag("config", GOOGLE_ADS_ID);
    defineConversionHelper();
  };

  document.head.appendChild(script);
}

export default function ConditionalGoogleAds() {
  const { consent } = useCookieConsent();
  const marketingConsented = consent?.marketing ?? false;
  const analyticsConsented = consent?.analytics ?? false;
  const loadedRef = useRef(false);

  useEffect(() => {
    if (marketingConsented) {
      loadGoogleAdsTag();
      loadedRef.current = true;
      return;
    }

    if (loadedRef.current) {
      updateConsentMode(false, analyticsConsented);
    }
  }, [marketingConsented, analyticsConsented]);

  return null;
}
