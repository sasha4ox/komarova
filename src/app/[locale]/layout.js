import { Geist, Geist_Mono, Yeseva_One, Great_Vibes } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";
import styles from "../layout.module.css";
import HeaderComponent from "../../../components/header";
import Footer from "../../../components/Footer/footer";
import AttributionCapture from "../../../components/AttributionCapture/AttributionCapture";
import { routing } from "../../i18n/routing";

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

  const localePath = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: `${SITE_URL}${localePath}`,
      languages: {
        uk: `${SITE_URL}`,
        ru: `${SITE_URL}/ru`,
      },
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
      <meta
        name="google-site-verification"
        content="TR--N6OV8NJ0SCNRunEeDhPJgWKWA1IDzB5zCSIJJt8"
      />
      <Script
        strategy="afterInteractive"
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-18083838611"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18083838611');
          `,
        }}
      />
      <Script
        id="google-analytics-report-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-18083838611/MoN6CJDR1uAbEIe-g_MC',
                'value': 1.0,
                'currency': 'UAH',
                'event_callback': callback
              });
              return false;
            }
          `,
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${yesevaSans.variable} ${greatVibes.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <AttributionCapture />
          <div className={styles.pageShell}>
            <HeaderComponent />
            <div className={styles.main}>{children}</div>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
