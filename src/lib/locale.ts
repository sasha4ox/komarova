import { routing } from "../i18n/routing";

const SITE_URL = "https://ikomarova.com";

export const SUPPORTED_LOCALES = ["uk", "ru", "en"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export function isAppLocale(value: string): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale);
}

export function normalizeAppLocale(locale?: string): AppLocale {
  if (locale && isAppLocale(locale)) {
    return locale;
  }
  return routing.defaultLocale as AppLocale;
}

export function localePathPrefix(locale: string): string {
  return locale === routing.defaultLocale ? "" : `/${locale}`;
}

export function hreflangLanguages(path = "") {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      `${SITE_URL}${localePathPrefix(locale)}${path}`,
    ]),
  );
}

export function localeTag(locale?: string): string {
  const normalized = normalizeAppLocale(locale);
  if (normalized === "ru") return "[RU]";
  if (normalized === "en") return "[EN]";
  return "[UK]";
}

export function telInputLang(locale?: string): "uk" | "ru" | "en" {
  const normalized = normalizeAppLocale(locale);
  if (normalized === "ru") return "ru";
  if (normalized === "en") return "en";
  return "uk";
}

export function intlDisplayLocale(locale?: string): string {
  const normalized = normalizeAppLocale(locale);
  if (normalized === "ru") return "ru";
  if (normalized === "en") return "en";
  return "uk";
}
