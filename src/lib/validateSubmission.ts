import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  normalizeAttribution,
  type SubmissionAttribution,
} from "./attribution";
import { isDisposableEmailDomain } from "./disposableEmailDomains";
import { countryNameFromCode, type SubmissionLocation } from "./location";
import { intlDisplayLocale, normalizeAppLocale } from "./locale";

export type { SubmissionAttribution };

export const CONTACT_METHODS = [
  "telegram",
  "viber",
  "whatsapp",
  "signal",
  "phone",
] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type SubmissionBody = {
  firstName: string;
  phone: string;
  contactMethod: ContactMethod;
  email: string;
  text?: string;
  locale?: string;
  attribution?: SubmissionAttribution;
  location?: SubmissionLocation;
};

export function isContactMethod(value: string): value is ContactMethod {
  return CONTACT_METHODS.includes(value as ContactMethod);
}

export type ValidationErrorCode =
  | "missing_fields"
  | "missing_contact_method"
  | "invalid_email"
  | "disposable_email"
  | "invalid_phone"
  | "name_too_long"
  | "text_too_long";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const MAX_NAME_LENGTH = 100;
const MAX_TEXT_LENGTH = 5000;

export type NormalizedSubmission = Omit<SubmissionBody, "contactMethod"> & {
  contactMethod: string;
};

export function normalizeSubmission(body: unknown): NormalizedSubmission | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const data = body as Record<string, unknown>;

  return {
    firstName: String(data.firstName ?? "").trim(),
    phone: String(data.phone ?? "").trim(),
    contactMethod: String(data.contactMethod ?? "").trim(),
    email: String(data.email ?? "").trim().toLowerCase(),
    text: String(data.text ?? "").trim(),
    locale: normalizeAppLocale(String(data.locale ?? "uk").trim() || "uk"),
    attribution: normalizeAttribution(data),
  };
}

export function validateSubmission(
  body: NormalizedSubmission,
):
  | { ok: true; data: SubmissionBody }
  | { ok: false; code: ValidationErrorCode } {
  if (!body.firstName || !body.phone || !body.email) {
    return { ok: false, code: "missing_fields" };
  }

  if (!body.contactMethod || !isContactMethod(body.contactMethod)) {
    return { ok: false, code: "missing_contact_method" };
  }

  const contactMethod = body.contactMethod;

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
      contactMethod,
      phone: phoneNumber.formatInternational(),
      locale: normalizeAppLocale(body.locale),
      location: phoneNumber.country
        ? {
            phoneCountryCode: phoneNumber.country,
            phoneCountry: countryNameFromCode(
              phoneNumber.country,
              intlDisplayLocale(body.locale),
            ),
          }
        : body.location,
    },
  };
}
