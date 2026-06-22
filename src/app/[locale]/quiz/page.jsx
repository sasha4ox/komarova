import { getTranslations, setRequestLocale } from "next-intl/server";
import Quiz from "../../../../components/Quiz/Quiz";

const SITE_URL = "https://ikomarova.com";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadataQuiz" });
  const localePath = locale === "uk" ? "" : `/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}${localePath}/quiz`,
      languages: {
        uk: `${SITE_URL}/quiz`,
        ru: `${SITE_URL}/ru/quiz`,
      },
    },
  };
}

export default async function QuizPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Quiz />;
}
