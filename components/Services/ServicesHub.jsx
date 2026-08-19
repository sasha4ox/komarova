"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Breadcrumbs from "../templates/Breadcrumbs";
import ConsultCta from "../templates/ConsultCta";
import CategoryIcon, { ArrowIcon } from "../KnowledgeBase/CategoryIcon";
import styles from "./services.module.css";

export default function ServicesHub({ h1, intro, crumbs, items }) {
  const t = useTranslations("templates");

  return (
    <main className={styles.page}>
      <Breadcrumbs items={crumbs} />
      <header className={styles.hero}>
        <h1>{h1}</h1>
        <p className={styles.intro}>{intro}</p>
      </header>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={styles.card}
              title={item.name}
              aria-label={item.name}
            >
              <span className={styles.iconWrap}>
                <CategoryIcon name={item.id} />
              </span>
              <div className={styles.body}>
                <h2 className={styles.cardTitle}>{item.name}</h2>
                {item.text ? <p className={styles.cardExcerpt}>{item.text}</p> : null}
                <span className={styles.readMore}>
                  {t("servicesReadMore")}
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.ctaWrap}>
        <ConsultCta />
      </div>
    </main>
  );
}
