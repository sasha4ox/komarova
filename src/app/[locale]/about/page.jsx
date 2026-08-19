import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ABOUT } from "@/content";
import { pick } from "@/content/localize";
import { buildPageMetadata } from "@/lib/seo";
import AboutPage from "../../../../components/templates/AboutPage";

export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "templates" });
  return buildPageMetadata({
    locale,
    path: "/about",
    title: pick(ABOUT.title, locale),
    description: pick(ABOUT.description, locale),
    siteName: t("siteName"),
  });
}

export default async function AboutRoute({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "templates" });

  const about = {
    ...ABOUT,
    title: pick(ABOUT.title, locale),
    description: pick(ABOUT.description, locale),
    h1: pick(ABOUT.h1, locale),
    intro: pick(ABOUT.intro, locale),
    biography: pick(ABOUT.biography, locale),
    methodsTitle: pick(ABOUT.methodsTitle, locale),
    methods: pick(ABOUT.methods, locale),
    format: pick(ABOUT.format, locale),
    faq: pick(ABOUT.faq, locale),
  };

  return (
    <AboutPage
      locale={locale}
      path="/about"
      copy={{
        photoAlt: t("photoAlt"),
        biography: t("biography"),
        format: t("format"),
        faq: t("faq"),
      }}
      about={about}
      crumbs={[
        { name: t("home"), href: "/" },
        { name: t("about"), href: "/about" },
      ]}
    />
  );
}
