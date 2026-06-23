"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "../form-confirmation/formConfirmation.module.css";

export default function EmailPendingContent() {
  const t = useTranslations("emailPending");
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const status = searchParams.get("status");

  const subtext =
    status === "expired"
      ? t("expired")
      : status === "error"
        ? t("error")
        : t("subtext", { email: email || "…" });

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
              d="M2 5.5C2 4.67 2.67 4 3.5 4h9C13.33 4 14 4.67 14 5.5v6c0 .83-.67 1.5-1.5 1.5h-9C2.67 13 2 12.33 2 11.5v-6z"
              stroke="#3B6D11"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M2 6l6 4 6-4"
              stroke="#3B6D11"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={`${styles.headline} ${styles.fadeIn} ${styles.delay1}`}>
          {t("headline")}
        </h1>

        <p className={`${styles.subtext} ${styles.fadeIn} ${styles.delay2}`}>
          {subtext}
        </p>

        {!status && (
          <p className={`${styles.subtext} ${styles.fadeIn} ${styles.delay2}`}>
            {t("hint")}
          </p>
        )}

        <div className={`${styles.divider} ${styles.fadeIn} ${styles.delay2}`} />

        <Link href="/" className={`${styles.backBtn} ${styles.fadeIn} ${styles.delay3}`}>
          {t("back")}
        </Link>
      </div>
    </section>
  );
}
