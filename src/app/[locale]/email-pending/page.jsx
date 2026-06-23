import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import EmailPendingContent from "./EmailPendingContent";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "emailPending" });

  return {
    title: t("title"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EmailPendingPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={null}>
      <EmailPendingContent />
    </Suspense>
  );
}
