import type { ArticleRecord, ContentLocale, ServiceId } from "./types";

export const FEATURED_ARTICLE_SLUGS = [
  "what-is-anxiety",
  "what-is-a-panic-attack",
  "what-to-do-with-anxiety",
  "what-to-do-during-a-panic-attack",
] as const;

export const KB_CATEGORY_ORDER = [
  "anxiety",
  "panic-attacks",
  "therapy",
  "myths",
  "depression",
  "relationships",
  "self-esteem",
  "burnout",
  "divorce",
  "codependency",
  "loneliness",
  "family-conflicts",
] as const;

export type KbCategoryId = (typeof KB_CATEGORY_ORDER)[number];

const THERAPY_SLUGS = new Set(["anxiety-and-relationships"]);

const FEATURED_EXCERPTS: Partial<Record<string, Record<ContentLocale, string>>> = {
  "what-is-anxiety": {
    uk: "Що це за стан і як він відчувається в тілі й думках.",
    ru: "Что это за состояние и как оно ощущается в теле и мыслях.",
    en: "What this state is, and how it feels in the body and mind.",
  },
  "what-is-a-panic-attack": {
    uk: "Чому вона виникає і чому так лякає.",
    ru: "Почему она возникает и почему так пугает.",
    en: "Why it happens, and why it frightens so much.",
  },
  "what-to-do-with-anxiety": {
    uk: "Прості кроки, коли тривога вже тут.",
    ru: "Простые шаги, когда тревога уже здесь.",
    en: "Simple steps for when anxiety is already here.",
  },
  "what-to-do-during-a-panic-attack": {
    uk: "Як пережити напад, не посилюючи жах.",
    ru: "Как пережить приступ, не усиливая ужас.",
    en: "How to get through an attack without feeding the fear.",
  },
};

const TITLE_SPLITTERS = [
  / і як /i,
  / і чому /i,
  / і чим /i,
  / и как /i,
  / и почему /i,
  / и чем /i,
  / and how /i,
  / and why /i,
  / when /i,
  / когда /i,
  / коли /i,
];

export function kbCategoryId(article: {
  slug: string;
  serviceId: ServiceId;
}): KbCategoryId {
  if (article.slug.includes("myth")) return "myths";
  if (
    article.slug.includes("how-therapy") ||
    article.slug.includes("therapy-helps") ||
    THERAPY_SLUGS.has(article.slug)
  ) {
    return "therapy";
  }
  return article.serviceId;
}

export function visualTitle(h1: string): string {
  const colon = h1.split(/:\s+| — /)[0].trim();
  let title = colon;

  for (const splitter of TITLE_SPLITTERS) {
    if (splitter.test(title)) {
      const next = title.split(splitter)[0].trim();
      if (next.length >= 12) {
        title = next;
        break;
      }
    }
  }

  const comma = title.search(/[,，]/);
  if (comma >= 16 && comma <= 64) {
    title = title.slice(0, comma).trim();
  }

  if (title.length > 62) {
    const cut = title.slice(0, 58);
    const lastSpace = cut.lastIndexOf(" ");
    title = (lastSpace > 28 ? cut.slice(0, lastSpace) : cut).trim();
  }

  return title;
}

export function visualExcerpt(text: string, max = 128): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const match = cleaned.match(/^(.+?[.!?…])(?:\s|$)/);
  let sentence = match ? match[1] : cleaned;

  if (sentence.length <= max) return sentence;

  const cut = sentence.slice(0, max - 1);
  const at = Math.max(cut.lastIndexOf(" "), cut.lastIndexOf(","));
  return `${(at > 48 ? cut.slice(0, at) : cut).trim()}…`;
}

function articlePlainText(article: ArticleRecord, locale: ContentLocale): string {
  const faqText = article.faq[locale]
    .map((item) => `${item.question} ${item.answer}`)
    .join(" ");

  return [
    article.h1[locale],
    article.shortAnswer[locale],
    article.definition[locale],
    article.symptoms[locale].join(" "),
    article.causes[locale].join(" "),
    article.selfHelp[locale].join(" "),
    article.whenToSeekHelp[locale],
    faqText,
  ].join(" ");
}

export function readingMinutes(article: ArticleRecord, locale: ContentLocale): number {
  const words = articlePlainText(article, locale).trim().split(/\s+/).filter(Boolean)
    .length;
  return Math.max(4, Math.min(12, Math.round(words / 160)));
}

export type KbCardItem = {
  slug: string;
  href: string;
  h1: string;
  cardTitle: string;
  excerpt: string;
  categoryId: KbCategoryId;
  readingMinutes: number;
  keywords: string;
};

export function toKbCard(
  article: ArticleRecord,
  locale: ContentLocale,
  categoryName: string,
): KbCardItem {
  const h1 = article.h1[locale];
  return {
    slug: article.slug,
    href: `/knowledge-base/${article.slug}`,
    h1,
    cardTitle: visualTitle(h1),
    excerpt:
      FEATURED_EXCERPTS[article.slug]?.[locale] ??
      visualExcerpt(article.shortAnswer[locale]),
    categoryId: kbCategoryId(article),
    readingMinutes: readingMinutes(article, locale),
    keywords: [
      h1,
      article.shortAnswer[locale],
      article.slug.replace(/-/g, " "),
      categoryName,
      article.serviceId.replace(/-/g, " "),
    ].join(" "),
  };
}
