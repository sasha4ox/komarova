import { getTranslations, setRequestLocale } from "next-intl/server";
import FormConfirmationContent from "./FormConfirmationContent";

const SITE_URL = "https://ikomarova.com";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "confirmation" });
  const localePath = locale === "uk" ? "" : `/${locale}`;

  return {
    title: `${t("headline")} ${t("headlineEm")}`,
    alternates: {
      canonical: `${SITE_URL}${localePath}/form-confirmation`,
      languages: {
        uk: `${SITE_URL}/form-confirmation`,
        ru: `${SITE_URL}/ru/form-confirmation`,
      },
    },
  };
}

export default async function FormConfirmationPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FormConfirmationContent />;
}
