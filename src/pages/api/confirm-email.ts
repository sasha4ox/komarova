import type { NextApiRequest, NextApiResponse } from "next";
import { verifyConfirmToken } from "@/lib/confirmToken";
import { getSiteUrl } from "@/lib/emailVerification";
import { sendTelegramNotification } from "@/lib/telegramNotify";
import {
  buildSubmissionKeys,
  isAnyCompletedSubmission,
  markCompletedSubmission,
} from "@/lib/submissionDedup";

function getConfirmationUrl(locale: string) {
  const base = getSiteUrl();
  return locale === "ru"
    ? `${base}/ru/form-confirmation`
    : `${base}/form-confirmation`;
}

function getExpiredUrl(locale: string) {
  const base = getSiteUrl();
  return locale === "ru"
    ? `${base}/ru/email-pending?status=expired`
    : `${base}/email-pending?status=expired`;
}

export default async function confirmEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const token = typeof req.query.token === "string" ? req.query.token : "";

  if (!token) {
    return res.redirect(302, getExpiredUrl("uk"));
  }

  const payload = await verifyConfirmToken(token);

  if (!payload) {
    return res.redirect(302, getExpiredUrl("uk"));
  }

  try {
    const submissionKeys = buildSubmissionKeys(payload.email, payload.phone);

    if (!isAnyCompletedSubmission(submissionKeys)) {
      await sendTelegramNotification(payload);
      markCompletedSubmission(submissionKeys);
    }

    return res.redirect(302, getConfirmationUrl(payload.locale || "uk"));
  } catch {
    const locale = payload.locale || "uk";
    const base = getSiteUrl();
    const errorUrl =
      locale === "ru"
        ? `${base}/ru/email-pending?status=error`
        : `${base}/email-pending?status=error`;
    return res.redirect(302, errorUrl);
  }
}
