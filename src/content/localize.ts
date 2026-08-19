import { contentLocale } from "../lib/locale";
import type { ContentLocale } from "./types";

export function pick(record, locale) {
  const lang = contentLocale(locale) as ContentLocale;
  return record[lang];
}
