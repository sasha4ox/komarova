import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import LegalDocument from "../../../../components/LegalDocument/LegalDocument";
import styles from "./polityka-konfidentsiynosti.module.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const tTemplates = await getTranslations({ locale, namespace: "templates" });
  const content = t.raw("privacy");

  return buildPageMetadata({
    locale,
    path: "/polityka-konfidentsiynosti",
    title: content.title,
    description: content.intro,
    siteName: tTemplates("siteName"),
  });
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
