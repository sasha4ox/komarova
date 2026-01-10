import { Geist, Geist_Mono, Yeseva_One, Great_Vibes } from "next/font/google";
import "./globals.css";
import HeaderComponent from '../../components/header'
import Footer from '../../components/Footer/footer'
import Script from 'next/script';

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
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Психолог Ірина Комарова — онлайн консультації та психотерапія',
  description:
    'Психолог Ірина Комарова — онлайн консультації для дорослих. Індивідуальна та парна терапія, допомога при тривожності, кризах та еміграції. Конфіденційно.',
  keywords: [
    'психолог онлайн',
    'психолог Україна',
    'психотерапія онлайн',
    'психолог Ірина Комарова',
    'індивідуальна психотерапія',
    'парна терапія',
    'тривожність',
    'емоційні кризи'
  ],
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Як проходить онлайн консультація?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Консультація проходить онлайн у Zoom, Google Meet або Telegram."
          }
        },
        {
          "@type": "Question",
          "name": "Скільки триває сесія?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Індивідуальна сесія триває 60 хвилин, парна — 80 хвилин."
          }
        }
      ]
    })
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <!-- Google tag (gtag.js) -->  */}
      <Script strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=AW-778100487"></Script>
      <Script
        id='google-analytics'
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: `
                       window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', 'AW-778100487');
                      `,
                      }}
      />
      <body className={`${geistSans.variable} ${geistMono.variable} ${yesevaSans.variable} ${greatVibes.variable}`}>
        <HeaderComponent />
        {children}
        <Footer />
      </body>
    </html>
  );
}
