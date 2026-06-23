import type { SubmissionBody } from "./validateSubmission";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

function localeTag(locale?: string) {
  if (locale === "ru") return "[RU]";
  if (locale === "uk") return "[UK]";
  return "";
}

export async function sendTelegramNotification(body: SubmissionBody) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error("Telegram is not configured");
  }

  const prefix = localeTag(body.locale);

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
           ${body.text ? `Повідомлення: ${body.text}` : ""}
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
