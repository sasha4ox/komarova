"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./footer.module.css";

export default function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/#offers", label: tNav("services") },
    { href: "/#price", label: tNav("price") },
    { href: "/quiz", label: tNav("quiz") },
    { href: "/#contacts", label: tNav("book") },
    { href: "/#faq", label: tNav("faq") },
  ];

  const legalLinks = [
    { href: "/polityka-konfidentsiynosti", label: tNav("privacy") },
    { href: "/oferta", label: tNav("oferta") },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <section className={styles.brand}>
            <Link href="/" className={styles.brandLink}>
              <h2 className={styles.brandName}>{tFooter("brandName")}</h2>
            </Link>
            <p className={styles.brandRole}>{tFooter("brandRole")}</p>
            <p className={styles.brandTagline}>{tFooter("tagline")}</p>
            <p className={styles.brandPrice}>{tFooter("price")}</p>
          </section>

          <nav className={styles.nav} aria-label={tFooter("navAria")}>
            <h3 className={styles.columnTitle}>{tFooter("navigation")}</h3>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className={styles.contact}>
            <h3 className={styles.columnTitle}>{tFooter("contacts")}</h3>
            <ul className={styles.contactList}>
              <li>
                <a href="mailto:irinavfox@gmail.com" className={styles.contactLink}>
                  irinavfox@gmail.com
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            {tFooter("copyright", { year })}
          </p>
          <div className={styles.legalLinks}>
            {legalLinks.map((link, index) => (
              <span key={link.href} className={styles.legalItem}>
                {index > 0 && (
                  <span className={styles.legalDivider} aria-hidden="true">
                    ·
                  </span>
                )}
                <Link href={link.href} className={styles.legalLink}>
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
