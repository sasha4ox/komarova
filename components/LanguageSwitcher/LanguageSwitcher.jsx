"use client";

import { useLocale, useTranslations } from "next-intl";
import classNames from "classnames";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./languageSwitcher.module.css";

export default function LanguageSwitcher({ className }) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (nextLocale) => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div
      className={classNames(styles.switcher, className)}
      role="group"
      aria-label={t("ariaLabel")}
    >
      {routing.locales.map((loc, index) => (
        <span key={loc} className={styles.item}>
          {index > 0 && (
            <span className={styles.sep} aria-hidden="true">
              ·
            </span>
          )}
          <button
            type="button"
            className={classNames(
              styles.langLink,
              locale === loc && styles.langActive,
            )}
            onClick={() => switchLocale(loc)}
            aria-current={locale === loc ? "true" : undefined}
          >
            {t(loc)}
          </button>
        </span>
      ))}
    </div>
  );
}
