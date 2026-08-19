import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ARTICLES } from "@/content";
import { pick } from "@/content/localize";
import { buildPageMetadata } from "@/lib/seo";
import HubPage from "../../../../components/templates/HubPage";

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

export default async function KnowledgeBaseHub({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "templates" });

  return (
    <HubPage
      locale={locale}
      path="/knowledge-base"
      title={t("kbHubTitle")}
      description={t("kbHubDescription")}
      h1={t("kbHubH1")}
      intro={t("kbHubIntro")}
      crumbs={[
        { name: t("home"), href: "/" },
        { name: t("knowledgeBase"), href: "/knowledge-base" },
      ]}
      items={ARTICLES.map((article) => ({
        href: `/knowledge-base/${article.slug}`,
        name: pick(article.h1, locale),
      }))}
    />
  );
}
