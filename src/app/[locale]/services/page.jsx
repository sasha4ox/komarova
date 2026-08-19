import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SERVICES } from "@/content";
import { pick } from "@/content/localize";
import { buildPageMetadata } from "@/lib/seo";
import { buildJsonLdGraph } from "@/lib/schema";
import JsonLd from "../../../../components/JsonLd/JsonLd";
import ServicesHub from "../../../../components/Services/ServicesHub";

export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "templates" });
  return buildPageMetadata({
    locale,
    path: "/services",
    title: t("servicesHubTitle"),
    description: t("servicesHubDescription"),
    siteName: t("siteName"),
  });
}

export default async function ServicesHubPage({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "templates" });

  const jsonLd = buildJsonLdGraph({
    locale,
    path: "/services",
    title: t("servicesHubTitle"),
    description: t("servicesHubDescription"),
    breadcrumbs: [
      { name: t("home"), path: "/" },
      { name: t("services"), path: "/services" },
    ],
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServicesHub
        h1={t("servicesHubH1")}
        intro={t("servicesHubIntro")}
        crumbs={[
          { name: t("home"), href: "/" },
          { name: t("services"), href: "/services" },
        ]}
        items={SERVICES.map((service) => ({
          id: service.id,
          href: `/services/${service.id}`,
          name: pick(service.name, locale),
          text: pick(service.intro, locale),
        }))}
      />
    </>
  );
}
