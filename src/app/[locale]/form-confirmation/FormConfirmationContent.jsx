"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./formConfirmation.module.css";

export default function FormConfirmationContent() {
  const t = useTranslations("confirmation");

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-18083838611/--elCKrciKIcEJP1ha9D",
      });
    }
  }, []);

  return (
    <section className={styles.confirmWrap}>
      <svg
        className={styles.bgCircles}
        viewBox="0 0 680 520"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="80" cy="80" r="120" fill="#EAF3DE" opacity="0.45" />
        <circle cx="620" cy="440" r="100" fill="#EAF3DE" opacity="0.35" />
        <circle cx="600" cy="60" r="60" fill="#C0DD97" opacity="0.2" />
        <circle cx="60" cy="460" r="70" fill="#C0DD97" opacity="0.15" />
      </svg>

      <div className={styles.card}>
        <div className={`${styles.iconRing} ${styles.fadeIn}`}>
          <div className={styles.pulseRing} />
          <div className={styles.pulseRing2} />
          <svg
            className={styles.checkIcon}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 16.5L12.5 23L26 10"
              stroke="#3B6D11"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={`${styles.headline} ${styles.fadeIn} ${styles.delay1}`}>
          {t("headline")} <em className={styles.headlineEm}>{t("headlineEm")}</em>
        </h1>

        <p className={`${styles.subtext} ${styles.fadeIn} ${styles.delay2}`}>
          {t("subtext")}
        </p>

        <div className={`${styles.divider} ${styles.fadeIn} ${styles.delay2}`} />

        <div className={`${styles.infoRow} ${styles.fadeIn} ${styles.delay3}`}>
          <div className={styles.infoIcon}>
            <svg
              className={styles.infoIconSvg}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5.5C2 4.67 2.67 4 3.5 4h9C13.33 4 14 4.67 14 5.5v6c0 .83-.67 1.5-1.5 1.5h-9C2.67 13 2 12.33 2 11.5v-6z"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <path d="M2 6l6 4 6-4" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={styles.infoText}>
            <div className={styles.infoLabel}>{t("nextLabel")}</div>
            <div className={styles.infoValue}>{t("nextValue")}</div>
          </div>
        </div>

        <div className={`${styles.infoRow} ${styles.fadeIn} ${styles.delay3}`}>
          <div className={styles.infoIcon}>
            <svg
              className={styles.infoIconSvg}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 2h5l1 2.5H4.5L5.5 2z"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <rect x="2" y="4.5" width="12" height="9.5" rx="1.5" strokeWidth="1" />
              <path d="M8 7.5v4M6 9.5h4" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
          <div className={styles.infoText}>
            <div className={styles.infoLabel}>{t("timeLabel")}</div>
            <div className={styles.infoValue}>{t("timeValue")}</div>
          </div>
        </div>

        <Link href="/" className={`${styles.backBtn} ${styles.fadeIn} ${styles.delay3}`}>
          {t("back")}
        </Link>
      </div>
    </section>
  );
}
