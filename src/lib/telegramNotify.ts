import type { ContactMethod, SubmissionBody } from "./validateSubmission";
import { formatAttributionDetails } from "./attribution";
import { formatLocationDetails } from "./location";
import { localeTag, normalizeAppLocale } from "./locale";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const CONTACT_METHOD_LABELS: Record<
  ContactMethod,
  { uk: string; ru: string; en: string }
> = {
  telegram: { uk: "Telegram", ru: "Telegram", en: "Telegram" },
  viber: { uk: "Viber", ru: "Viber", en: "Viber" },
  whatsapp: { uk: "WhatsApp", ru: "WhatsApp", en: "WhatsApp" },
  signal: { uk: "Signal", ru: "Signal", en: "Signal" },
  phone: {
    uk: "Телефонний дзвінок",
    ru: "Телефонный звонок",
    en: "Phone call",
  },
};

const NOTIFICATION_LABELS = {
  uk: {
    name: "Ім'я",
    email: "Пошта",
    phone: "Телефон",
    contactMethod: "Спосіб зв'язку",
    message: "Повідомлення",
  },
  ru: {
    name: "Имя",
    email: "Почта",
    phone: "Телефон",
    contactMethod: "Способ связи",
    message: "Сообщение",
  },
  en: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    contactMethod: "Contact method",
    message: "Message",
  },
} as const;

function contactMethodLabel(method: ContactMethod, locale?: string) {
  const normalized = normalizeAppLocale(locale);
  return CONTACT_METHOD_LABELS[method][normalized];
}

function notificationLabels(locale?: string) {
  const normalized = normalizeAppLocale(locale);
  return NOTIFICATION_LABELS[normalized];
}

export async function sendTelegramNotification(body: SubmissionBody) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error("Telegram is not configured");
  }

  const prefix = localeTag(body.locale);
  const labels = notificationLabels(body.locale);
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
          ${labels.name}: ${body.firstName}\r\n
          ${labels.email}: ${body.email}\r\n
          ${labels.phone}: ${body.phone}\r\n
          ${labels.contactMethod}: ${contactMethodLabel(body.contactMethod, body.locale)}\r\n
          ${body.text ? `${labels.message}: ${body.text}\r\n` : ""}
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
