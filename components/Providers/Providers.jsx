"use client";

import { CookieConsentProvider } from "../../contexts/CookieConsentContext";

export default function Providers({ children }) {
  return <CookieConsentProvider>{children}</CookieConsentProvider>;
}
