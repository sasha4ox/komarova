import Link from "next/link";
import styles from "./footer.module.css";

const navLinks = [
  { href: "/#offers", label: "Послуги" },
  { href: "/#price", label: "Вартість" },
  { href: "/quiz", label: "Квіз" },
  { href: "/#contacts", label: "Записатися" },
  { href: "/#faq", label: "Часті питання" },
];

const legalLinks = [
  { href: "/polityka-konfidentsiynosti", label: "Політика конфіденційності" },
  { href: "/oferta", label: "Публічна оферта" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <section className={styles.brand}>
            <Link href="/" className={styles.brandLink}>
              <h2 className={styles.brandName}>Ірина Комарова</h2>
            </Link>
            <p className={styles.brandRole}>Психолог для дорослих</p>
            <p className={styles.brandTagline}>
              Онлайн-консультації · Zoom, Meet, Telegram
            </p>
            <p className={styles.brandPrice}>1900 грн / 60 хв</p>
          </section>

          <nav className={styles.nav} aria-label="Навігація в підвалі">
            <h3 className={styles.columnTitle}>Навігація</h3>
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
            <h3 className={styles.columnTitle}>Контакти</h3>
            <ul className={styles.contactList}>
              <li>
                {/* <a
                  href="tel:+380931524517"
                  className={styles.contactLink}
                  aria-label="Набрати психолога Ірина Комарова"
                >
                  +380 (93) 152 45 17
                </a> */}
              </li>
              <li>
                <a href="mailto:irinavfox@gmail.com" className={styles.contactLink}>
                  irinavfox@gmail.com
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© {year} Ірина Комарова</p>
          <div className={styles.legalLinks}>
            {legalLinks.map((link, index) => (
              <span key={link.href} className={styles.legalItem}>
                {index > 0 && <span className={styles.legalDivider} aria-hidden="true">·</span>}
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
