import { parsePhoneNumberFromString } from "libphonenumber-js";
import { isDisposableEmailDomain } from "./disposableEmailDomains";

export type SubmissionBody = {
  firstName: string;
  phone: string;
  email: string;
  text?: string;
  locale?: string;
};

export type ValidationErrorCode =
  | "missing_fields"
  | "invalid_email"
  | "disposable_email"
  | "invalid_phone"
  | "name_too_long"
  | "text_too_long";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const MAX_NAME_LENGTH = 100;
const MAX_TEXT_LENGTH = 5000;

export function normalizeSubmission(body: unknown): SubmissionBody | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const data = body as Record<string, unknown>;

  return {
    firstName: String(data.firstName ?? "").trim(),
    phone: String(data.phone ?? "").trim(),
    email: String(data.email ?? "").trim().toLowerCase(),
    text: String(data.text ?? "").trim(),
    locale: String(data.locale ?? "uk").trim() || "uk",
  };
}

export function validateSubmission(
  body: SubmissionBody,
):
  | { ok: true; data: SubmissionBody }
  | { ok: false; code: ValidationErrorCode } {
  if (!body.firstName || !body.phone || !body.email) {
    return { ok: false, code: "missing_fields" };
  }

  if (body.firstName.length > MAX_NAME_LENGTH) {
    return { ok: false, code: "name_too_long" };
  }

  if ((body.text?.length ?? 0) > MAX_TEXT_LENGTH) {
    return { ok: false, code: "text_too_long" };
  }

  if (!EMAIL_REGEX.test(body.email)) {
    return { ok: false, code: "invalid_email" };
  }

  const emailDomain = body.email.split("@")[1];
  if (!emailDomain || isDisposableEmailDomain(emailDomain)) {
    return { ok: false, code: "disposable_email" };
  }

  const phoneNumber = parsePhoneNumberFromString(body.phone);
  if (!phoneNumber || !phoneNumber.isValid()) {
    return { ok: false, code: "invalid_phone" };
  }

  return {
    ok: true,
    data: {
      ...body,
      phone: phoneNumber.formatInternational(),
      locale: body.locale === "ru" ? "ru" : "uk",
    },
  };
}
