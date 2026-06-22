import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalDocument from "../../../../components/LegalDocument/LegalDocument";
import styles from "./polityka-konfidentsiynosti.module.css";

const SITE_URL = "https://ikomarova.com";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const localePath = locale === "uk" ? "" : `/${locale}`;

  return {
    title: t("privacy.title"),
    alternates: {
      canonical: `${SITE_URL}${localePath}/polityka-konfidentsiynosti`,
      languages: {
        uk: `${SITE_URL}/polityka-konfidentsiynosti`,
        ru: `${SITE_URL}/ru/polityka-konfidentsiynosti`,
      },
    },
  };
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const content = t.raw("privacy");

  return (
    <LegalDocument {...content} className={styles.privacyPolicy} />
  );
}
