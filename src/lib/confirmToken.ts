import { SignJWT, jwtVerify } from "jose";
import { normalizeAttribution } from "./attribution";
import { normalizeLocation } from "./location";
import {
  isContactMethod,
  type SubmissionBody,
} from "./validateSubmission";

const TOKEN_TTL = "24h";

export type ConfirmTokenPayload = SubmissionBody;

function getSecret() {
  const secret = process.env.EMAIL_CONFIRM_SECRET;
  if (!secret) {
    throw new Error("EMAIL_CONFIRM_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

export async function createConfirmToken(payload: ConfirmTokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(getSecret());
}

export async function verifyConfirmToken(
  token: string,
): Promise<ConfirmTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const firstName = String(payload.firstName ?? "");
    const email = String(payload.email ?? "");
    const phone = String(payload.phone ?? "");
    const contactMethod = String(payload.contactMethod ?? "");
    const text = String(payload.text ?? "");
    const locale = String(payload.locale ?? "uk");
    const gclid = String(payload.gclid ?? "").trim() || undefined;
    const attribution = normalizeAttribution(payload as Record<string, unknown>);
    const location = normalizeLocation(payload as Record<string, unknown>);

    if (!firstName || !email || !phone || !isContactMethod(contactMethod)) {
      return null;
    }

    return {
      firstName,
      email,
      phone,
      contactMethod,
      text,
      locale,
      gclid,
      attribution,
      location,
    };
  } catch {
    return null;
  }
}
