import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import { buildJsonLdGraph } from "@/lib/schema";
import JsonLd from "../../../components/JsonLd/JsonLd";
import HomePage from "../../../components/Home/HomePage";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tTemplates = await getTranslations({ locale, namespace: "templates" });

  return buildPageMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
    siteName: tTemplates("siteName"),
    imageAlt: t("title"),
  });
}

export default async function Home({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tReviews = await getTranslations({ locale, namespace: "reviews" });

  const jsonLd = buildJsonLdGraph({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
    faq: tFaq.raw("items"),
    reviews: tReviews.raw("items").map((item) => ({
      author: item.author,
      text: item.text,
    })),
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomePage />
    </>
  );
}
