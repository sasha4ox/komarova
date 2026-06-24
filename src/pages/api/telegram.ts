import type { NextApiRequest, NextApiResponse } from "next";
import { sendTelegramNotification } from "@/lib/telegramNotify";
import { isContactMethod } from "@/lib/validateSubmission";

export default async function TelegramHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  try {
    const body = req.body;
    const contactMethodRaw = String(body.contactMethod ?? "phone");
    await sendTelegramNotification({
      firstName: String(body.firstName ?? ""),
      email: String(body.email ?? ""),
      phone: String(body.phone ?? ""),
      contactMethod: isContactMethod(contactMethodRaw)
        ? contactMethodRaw
        : "phone",
      text: String(body.text ?? ""),
      locale: String(body.locale ?? "uk"),
    });
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ status: "BAD REQUEST", error });
  }
}
