import { getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangLanguages, localePathPrefix } from "@/lib/locale";
import LegalDocument from "../../../../components/LegalDocument/LegalDocument";
import styles from "./cookiePolicy.module.css";

const SITE_URL = "https://ikomarova.com";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const localePath = localePathPrefix(locale);

  return {
    title: t("cookies.title"),
    alternates: {
      canonical: `${SITE_URL}${localePath}/cookie-policy`,
      languages: hreflangLanguages("/cookie-policy"),
    },
  };
}

export default async function CookiePolicyPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const content = t.raw("cookies");

  return <LegalDocument {...content} className={styles.cookiePolicy} />;
}
