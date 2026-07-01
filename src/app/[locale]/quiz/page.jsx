import { getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangLanguages, localePathPrefix } from "@/lib/locale";
import Quiz from "../../../../components/Quiz/Quiz";
import pageStyles from "../../quiz/quizPage.module.css";

const SITE_URL = "https://ikomarova.com";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadataQuiz" });
  const localePath = localePathPrefix(locale);

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}${localePath}/quiz`,
      languages: hreflangLanguages("/quiz"),
    },
  };
}

export default async function QuizPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className={pageStyles.page}>
      <Quiz />
    </div>
  );
}
