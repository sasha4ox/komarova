import { Geist, Geist_Mono, Yeseva_One } from "next/font/google";
import "./globals.css";
import { header } from "./../../styles/header.module.css"
import Link from 'next/link'
import HeaderComponent from '../../components/header'

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
  title: "Ірина Комарова - Ваш психолог!",
  description: "Професійний психолог: консультації при тривозі, вигоранні, низькій самооцінці та кризах. Безпечно, конфіденційно, ефективно.",
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable} ${yesevaSans.variable}`}>
        <HeaderComponent />
        {children}
      </body>
    </html>
  );
}
