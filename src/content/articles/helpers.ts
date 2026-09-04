import type { ArticleRecord, LocalizedFaq, LocalizedList, LocalizedString, ServiceId } from "../types";
import {
  ARTICLE_DATE_MODIFIED,
  ARTICLE_DATE_PUBLISHED,
  relatedArticleSlugs,
} from "../catalog";
import { buildSeoTitle } from "../kbHub";
import { getService } from "../services";

export const L = (uk: string, ru: string, en: string): LocalizedString => ({ uk, ru, en });

export const LL = (uk: string[], ru: string[], en: string[]): LocalizedList => ({ uk, ru, en });

export function faq(
  rows: [string, string, string, string, string, string][],
): LocalizedFaq {
  return {
    uk: rows.map(([qUk, aUk]) => ({ question: qUk, answer: aUk })),
    ru: rows.map((row) => ({ question: row[2], answer: row[3] })),
    en: rows.map((row) => ({ question: row[4], answer: row[5] })),
  };
}

export function makeArticle(
  slug: string,
  serviceId: ServiceId,
  h1: LocalizedString,
  shortAnswer: LocalizedString,
  definition: LocalizedString,
  symptoms: LocalizedList,
  causes: LocalizedList,
  selfHelp: LocalizedList,
  whenToSeekHelp: LocalizedString,
  faqItems: LocalizedFaq,
  seoTitleOverride?: LocalizedString,
): ArticleRecord {
  const service = getService(serviceId);
  const seoTitle =
    seoTitleOverride ??
    L(
      buildSeoTitle(h1.uk, "uk"),
      buildSeoTitle(h1.ru, "ru"),
      buildSeoTitle(h1.en, "en"),
    );
  const description = L(
    shortAnswer.uk.slice(0, 158),
    shortAnswer.ru.slice(0, 158),
    shortAnswer.en.slice(0, 158),
  );

  return {
    slug,
    serviceId,
    title: seoTitle,
    seoTitle,
    description,
    h1,
    shortAnswer,
    definition,
    symptoms,
    causes,
    selfHelp,
    whenToSeekHelp,
    faq: faqItems,
    relatedArticleSlugs: relatedArticleSlugs(slug),
    datePublished: ARTICLE_DATE_PUBLISHED,
    dateModified: ARTICLE_DATE_MODIFIED,
    ...(service ? {} : {}),
  };
}
