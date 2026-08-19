"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@mui/material/Modal";
import ConsultationModalBox from "../Form/ConsultationModalBox";
import styles from "./contentPage.module.css";

export default function ConsultCta({ title, text, defaultText }) {
  const t = useTranslations("templates");
  const [open, setOpen] = useState(false);

  return (
    <aside className={styles.cta}>
      <h2>{title || t("ctaTitle")}</h2>
      {text ? <p>{text}</p> : <p>{t("ctaText")}</p>}
      <button type="button" onClick={() => setOpen(true)}>
        {t("ctaButton")}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="content-consult-title"
      >
        <ConsultationModalBox onClose={() => setOpen(false)} defaultText={defaultText} />
      </Modal>
    </aside>
  );
}
