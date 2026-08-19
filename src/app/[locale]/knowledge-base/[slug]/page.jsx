import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { allArticleSlugs, getArticle } from "@/content";
import { pick } from "@/content/localize";
import {
  getRelatedArticlesForSlug,
  getRelatedServiceForArticle,
} from "@/lib/internalLinks";
import { buildPageMetadata } from "@/lib/seo";
import ArticlePage from "../../../../../components/templates/ArticlePage";

export const revalidate = 86400;

export function generateStaticParams() {
  return allArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const t = await getTranslations({ locale, namespace: "templates" });
  return buildPageMetadata({
    locale,
    path: `/knowledge-base/${slug}`,
    title: pick(article.title, locale),
    description: pick(article.description, locale),
    type: "article",
    siteName: t("siteName"),
  });
}

export default async function ArticleRoute({ params }) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const article = getArticle(slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "templates" });
  const relatedService = getRelatedServiceForArticle(slug);

  const langArticle = {
    ...article,
    title: pick(article.title, locale),
    description: pick(article.description, locale),
    h1: pick(article.h1, locale),
    shortAnswer: pick(article.shortAnswer, locale),
    definition: pick(article.definition, locale),
    symptoms: pick(article.symptoms, locale),
    causes: pick(article.causes, locale),
    selfHelp: pick(article.selfHelp, locale),
    whenToSeekHelp: pick(article.whenToSeekHelp, locale),
    faq: pick(article.faq, locale),
  };

  const crumbs = [
    { name: t("home"), href: "/" },
    { name: t("knowledgeBase"), href: "/knowledge-base" },
    { name: langArticle.h1, href: `/knowledge-base/${slug}` },
  ];

  return (
    <ArticlePage
      locale={locale}
      path={`/knowledge-base/${slug}`}
      copy={{
        articleEyebrow: t("articleEyebrow"),
        shortAnswer: t("shortAnswer"),
        whatIs: t("whatIs"),
        symptoms: t("symptoms"),
        causes: t("causes"),
        selfHelp: t("selfHelp"),
        whenToSeekHelp: t("whenToSeekHelp"),
        faq: t("faq"),
        relatedService: t("relatedService"),
        relatedArticles: t("relatedArticles"),
        disclaimer: t("disclaimer"),
      }}
      article={langArticle}
      relatedService={
        relatedService
          ? {
              href: `/services/${relatedService.id}`,
              name: pick(relatedService.h1, locale),
            }
          : null
      }
      relatedArticles={getRelatedArticlesForSlug(slug).map((item) => ({
        href: `/knowledge-base/${item.slug}`,
        name: pick(item.h1, locale),
      }))}
      crumbs={crumbs}
    />
  );
}
