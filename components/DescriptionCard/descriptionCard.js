"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./descriptionCard.module.css";

export default function DescriptionCard({ name, photo, href }) {
  const t = useTranslations("descriptionCard");

  const inner = (
    <>
      <p className={styles.descriptionCardName}>{name}</p>
      <div className={styles.descriptionCardPhotoCover}>
        <Image
          className={styles.photo}
          src={`/${photo}`}
          quality={80}
          fill
          sizes="412px"
          alt={name}
        />
      </div>
    </>
  );

  if (href) {
    return (
      <Link className={styles.descriptionCard} href={href} aria-label={name}>
        {inner}
      </Link>
    );
  }

  return (
    <div className={styles.descriptionCard} aria-label={t("openAria")}>
      {inner}
    </div>
  );
}
