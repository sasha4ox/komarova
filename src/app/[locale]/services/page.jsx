import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SERVICES } from "@/content";
import { pick } from "@/content/localize";
import { buildPageMetadata } from "@/lib/seo";
import HubPage from "../../../../components/templates/HubPage";

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

export default async function ServicesHub({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "templates" });

  return (
    <HubPage
      locale={locale}
      path="/services"
      title={t("servicesHubTitle")}
      description={t("servicesHubDescription")}
      h1={t("servicesHubH1")}
      intro={t("servicesHubIntro")}
      crumbs={[
        { name: t("home"), href: "/" },
        { name: t("services"), href: "/services" },
      ]}
      items={SERVICES.map((service) => ({
        href: `/services/${service.id}`,
        name: pick(service.name, locale),
        text: pick(service.intro, locale).slice(0, 140),
      }))}
    />
  );
}
