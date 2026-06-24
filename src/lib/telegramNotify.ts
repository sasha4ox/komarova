import type { ContactMethod, SubmissionBody } from "./validateSubmission";
import { formatAttributionDetails } from "./attribution";
import { formatLocationDetails } from "./location";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

function localeTag(locale?: string) {
  if (locale === "ru") return "[RU]";
  if (locale === "uk") return "[UK]";
  return "";
}

const CONTACT_METHOD_LABELS: Record<ContactMethod, { uk: string; ru: string }> =
  {
    telegram: { uk: "Telegram", ru: "Telegram" },
    viber: { uk: "Viber", ru: "Viber" },
    whatsapp: { uk: "WhatsApp", ru: "WhatsApp" },
    signal: { uk: "Signal", ru: "Signal" },
    phone: { uk: "Телефонний дзвінок", ru: "Телефонный звонок" },
  };

function contactMethodLabel(method: ContactMethod, locale?: string) {
  const labels = CONTACT_METHOD_LABELS[method];
  return locale === "ru" ? labels.ru : labels.uk;
}

export async function sendTelegramNotification(body: SubmissionBody) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error("Telegram is not configured");
  }

  const prefix = localeTag(body.locale);
  const sourceDetails = formatAttributionDetails(body.attribution);
  const locationDetails = formatLocationDetails(body.location);

  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `${prefix ? `${prefix} ` : ""}💬 Website:\n
          Ім'я: ${body.firstName}\r\n
          Пошта: ${body.email}\r\n
          Телефон: ${body.phone}\r\n
          Спосіб зв'язку: ${contactMethodLabel(body.contactMethod, body.locale)}\r\n
          ${body.text ? `Повідомлення: ${body.text}\r\n` : ""}
          ${locationDetails ? `${locationDetails}\r\n` : ""}
          ${sourceDetails ? `${sourceDetails}\r\n` : ""}
          `,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}
