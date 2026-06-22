"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./contacts.module.css";
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
    </div>
  );
}
