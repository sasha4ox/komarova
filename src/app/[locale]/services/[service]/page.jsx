import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SERVICE_IDS, getService } from "@/content";
import { pick } from "@/content/localize";
import {
  getRelatedServices,
  getServiceArticles,
} from "@/lib/internalLinks";
import { buildPageMetadata } from "@/lib/seo";
import ServicePage from "../../../../../components/templates/ServicePage";

export const revalidate = 86400;

export function generateStaticParams() {
  return SERVICE_IDS.map((service) => ({ service }));
}

export async function generateMetadata({ params }) {
  const { locale, service: serviceId } = await params;
  const service = getService(serviceId);
  if (!service) return {};
  const t = await getTranslations({ locale, namespace: "templates" });

  return buildPageMetadata({
    locale,
    path: `/services/${serviceId}`,
    title: pick(service.title, locale),
    description: pick(service.description, locale),
    siteName: t("siteName"),
  });
}

export default async function ServiceRoute({ params }) {
  const { locale, service: serviceId } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const service = getService(serviceId);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "templates" });
  const langService = {
    ...service,
    name: pick(service.name, locale),
    title: pick(service.title, locale),
    description: pick(service.description, locale),
    h1: pick(service.h1, locale),
    intro: pick(service.intro, locale),
    definition: pick(service.definition, locale),
    symptoms: pick(service.symptoms, locale),
    causes: pick(service.causes, locale),
    howTherapyHelps: pick(service.howTherapyHelps, locale),
    methods: pick(service.methods, locale),
    format: pick(service.format, locale),
    faq: pick(service.faq, locale),
  };

  const relatedArticles = getServiceArticles(service.id)
    .slice(0, 6)
    .map((article) => ({
      href: `/knowledge-base/${article.slug}`,
      name: pick(article.h1, locale),
    }));

  const relatedServices = getRelatedServices(service.id).map((item) => ({
    href: `/services/${item.id}`,
    name: pick(item.name, locale),
  }));

  const crumbs = [
    { name: t("home"), href: "/" },
    { name: t("services"), href: "/services" },
    { name: langService.name, href: `/services/${service.id}` },
  ];

  return (
    <ServicePage
      locale={locale}
      path={`/services/${service.id}`}
      copy={{
        serviceEyebrow: t("serviceEyebrow"),
        whatIs: t("whatIs"),
        symptoms: t("symptoms"),
        causes: t("causes"),
        howTherapyHelps: t("howTherapyHelps"),
        methods: t("methods"),
        format: t("format"),
        pricing: t("pricing"),
        pricingBody: t("pricingBody"),
        faq: t("faq"),
        relatedArticles: t("relatedArticles"),
        relatedServices: t("relatedServices"),
        disclaimer: t("disclaimer"),
      }}
      service={langService}
      relatedArticles={relatedArticles}
      relatedServices={relatedServices}
      crumbs={crumbs}
    />
  );
}
