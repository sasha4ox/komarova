"use client";

import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Form from "./form";
import { consultationModalSx } from "./consultationModal";
import styles from "./consultationModal.module.css";

export default function ConsultationModalBox({
  onClose,
  defaultText = "",
  compact = false,
}) {
  return (
    <Box sx={consultationModalSx} className={styles.modalBox}>
      <CloseIcon
        onClick={onClose}
        className={styles.closeBtn}
        aria-label="Close"
      />
      <Form defaultText={defaultText} compact={compact} inModal />
    </Box>
  );
}
