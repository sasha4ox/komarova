import type { NextApiRequest, NextApiResponse } from "next";

const mail = require("@sendgrid/mail");

function localeTag(locale?: string) {
  if (locale === "ru") return "[RU]";
  if (locale === "uk") return "[UK]";
  return "";
}

export default async function contactsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    mail.setApiKey(process.env.SENDGRID_API_KEY);
    const body = req.body;
    const prefix = localeTag(body.locale);

    const message = `
      ${prefix ? `${prefix}\r\n` : ""}
      Ім'я: ${body.firstName}\r\n
      Пошта: ${body.email}\r\n
      Телефон: ${body.phone}\r\n
      Повідомленя: ...
    `;

    const data = {
      to: "irinavfox@gmail.com",
      from: "sasha4ox@gmail.com",
      subject: `${prefix ? `${prefix} ` : ""}Запит до психола - Ірина Комарова`,
      text: message,
      html: message.replace(/\r\n/g, "<br />"),
    };

    await mail.send(data);

    res.status(200).json({ status: "OK" });
  } catch {
    res.status(500).json({ status: "BAD REQUEST" });
  }
}
