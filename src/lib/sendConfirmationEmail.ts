import { Resend } from "resend";
import { getSiteUrl } from "./emailVerification";
import { getEmailConfirmMessages } from "./emailConfirmMessages";
import type { SubmissionBody } from "./validateSubmission";

export async function sendConfirmationEmail(
  body: SubmissionBody,
  token: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("Resend is not configured");
  }

  const resend = new Resend(apiKey);
  const copy = getEmailConfirmMessages(body.locale);
  const confirmUrl = `${getSiteUrl()}/api/confirm-email?token=${encodeURIComponent(token)}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #352228; max-width: 560px;">
      <p>${copy.greeting.replace("{name}", body.firstName)}</p>
      <p>${copy.body}</p>
      <p style="margin: 28px 0;">
        <a href="${confirmUrl}" style="display: inline-block; background: #c4977a; color: #fff; text-decoration: none; padding: 14px 24px; border-radius: 10px; font-weight: 600;">
          ${copy.button}
        </a>
      </p>
      <p style="font-size: 14px; color: #725e65;">${copy.expiry}</p>
      <p style="font-size: 14px; color: #725e65;">${copy.ignore}</p>
    </div>
  `;

  const text = `${copy.greeting.replace("{name}", body.firstName)}\n\n${copy.body}\n\n${copy.button}: ${confirmUrl}\n\n${copy.expiry}\n\n${copy.ignore}`;

  const result = await resend.emails.send({
    from: `Ірина Комарова <${from}>`,
    to: body.email,
    subject: copy.subject,
    html,
    text,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}
