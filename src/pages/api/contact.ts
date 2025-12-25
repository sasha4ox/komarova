import type { NextApiRequest, NextApiResponse } from 'next'
const mail = require('@sendgrid/mail');

export default async function contactsHandler (req: NextApiRequest, res: NextApiResponse) {
  try {
  mail.setApiKey(process.env.SENDGRID_API_KEY);
  const body = req.body

  const message = `
    Ім'я: ${body.firstName}\r\n
    Пошта: ${body.email}\r\n
    Телефон: ${body.phone}\r\n
    Повідомленя: ...
  `;

  const data = {
    to: 'irinavfox@gmail.com',
    from: 'sasha4ox@gmail.com',
    subject: `Запит до психола - Ірина Комарова`,
    text: message,
    html: message.replace(/\r\n/g, '<br />'),
  };

  await mail.send(data);

    res.status(200).json({ status: 'OK' });
  } catch(error) {
    res.status(500).json({ status: 'BAD REQUEST' });
  }
  
};