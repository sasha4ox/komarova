"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import styles from "./header.module.css";
import Menu from "./Menu/menu";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";
import useScrollDirection from "../helpers/scrollDirection";

export default function HeaderComponent() {
  const isScrollToBottom = useScrollDirection();
  const t = useTranslations("header");

  return (
    <div
      className={classNames(styles.headerShell, {
        [styles.hideHeader]: isScrollToBottom,
      })}
    >
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.name} href="/" aria-label={t("logoAria")}>
            <p className={styles.brandName}>{t("name")}</p>
            <p>{t("role")}</p>
          </Link>
          <nav className={styles.linkWrapper} aria-label={t("logoAria")}>
            <Menu />
          </nav>
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
