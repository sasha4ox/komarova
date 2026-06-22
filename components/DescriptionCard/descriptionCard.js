"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./descriptionCard.module.css";
import Modal from "@mui/material/Modal";
import Form from "../Form/form";
import Box from "@mui/material/Box";
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
        <Box sx={style}>
          <CloseIcon
            onClick={handleModal}
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
    </>
  );
}
