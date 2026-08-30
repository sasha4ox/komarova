"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { persistGoogleTagDebugParams } from "../../helpers/googleTagVerification";

export default function GoogleTagDebugPersistence() {
  const pathname = usePathname();

  useEffect(() => {
    persistGoogleTagDebugParams();
  }, [pathname]);

  return null;
}
