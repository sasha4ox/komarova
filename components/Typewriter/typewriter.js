"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Typewriter from "typewriter-effect";
import styles from "./typewriter.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Form from "../Form/form";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "15px",
  width: {
    xs: "90%",
    sm: "90%",
    md: "420px",
  },
};

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
          <Box sx={style}>
            <CloseIcon
              onClick={handleClose}
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                cursor: "pointer",
              }}
            />
            <Form />
          </Box>
        </Modal>
      </div>
    </section>
  );
}
