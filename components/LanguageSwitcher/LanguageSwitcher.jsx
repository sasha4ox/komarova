"use client";

import { useLocale, useTranslations } from "next-intl";
import classNames from "classnames";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./languageSwitcher.module.css";

export default function LanguageSwitcher({ className }) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={classNames(styles.switcher, className)}
      role="navigation"
      aria-label={t("ariaLabel")}
    >
      {routing.locales.map((loc, index) => (
        <span key={loc} className={styles.item}>
          {index > 0 && (
            <span className={styles.sep} aria-hidden="true">
              ·
            </span>
          )}
          <Link
            href={pathname}
            locale={loc}
            className={classNames(
              styles.langLink,
              locale === loc && styles.langActive,
            )}
            aria-current={locale === loc ? "page" : undefined}
          >
            {t(loc)}
          </Link>
        </span>
      ))}
    </div>
  );
}
