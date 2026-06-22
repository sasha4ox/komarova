import type { NextApiRequest, NextApiResponse } from "next";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

function localeTag(locale?: string) {
  if (locale === "ru") return "[RU]";
  if (locale === "uk") return "[UK]";
  return "";
}

export default async function TelegramHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const body = req.body;
    const prefix = localeTag(body.locale);

    const thirdPartyResponse = await fetch(
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
    const response = await thirdPartyResponse.json();

    if (thirdPartyResponse.status === 200) {
      res.send({ ok: true });
    } else {
      res.status(400).json({ status: "BAD REQUEST", error: response });
    }
  } catch {
    res.status(500).json({ status: "BAD REQUEST" });
  }
}
