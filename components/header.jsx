"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import classNames from "classnames";
import styles from "./header.module.css";
import Menu from "./Menu/menu";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";
import useScrollDirection from "../helpers/scrollDirection";

export default function HeaderComponent() {
  const isScrollToBottom = useScrollDirection();
  const locale = useLocale();
  const t = useTranslations("header");

  return (
    <div
      className={classNames(styles.headerShell, {
        [styles.hideHeader]: isScrollToBottom,
      })}
    >
      <header className={styles.header}>
        <div
          className={classNames(styles.headerWrapper, {
            [styles.headerWrapperRu]: locale === "ru",
          })}
        >
          <Link className={styles.name} href="/" aria-label={t("logoAria")}>
            <h1>{t("name")}</h1>
            <p>{t("role")}</p>
          </Link>
          <section className={styles.linkWrapper}>
            <Menu />
          </section>
        </div>
      </header>
      <div className={styles.langBar}>
        <div className={styles.langBarInner}>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
