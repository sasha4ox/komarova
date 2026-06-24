"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./descriptionCard.module.css";
import Modal from "@mui/material/Modal";
import ConsultationModalBox from "../Form/ConsultationModalBox";

export default function DescriptionCard({ name, photo }) {
  const t = useTranslations("descriptionCard");
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className={styles.descriptionCard}
        onClick={handleModal}
        aria-label={t("openAria")}
      >
        <p className={styles.descriptionCardName}>{name}</p>
        <div className={styles.descriptionCardPhotoCover}>
          <Image
            className={styles.photo}
            src={`/${photo}`}
            quality={100}
            fill
            alt={name}
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ConsultationModalBox onClose={handleModal} />
      </Modal>
    </>
  );
}
