import { Geist, Geist_Mono, Yeseva_One, Great_Vibes } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import styles from "../layout.module.css";
import HeaderComponent from "../../../components/header";
import Footer from "../../../components/Footer/footer";
import AttributionCapture from "../../../components/AttributionCapture/AttributionCapture";
import ConsentModeDefaults from "../../../components/ConsentModeDefaults/ConsentModeDefaults";
import {
  GoogleTagManagerHead,
  GoogleTagManagerNoscript,
} from "../../../components/GoogleTagManager/GoogleTagManager";
import ConditionalGoogleAds from "../../../components/ConditionalGoogleAds/ConditionalGoogleAds";
import CookieConsent from "../../../components/CookieConsent/CookieConsent";
import Providers from "../../../components/Providers/Providers";
import { routing } from "../../i18n/routing";
import { hreflangLanguages, localePathPrefix } from "../../lib/locale";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const yesevaSans = Yeseva_One({
  variable: "--font-yeseva-one",
  weight: "400",
  subsets: ["cyrillic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://ikomarova.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.raw("jsonLd").map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const localePath = localePathPrefix(locale);

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: `${SITE_URL}${localePath}`,
      languages: hreflangLanguages(),
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <ConsentModeDefaults />
        <GoogleTagManagerHead />
        <meta
          name="google-site-verification"
          content="TR--N6OV8NJ0SCNRunEeDhPJgWKWA1IDzB5zCSIJJt8"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${yesevaSans.variable} ${greatVibes.variable}`}
      >
        <GoogleTagManagerNoscript />
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <AttributionCapture />
            <ConditionalGoogleAds />
            <div className={styles.pageShell}>
              <HeaderComponent />
              <div className={styles.main}>{children}</div>
              <Footer />
            </div>
            <CookieConsent />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
