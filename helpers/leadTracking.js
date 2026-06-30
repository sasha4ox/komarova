import { hasGoogleAdsClick } from "./attribution";

const LEAD_KEY_PREFIX = "komarova_lead_submitted:";
const LEGACY_LEAD_KEY = "komarova_lead_submitted";
const INFLIGHT_KEY = "komarova_lead_inflight";
const CONVERSION_KEY = "komarova_conversion_fired";
const TRANSACTION_KEY = "komarova_lead_transaction_id";
const WINDOW_MS = 3 * 60 * 60 * 1000;

export function buildLeadKey(email, phone) {
  const normalizedEmail = String(email || "").toLowerCase().trim();
  const normalizedPhone = String(phone || "").replace(/\D/g, "");
  return `${normalizedEmail}:${normalizedPhone}`;
}

export function buildTransactionId(email, phone) {
  return buildLeadKey(email, phone);
}

function leadStorageKey(email, phone) {
  return `${LEAD_KEY_PREFIX}${buildLeadKey(email, phone)}`;
}

function readStoredLead(email, phone) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(leadStorageKey(email, phone));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed?.ts) {
      return null;
    }

    if (Date.now() - parsed.ts > WINDOW_MS) {
      localStorage.removeItem(leadStorageKey(email, phone));
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function hasRecentLeadSubmission(email, phone) {
  return readStoredLead(email, phone) !== null;
}

export function markLeadSubmitted(email, phone) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    leadStorageKey(email, phone),
    JSON.stringify({
      ts: Date.now(),
    }),
  );
  localStorage.removeItem(LEGACY_LEAD_KEY);
  releaseSubmitLock();
}

export function tryAcquireSubmitLock(email, phone) {
  if (typeof window === "undefined") {
    return false;
  }

  if (hasRecentLeadSubmission(email, phone)) {
    return false;
  }

  if (sessionStorage.getItem(INFLIGHT_KEY)) {
    return false;
  }

  sessionStorage.setItem(INFLIGHT_KEY, buildLeadKey(email, phone));
  return true;
}

export function releaseSubmitLock() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(INFLIGHT_KEY);
}

export function storeLeadTransactionId(email, phone) {
  if (typeof window === "undefined") {
    return;
  }

  const transactionId = buildTransactionId(email, phone);
  sessionStorage.setItem(TRANSACTION_KEY, transactionId);
  localStorage.setItem(TRANSACTION_KEY, transactionId);
}

export function fireConversionOnce() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  // Only report to Google Ads when the user actually arrived via a Google Ad click.
  if (!hasGoogleAdsClick()) {
    return;
  }

  const transactionId =
    sessionStorage.getItem(TRANSACTION_KEY) ||
    localStorage.getItem(TRANSACTION_KEY);

  if (!transactionId) {
    return;
  }

  const alreadyFired = localStorage.getItem(CONVERSION_KEY);
  if (alreadyFired === transactionId) {
    return;
  }

  window.gtag("event", "conversion", {
    send_to: "AW-18083838611/--elCKrciKIcEJP1ha9D",
    transaction_id: transactionId,
  });

  localStorage.setItem(CONVERSION_KEY, transactionId);
  sessionStorage.removeItem(TRANSACTION_KEY);
  localStorage.removeItem(TRANSACTION_KEY);
}
