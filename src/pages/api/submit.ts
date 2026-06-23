import type { NextApiRequest, NextApiResponse } from "next";
import { createConfirmToken } from "@/lib/confirmToken";
import { isEmailVerificationEnabled } from "@/lib/emailVerification";
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail";
import { sendTelegramNotification } from "@/lib/telegramNotify";
import {
  normalizeSubmission,
  validateSubmission,
  type ValidationErrorCode,
} from "@/lib/validateSubmission";

export default async function submitHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const normalized = normalizeSubmission(req.body);
  if (!normalized) {
    return res.status(400).json({ error: "missing_fields" satisfies ValidationErrorCode });
  }

  const validation = validateSubmission(normalized);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.code });
  }

  const data = validation.data;

  try {
    if (!isEmailVerificationEnabled()) {
      await sendTelegramNotification(data);
      return res.status(200).json({ ok: true });
    }

    const token = await createConfirmToken(data);
    await sendConfirmationEmail(data, token);

    return res.status(200).json({ ok: true, pendingEmail: true });
  } catch (error) {
    console.error("Submit failed:", error);

    const message = error instanceof Error ? error.message : "unknown_error";
    const isDev = process.env.NODE_ENV === "development";

    return res.status(500).json({
      error: "submit_failed",
      ...(isDev ? { detail: message } : {}),
    });
  }
}
