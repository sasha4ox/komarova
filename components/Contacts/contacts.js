"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./contacts.module.css";
import Modal from "@mui/material/Modal";
import ConsultationModalBox from "../Form/ConsultationModalBox";

export default function Contacts() {
  const t = useTranslations("contacts");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.whereWeMaCallWrapper}>
      <h1 className={styles.sectionName}>{t("title")}</h1>
      <section>
        <p className={styles.whereWeMaCallHeader}>{t("meetingsTitle")}</p>
        <p>{t("body")}</p>
        <button className={styles.whereWeMaCallButton} onClick={handleOpen}>
          {t("book")}
        </button>
      </section>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title-card"
          aria-describedby="modal-modal-description"
        >
          <ConsultationModalBox onClose={handleClose} />
        </Modal>
      </div>
    </div>
  );
}
