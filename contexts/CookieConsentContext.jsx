"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_CONSENT,
  getStoredConsent,
  hasUserConsented,
  setStoredConsent,
} from "../helpers/cookieConsent";

const CookieConsentContext = createContext(null);

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored ?? DEFAULT_CONSENT);
    setShowBanner(!hasUserConsented());
  }, []);

  const hasConsented = consent !== null && consent.timestamp > 0;

  const persist = useCallback((next) => {
    const withTimestamp = {
      ...next,
      timestamp: Date.now(),
      version: DEFAULT_CONSENT.version,
    };
    setStoredConsent(withTimestamp);
    setConsent(withTimestamp);
  }, []);

  const acceptAll = useCallback(() => {
    persist({
      ...DEFAULT_CONSENT,
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
    setShowBanner(false);
    setIsSettingsOpen(false);
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({
      ...DEFAULT_CONSENT,
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
    setShowBanner(false);
    setIsSettingsOpen(false);
  }, [persist]);

  const updateCategory = useCallback((category, enabled) => {
    setConsent((prev) => {
      if (!prev) {
        return prev;
      }

      return { ...prev, [category]: enabled };
    });
  }, []);

  const savePreferences = useCallback(
    (prefs) => {
      const base = consent ?? DEFAULT_CONSENT;
      persist({
        ...base,
        ...prefs,
        essential: true,
      });
      setShowBanner(false);
      setIsSettingsOpen(false);
    },
    [consent, persist],
  );

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);
  const closeBanner = useCallback(() => setShowBanner(false), []);
  const reopenBanner = useCallback(() => setShowBanner(true), []);

  const value = {
    consent,
    hasConsented,
    showBanner,
    isSettingsOpen,
    acceptAll,
    rejectNonEssential,
    updateCategory,
    savePreferences,
    openSettings,
    closeSettings,
    closeBanner,
    reopenBanner,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsentContext must be used within CookieConsentProvider",
    );
  }

  return ctx;
}
