import type { NextApiRequest, NextApiResponse } from "next";
import { verifyConfirmToken } from "@/lib/confirmToken";
import { getSiteUrl } from "@/lib/emailVerification";
import { localePathPrefix, normalizeAppLocale } from "@/lib/locale";
import { sendTelegramNotification } from "@/lib/telegramNotify";
import {
  buildSubmissionKeys,
  isAnyCompletedSubmission,
  markCompletedSubmission,
} from "@/lib/submissionDedup";

function localizedPath(locale: string, path: string) {
  const base = getSiteUrl();
  const prefix = localePathPrefix(normalizeAppLocale(locale));
  return `${base}${prefix}${path}`;
}

function getConfirmationUrl(locale: string) {
  return localizedPath(locale, "/form-confirmation");
}

function getExpiredUrl(locale: string) {
  return localizedPath(locale, "/email-pending?status=expired");
}

function getErrorUrl(locale: string) {
  return localizedPath(locale, "/email-pending?status=error");
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

    return res.redirect(
      302,
      getConfirmationUrl(payload.locale || "uk"),
    );
  } catch {
    return res.redirect(
      302,
      getErrorUrl(payload.locale || "uk"),
    );
  }
}
