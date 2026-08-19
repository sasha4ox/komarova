import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import FormConfirmationContent from "./FormConfirmationContent";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "confirmation" });
  const tTemplates = await getTranslations({ locale, namespace: "templates" });

  return {
    ...buildPageMetadata({
      locale,
      path: "/form-confirmation",
      title: `${t("headline")} ${t("headlineEm")}`,
      description: t("subtext"),
      siteName: tTemplates("siteName"),
      index: false,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function FormConfirmationPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <FormConfirmationContent />
    </main>
  );
}
