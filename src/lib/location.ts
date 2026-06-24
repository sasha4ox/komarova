import type { RequestGeo } from "./requestGeo";
import { intlDisplayLocale } from "./locale";

export type SubmissionLocation = {
  ipCity?: string;
  ipCountryCode?: string;
  ipCountry?: string;
  ipRegion?: string;
  phoneCountryCode?: string;
  phoneCountry?: string;
};

const MAX_FIELD_LENGTH = 100;

function sanitizeField(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim().slice(0, MAX_FIELD_LENGTH);
  return trimmed || undefined;
}

export function countryNameFromCode(code: string, locale = "uk") {
  try {
    const displayLocale = intlDisplayLocale(locale);
    return (
      new Intl.DisplayNames([displayLocale], { type: "region" }).of(code) || code
    );
  } catch {
    return code;
  }
}

export function buildSubmissionLocation(
  geo: RequestGeo | undefined,
  phoneCountryCode: string | undefined,
  locale?: string,
): SubmissionLocation | undefined {
  const location: SubmissionLocation = {};

  if (geo?.city) {
    location.ipCity = geo.city;
  }

  if (geo?.countryCode) {
    location.ipCountryCode = geo.countryCode;
    location.ipCountry = countryNameFromCode(geo.countryCode, locale);
  }

  if (geo?.region) {
    location.ipRegion = geo.region;
  }

  if (phoneCountryCode) {
    location.phoneCountryCode = phoneCountryCode;
    location.phoneCountry = countryNameFromCode(phoneCountryCode, locale);
  }

  return Object.values(location).some(Boolean) ? location : undefined;
}

export function normalizeLocation(
  body: Record<string, unknown>,
): SubmissionLocation | undefined {
  const source =
    body.location && typeof body.location === "object"
      ? (body.location as Record<string, unknown>)
      : body;

  const location: SubmissionLocation = {
    ipCity: sanitizeField(source.ipCity),
    ipCountryCode: sanitizeField(source.ipCountryCode)?.toUpperCase(),
    ipCountry: sanitizeField(source.ipCountry),
    ipRegion: sanitizeField(source.ipRegion),
    phoneCountryCode: sanitizeField(source.phoneCountryCode)?.toUpperCase(),
    phoneCountry: sanitizeField(source.phoneCountry),
  };

  return Object.values(location).some(Boolean) ? location : undefined;
}

export function formatLocationDetails(
  location?: SubmissionLocation,
): string {
  if (!location) {
    return "";
  }

  const lines: string[] = [];
  const ipParts = [
    location.ipCity,
    location.ipCountry || location.ipCountryCode,
  ].filter(Boolean);

  if (ipParts.length > 0) {
    lines.push(`Локація (IP): ${ipParts.join(", ")}`);
  }

  if (location.phoneCountry) {
    lines.push(`Країна за телефоном: ${location.phoneCountry}`);
  }

  if (
    location.ipCountryCode &&
    location.phoneCountryCode &&
    location.ipCountryCode !== location.phoneCountryCode
  ) {
    lines.push("⚠️ IP і телефон з різних країн");
  }

  return lines.join("\n");
}
