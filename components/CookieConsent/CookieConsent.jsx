"use client";

import { useTranslations } from "next-intl";
import CookieIcon from "@mui/icons-material/Cookie";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import { Link } from "@/i18n/navigation";
import { useCookieConsentContext } from "../../contexts/CookieConsentContext";
import { DEFAULT_CONSENT } from "../../helpers/cookieConsent";
import styles from "./CookieConsent.module.css";

const CATEGORY_IDS = ["essential", "analytics", "marketing", "functional"];

export default function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const {
    consent,
    showBanner,
    isSettingsOpen,
    acceptAll,
    rejectNonEssential,
    updateCategory,
    savePreferences,
    openSettings,
  } = useCookieConsentContext();

  if (!showBanner) {
    return null;
  }

  const currentConsent = consent ?? DEFAULT_CONSENT;

  const handleCustomize = () => {
    if (isSettingsOpen) {
      savePreferences(currentConsent);
    } else {
      openSettings();
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      aria-modal="true"
      className={styles.banner}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.icon} aria-hidden="true">
            <CookieIcon fontSize="small" />
          </div>
          <div className={styles.content}>
            <h2 id="cookie-consent-title" className={styles.title}>
              {t("title")}
            </h2>
            <p id="cookie-consent-desc" className={styles.description}>
              {t("description")}
            </p>
            <div className={styles.legalLinks}>
              <Link href="/polityka-konfidentsiynosti" className={styles.legalLink}>
                {t("privacyPolicy")}
              </Link>
              <span className={styles.legalDivider} aria-hidden="true">
                ·
              </span>
              <Link href="/cookie-policy" className={styles.legalLink}>
                {t("cookiePolicy")}
              </Link>
            </div>
          </div>
        </div>

        <Collapse in={isSettingsOpen}>
          <div
            id="cookie-settings-panel"
            className={styles.settingsPanel}
          >
            <p className={styles.settingsTitle}>{t("customizeTitle")}</p>
            {CATEGORY_IDS.map((id) => (
              <div key={id} className={styles.categoryRow}>
                <div>
                  <p className={styles.categoryName}>{t(`category_${id}`)}</p>
                  <p className={styles.categoryDesc}>{t(`category_${id}_desc`)}</p>
                </div>
                <Switch
                  checked={currentConsent[id]}
                  disabled={id === "essential"}
                  onChange={(_, checked) => updateCategory(id, checked)}
                  inputProps={{
                    "aria-label": t(`category_${id}`),
                  }}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#352228",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#c4977a",
                    },
                  }}
                />
              </div>
            ))}
          </div>
        </Collapse>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={acceptAll}
            aria-label={t("acceptAll")}
          >
            {t("acceptAll")}
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={rejectNonEssential}
            aria-label={t("rejectNonEssential")}
          >
            {t("rejectNonEssential")}
          </button>
          <button
            type="button"
            className={styles.btnText}
            onClick={handleCustomize}
            aria-expanded={isSettingsOpen}
            aria-controls="cookie-settings-panel"
            id="cookie-settings-trigger"
          >
            {isSettingsOpen ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <SettingsIcon fontSize="small" />
            )}
            {isSettingsOpen ? t("savePreferences") : t("customize")}
          </button>
        </div>
      </div>
    </div>
  );
}
