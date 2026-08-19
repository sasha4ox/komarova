import type { ArticleRecord, LocalizedFaq, LocalizedList, LocalizedString, ServiceId } from "../types";
import { relatedArticleSlugs } from "../catalog";
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
): ArticleRecord {
  const service = getService(serviceId);
  const title = L(
    `${h1.uk} — психолог Ірина Комарова`,
    `${h1.ru} — психолог Ирина Комарова`,
    `${h1.en} — psychologist Irina Komarova`,
  );
  const description = L(
    shortAnswer.uk.slice(0, 158),
    shortAnswer.ru.slice(0, 158),
    shortAnswer.en.slice(0, 158),
  );

  return {
    slug,
    serviceId,
    title,
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
    ...(service ? {} : {}),
  };
}
