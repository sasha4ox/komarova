import { routing } from "../i18n/routing";

export const SITE_URL = "https://ikomarova.com";

export const SUPPORTED_LOCALES = ["ua", "ru", "en"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];
export type ContentLocale = "uk" | "ru" | "en";

export function isAppLocale(value: string): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale);
}

export function normalizeAppLocale(locale?: string): AppLocale {
  if (locale === "uk" || locale === "ua") return "ua";
  if (locale === "ru" || locale === "en") return locale;
  return routing.defaultLocale as AppLocale;
}

export function contentLocale(locale?: string): ContentLocale {
  const app = normalizeAppLocale(locale);
  if (app === "ua") return "uk";
  return app;
}

export function htmlLang(locale?: string): ContentLocale {
  return contentLocale(locale);
}

export function localePathPrefix(locale?: string): string {
  return `/${normalizeAppLocale(locale)}`;
}

export function localizedUrl(path = "", locale?: string): string {
  const prefix = localePathPrefix(locale);
  const normalizedPath = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${prefix}${normalizedPath}`;
}

export function hreflangLanguages(path = "") {
  const normalizedPath = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return {
    uk: localizedUrl(normalizedPath, "ua"),
    ru: localizedUrl(normalizedPath, "ru"),
    en: localizedUrl(normalizedPath, "en"),
    "x-default": localizedUrl(normalizedPath, "ua"),
  };
}

export function ogLocale(locale?: string): string {
  const app = normalizeAppLocale(locale);
  if (app === "ru") return "ru_UA";
  if (app === "en") return "en_US";
  return "uk_UA";
}

export function telInputLang(locale?: string): "uk" | "ru" | "en" {
  return contentLocale(locale);
}

export function localeTag(locale?: string): string {
  const app = normalizeAppLocale(locale);
  if (app === "ru") return "[RU]";
  if (app === "en") return "[EN]";
  return "[UK]";
}

export function intlDisplayLocale(locale?: string): string {
  return contentLocale(locale);
}
