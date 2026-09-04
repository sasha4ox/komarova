import { SITE_URL, contentLocale, localizedUrl } from "./locale";

export const AUTHOR_IMAGE_PATH = "/mainImage.jpg";
export const AUTHOR_IMAGE_URL = `${SITE_URL}${AUTHOR_IMAGE_PATH}`;

export const AUTHOR_NAMES = {
  uk: "Ірина Комарова",
  ru: "Ирина Комарова",
  en: "Irina Komarova",
} as const;

export const AUTHOR_JOB_TITLES = {
  uk: "Психолог, гештальт-терапевт",
  ru: "Психолог, гештальт-терапевт",
  en: "Psychologist, Gestalt therapist",
} as const;

export const AUTHOR_ROLES = {
  uk: "Гештальт-терапевт",
  ru: "Гештальт-терапевт",
  en: "Gestalt therapist",
} as const;

export function authorForLocale(locale: string) {
  const lang = contentLocale(locale);

  return {
    name: AUTHOR_NAMES[lang],
    jobTitle: AUTHOR_JOB_TITLES[lang],
    role: AUTHOR_ROLES[lang],
    imagePath: AUTHOR_IMAGE_PATH,
    imageUrl: AUTHOR_IMAGE_URL,
    aboutPath: "/about",
    aboutUrl: localizedUrl("/about", locale),
  };
}

export function formatArticleDate(isoDate: string, locale: string) {
  const lang = contentLocale(locale);
  const localeTag = lang === "uk" ? "uk-UA" : lang === "ru" ? "ru-RU" : "en-GB";

  return new Intl.DateTimeFormat(localeTag, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00`));
}
