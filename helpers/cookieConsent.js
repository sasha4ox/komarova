/**
 * GDPR-compliant cookie consent management.
 */

import { isGoogleTagDebugSession } from "./googleTagVerification";

export const STORAGE_KEY = "cookie_consent";
export const CONSENT_VERSION = "1";

/** @typedef {'essential' | 'analytics' | 'marketing' | 'functional'} CookieCategoryId */

/**
 * @typedef {Object} CookieConsentState
 * @property {boolean} essential
 * @property {boolean} analytics
 * @property {boolean} marketing
 * @property {boolean} functional
 * @property {number} timestamp
 * @property {string} version
 */

/** Default: only essential enabled (GDPR best practice) */
export const DEFAULT_CONSENT = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
  timestamp: 0,
  version: CONSENT_VERSION,
};

export const COOKIE_CATEGORIES = [
  { id: "essential", required: true, defaultEnabled: true },
  { id: "analytics", required: false, defaultEnabled: false },
  { id: "marketing", required: false, defaultEnabled: false },
  { id: "functional", required: false, defaultEnabled: false },
];

/**
 * @returns {CookieConsentState | null}
 */
export function getStoredConsent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * @param {CookieConsentState} state
 */
export function setStoredConsent(state) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...state,
        timestamp: Date.now(),
        version: CONSENT_VERSION,
      }),
    );
  } catch {
    // ignore
  }
}

export function hasUserConsented() {
  const stored = getStoredConsent();
  return stored !== null && stored.timestamp > 0;
}

export function isMarketingTrackingAllowed() {
  if (isGoogleTagDebugSession()) {
    return true;
  }

  return isCategoryAllowed("marketing");
}

/**
 * @param {CookieCategoryId} category
 */
export function isCategoryAllowed(category) {
  const stored = getStoredConsent();
  if (!stored) {
    return false;
  }

  return stored[category] === true;
}
