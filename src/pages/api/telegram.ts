import type { NextApiRequest, NextApiResponse } from 'next';

const BOT_TOKEN = '8202816891:AAHfoB0CO4xKHHBeNHzINzm31jHtJGtt234';
const CHAT_ID = '-5253487144';

export default async function TelegramHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
  const body = req.body;


  const thirdPartyResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `💬 Website:\n
          Ім'я: ${body.firstName}\r\n
          Пошта: ${body.email}\r\n
          Телефон: ${body.phone}\r\n
           ${body.text ? `Повідомлення: ${body.text}` : '' }
          `
      }),
    });
    
    if (thirdPartyResponse.status === 200) {
       res.send({ ok: true });
    } else {
      res.status(400).json({ status: 'BAD REQUEST', error: thirdPartyResponse });
    }
    
  } catch(error) {
    res.status(500).json({ status: 'BAD REQUEST' });
  }
  
};