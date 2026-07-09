import { isMarketingTrackingAllowed } from "./cookieConsent";

const ATTRIBUTION_KEY = "komarova_attribution";
const WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
const GCLID_COOKIE = "gclid";
const GCLID_COOKIE_DAYS = 90;

function canUseMarketingTracking() {
  return isMarketingTrackingAllowed();
}

function getCookie(name) {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function captureGclidCookie() {
  if (!canUseMarketingTracking()) {
    return;
  }

  const fromUrl = new URLSearchParams(window.location.search)
    .get("gclid")
    ?.trim();

  if (fromUrl) {
    setCookie(GCLID_COOKIE, fromUrl, GCLID_COOKIE_DAYS);
  }
}

export function getGclid() {
  if (!canUseMarketingTracking()) {
    return "";
  }

  return getCookie(GCLID_COOKIE) || "";
}

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

function readStoredAttribution() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed?.ts) {
      return null;
    }

    if (Date.now() - parsed.ts > WINDOW_MS) {
      localStorage.removeItem(ATTRIBUTION_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeAttribution(data) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    ATTRIBUTION_KEY,
    JSON.stringify({
      ...data,
      ts: Date.now(),
    }),
  );
}

function readUrlAttribution() {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const fromUrl = {};

  for (const key of TRACKED_PARAMS) {
    const value = params.get(key)?.trim();
    if (value) {
      fromUrl[key] = value;
    }
  }

  return fromUrl;
}

function hasCampaignParams(data) {
  return TRACKED_PARAMS.some((key) => Boolean(data?.[key]));
}

export function captureAttribution() {
  if (typeof window === "undefined") {
    return;
  }

  if (!canUseMarketingTracking()) {
    return;
  }

  captureGclidCookie();

  const fromUrl = readUrlAttribution();
  const stored = readStoredAttribution();
  const referrer = document.referrer?.trim() || "";
  const landingPage = `${window.location.pathname}${window.location.search}`;

  if (!stored) {
    writeAttribution({
      ...fromUrl,
      referrer: referrer || undefined,
      landingPage,
    });
    return;
  }

  if (hasCampaignParams(fromUrl)) {
    writeAttribution({
      ...stored,
      ...fromUrl,
      referrer: stored.referrer || referrer || undefined,
      landingPage: stored.landingPage || landingPage,
    });
  }
}

export function getAttribution() {
  const stored = readStoredAttribution();
  const fromUrl = readUrlAttribution();

  if (!stored && !hasCampaignParams(fromUrl)) {
    if (typeof window === "undefined") {
      return {};
    }

    const gclid = canUseMarketingTracking() ? getGclid() : "";
    const referrer = document.referrer?.trim();
    if (!referrer && !gclid) {
      return {};
    }

    return {
      ...(gclid ? { gclid } : {}),
      ...(referrer ? { referrer } : {}),
      landingPage: `${window.location.pathname}${window.location.search}`,
    };
  }

  const marketingAllowed = canUseMarketingTracking();

  return {
    utm_source: fromUrl.utm_source || stored?.utm_source,
    utm_medium: fromUrl.utm_medium || stored?.utm_medium,
    utm_campaign: fromUrl.utm_campaign || stored?.utm_campaign,
    utm_term: fromUrl.utm_term || stored?.utm_term,
    utm_content: fromUrl.utm_content || stored?.utm_content,
    gclid: marketingAllowed
      ? getGclid() || fromUrl.gclid || stored?.gclid
      : undefined,
    fbclid: marketingAllowed ? fromUrl.fbclid || stored?.fbclid : undefined,
    referrer: stored?.referrer || document.referrer?.trim() || undefined,
    landingPage:
      stored?.landingPage ||
      `${window.location.pathname}${window.location.search}`,
  };
}

export function hasGoogleAdsClick() {
  return Boolean(getAttribution().gclid);
}
