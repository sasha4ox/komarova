import type { SubmissionBody } from "./validateSubmission";

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const TIMEOUT_MS = 5000;

/** Prefix with ' so Sheets stores values like +380... as text, not formulas. */
function asSheetText(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  if (/^[=+\-@]/.test(trimmed)) {
    return `'${trimmed}`;
  }

  return trimmed;
}

export async function sendLeadToGoogleSheets(body: SubmissionBody): Promise<void> {
  if (!WEBHOOK_URL) {
    console.warn("GOOGLE_SHEETS_WEBHOOK_URL not set, skipping Google Sheets");
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.firstName,
        email: body.email,
        phone: asSheetText(body.phone),
        gclid: body.gclid || body.attribution?.gclid || "",
      }),
      signal: controller.signal,
      redirect: "follow",
    });

    const text = await response.text();

    if (!response.ok) {
      if (response.status === 401) {
        console.error(
          "Google Sheets webhook failed: 401 Unauthorized. Redeploy the Apps Script Web App with Execute as: Me and Who has access: Anyone (not 'Only myself' or 'Anyone with Google account').",
        );
      } else {
        console.error("Google Sheets webhook failed:", response.status, text.slice(0, 200));
      }
      return;
    }

    try {
      const result = JSON.parse(text) as { ok?: boolean; error?: string };
      if (result.ok === false) {
        console.error("Google Sheets webhook error:", result.error);
      }
    } catch {
      if (text.includes("doPost") || text.includes("doGet")) {
        console.error(
          "Google Sheets webhook: Apps Script handler missing. Deploy doPost in Apps Script and create a new Web App deployment.",
        );
      } else {
        console.error("Google Sheets webhook unexpected response:", text.slice(0, 200));
      }
    }
  } catch (error) {
    console.error("Google Sheets webhook error:", error);
  } finally {
    clearTimeout(timeout);
  }
}
