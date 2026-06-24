import { hasGoogleAdsClick } from "./attribution";

const LEAD_KEY = "komarova_lead_submitted";
const CONVERSION_KEY = "komarova_conversion_fired";
const TRANSACTION_KEY = "komarova_lead_transaction_id";
const WINDOW_MS = 24 * 60 * 60 * 1000;

export function buildLeadKey(email, phone) {
  const normalizedEmail = String(email || "").toLowerCase().trim();
  const normalizedPhone = String(phone || "").replace(/\D/g, "");
  return `${normalizedEmail}:${normalizedPhone}`;
}

export function buildTransactionId(email, phone) {
  return buildLeadKey(email, phone);
}

function readStoredLead() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(LEAD_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed?.ts) {
      return null;
    }

    if (Date.now() - parsed.ts > WINDOW_MS) {
      localStorage.removeItem(LEAD_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function hasRecentLeadSubmission() {
  return readStoredLead() !== null;
}

export function markLeadSubmitted() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    LEAD_KEY,
    JSON.stringify({
      ts: Date.now(),
    }),
  );
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
