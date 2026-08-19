import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import LegalDocument from "../../../../components/LegalDocument/LegalDocument";
import styles from "./oferta.module.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const tTemplates = await getTranslations({ locale, namespace: "templates" });
  const content = t.raw("oferta");

  return buildPageMetadata({
    locale,
    path: "/oferta",
    title: content.title,
    description: content.intro,
    siteName: tTemplates("siteName"),
  });
}

export default async function OfertaPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const content = t.raw("oferta");

  return (
    <LegalDocument {...content} className={styles.pulcicOffer} />
  );
}
