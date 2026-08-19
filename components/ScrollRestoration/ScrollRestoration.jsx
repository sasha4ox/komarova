"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
