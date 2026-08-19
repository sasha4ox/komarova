import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";
import Quiz from "../../../../components/Quiz/Quiz";
import pageStyles from "../../quiz/quizPage.module.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadataQuiz" });
  const tTemplates = await getTranslations({ locale, namespace: "templates" });

  return buildPageMetadata({
    locale,
    path: "/quiz",
    title: t("title"),
    description: t("description"),
    siteName: tTemplates("siteName"),
  });
}

export default async function QuizPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className={pageStyles.page}>
      <Quiz />
    </main>
  );
}
