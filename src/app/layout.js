import { Geist, Geist_Mono, Yeseva_One } from "next/font/google";
import "./globals.css";
import HeaderComponent from '../../components/header'
import Footer from '../../components/Footer/footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const yesevaSans = Yeseva_One({
  variable: "--font-yeseva-one",
  weight: "400",
  subsets: ["cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Психолог Ірина Комарова — онлайн консультації',
 description:
    'Психолог Ірина Комарова. Онлайн консультації, індивідуальна та парна терапія. Допомога при тривожності, кризах та еміграції.',
  keywords: [
    'психолог онлайн',
    'психотерапія',
    'психолог Ірина Комарова',
    'тривожність',
    'парна терапія'
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
      
      <body className={`${geistSans.variable} ${geistMono.variable} ${yesevaSans.variable}`}>
        <HeaderComponent />
        {children}
        <Footer />
      </body>
    </html>
  );
}
