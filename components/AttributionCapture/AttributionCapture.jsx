"use client";

import { useEffect } from "react";
import { captureAttribution } from "../../helpers/attribution";

export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
