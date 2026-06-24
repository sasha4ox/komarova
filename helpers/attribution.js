const ATTRIBUTION_KEY = "komarova_attribution";
const WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

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

    const referrer = document.referrer?.trim();
    if (!referrer) {
      return {};
    }

    return {
      referrer,
      landingPage: `${window.location.pathname}${window.location.search}`,
    };
  }

  return {
    utm_source: fromUrl.utm_source || stored?.utm_source,
    utm_medium: fromUrl.utm_medium || stored?.utm_medium,
    utm_campaign: fromUrl.utm_campaign || stored?.utm_campaign,
    utm_term: fromUrl.utm_term || stored?.utm_term,
    utm_content: fromUrl.utm_content || stored?.utm_content,
    gclid: fromUrl.gclid || stored?.gclid,
    fbclid: fromUrl.fbclid || stored?.fbclid,
    referrer: stored?.referrer || document.referrer?.trim() || undefined,
    landingPage:
      stored?.landingPage ||
      `${window.location.pathname}${window.location.search}`,
  };
}

export function hasGoogleAdsClick() {
  return Boolean(getAttribution().gclid);
}
