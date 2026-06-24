"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Typewriter from "typewriter-effect";
import styles from "./typewriter.module.css";
import Modal from "@mui/material/Modal";
import ConsultationModalBox from "../Form/ConsultationModalBox";

export default function TypeWriter() {
  const t = useTranslations("typewriter");
  const phrases = t.raw("phrases");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <section className={styles.typeWriterWrapper}>
      <Typewriter
        options={{
          loop: true,
          changeDelay: 100,
        }}
        onInit={(typewriter) => {
          phrases.forEach((phrase, index) => {
            typewriter.typeString(phrase).pauseFor(1500);
            if (index < phrases.length - 1) {
              typewriter.deleteAll();
            }
          });
          typewriter.start();
        }}
      />
      <button className={styles.typewriterButton} onClick={handleOpen}>
        {t("button")}
      </button>
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
    </section>
  );
}
