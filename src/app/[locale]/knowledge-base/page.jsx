import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ARTICLES } from "@/content";
import { KB_CATEGORY_ORDER, kbCategoryId, toKbCard } from "@/content/kbHub";
import { contentLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import { buildJsonLdGraph } from "@/lib/schema";
import JsonLd from "../../../../components/JsonLd/JsonLd";
import KnowledgeBaseHub from "../../../../components/KnowledgeBase/KnowledgeBaseHub";

export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "templates" });
  return buildPageMetadata({
    locale,
    path: "/knowledge-base",
    title: t("kbHubTitle"),
    description: t("kbHubDescription"),
    siteName: t("siteName"),
  });
}

export default async function KnowledgeBasePage({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "templates" });
  const lang = contentLocale(locale);

  const categoryNames = Object.fromEntries(
    KB_CATEGORY_ORDER.map((id) => [id, t(`kbCategory.${id}`)]),
  );

  const articles = ARTICLES.map((article) =>
    toKbCard(
      article,
      lang,
      categoryNames[kbCategoryId(article)] || "",
    ),
  );

  const jsonLd = buildJsonLdGraph({
    locale,
    path: "/knowledge-base",
    title: t("kbHubTitle"),
    description: t("kbHubDescription"),
    breadcrumbs: [
      { name: t("home"), path: "/" },
      { name: t("knowledgeBase"), path: "/knowledge-base" },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <KnowledgeBaseHub
        h1={t("kbHubH1")}
        intro={t("kbHubIntro")}
        crumbs={[
          { name: t("home"), href: "/" },
          { name: t("knowledgeBase"), href: "/knowledge-base" },
        ]}
        articles={articles}
      />
    </>
  );
}
