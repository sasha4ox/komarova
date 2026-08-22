"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCookieConsentContext } from "../../contexts/CookieConsentContext";
import { SERVICES } from "@/content/services";
import { pick } from "@/content/localize";
import styles from "./footer.module.css";

const AUTHOR_TELEGRAM_URL = "https://t.me/+30936744794";

export default function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const { reopenBanner } = useCookieConsentContext();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/services", label: tNav("services") },
    { href: "/knowledge-base", label: tNav("knowledgeBase") },
    { href: "/about", label: tNav("about") },
    { href: "/quiz", label: tNav("quiz") },
    { href: "/#price", label: tNav("price") },
    { href: "/#contacts", label: tNav("book") },
  ];

  const legalLinks = [
    { href: "/polityka-konfidentsiynosti", label: tNav("privacy") },
    { href: "/cookie-policy", label: tNav("cookiePolicy") },
    { href: "/oferta", label: tNav("oferta") },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <section className={styles.brand}>
            <Link href="/" className={styles.brandLink}>
              <p className={styles.brandName}>{tFooter("brandName")}</p>
            </Link>
            <p className={styles.brandRole}>{tFooter("brandRole")}</p>
            <p className={styles.brandTagline}>{tFooter("tagline")}</p>
            <p className={styles.brandPrice}>{tFooter("price")}</p>
          </section>

          <nav className={styles.nav} aria-label={tFooter("navAria")}>
            <h2 className={styles.columnTitle}>{tFooter("navigation")}</h2>
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

          <nav className={styles.nav} aria-label={tNav("services")}>
            <h2 className={styles.columnTitle}>{tNav("services")}</h2>
            <ul className={styles.navList}>
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.id}`} className={styles.link}>
                    {pick(service.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className={styles.contact}>
            <h2 className={styles.columnTitle}>{tFooter("contacts")}</h2>
            <ul className={styles.contactList}>
              <li>
                <a href="mailto:irinavfox@gmail.com" className={styles.contactLink}>
                  irinavfox@gmail.com
                </a>
              </li>
              <li>
                <a
                  href={AUTHOR_TELEGRAM_URL}
                  className={styles.contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tFooter("createdByAria")}
                >
                  Telegram
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            {tFooter("copyright", { year })}
            <span className={styles.legalDivider} aria-hidden="true">
              ·
            </span>
            {tFooter("createdBy")}{" "}
            <a
              href={AUTHOR_TELEGRAM_URL}
              className={styles.creditLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tFooter("createdByAria")}
            >
              Fox
            </a>
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
            <span className={styles.legalItem}>
              <span className={styles.legalDivider} aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                className={styles.legalButton}
                onClick={reopenBanner}
              >
                {tFooter("cookiePreferences")}
              </button>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
