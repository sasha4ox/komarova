import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalDocument from "../../../../components/LegalDocument/LegalDocument";
import styles from "./oferta.module.css";

const SITE_URL = "https://ikomarova.com";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const localePath = locale === "uk" ? "" : `/${locale}`;

  return {
    title: t("oferta.title"),
    alternates: {
      canonical: `${SITE_URL}${localePath}/oferta`,
      languages: {
        uk: `${SITE_URL}/oferta`,
        ru: `${SITE_URL}/ru/oferta`,
      },
    },
  };
}

export default async function OfertaPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const content = t.raw("oferta");

  return <LegalDocument {...content} className={styles.pulcicOffer} />;
}
