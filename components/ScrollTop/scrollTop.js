"use client";

import styles from "./scrollTop.module.css";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const WHEN_SHOW_BUTTON = 500;

export default function ScrollTop() {
  const t = useTranslations("scrollTop");
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <>
      {scrollPosition >= WHEN_SHOW_BUTTON && (
        <button
          onClick={scrollToTop}
          className={styles.button}
          aria-label={t("ariaLabel")}
        >
          <ArrowCircleUpIcon sx={{ color: "white" }} />
        </button>
      )}
    </>
  );
}
