import uk from "../../messages/uk.json";
import ru from "../../messages/ru.json";

type EmailConfirmCopy = {
  subject: string;
  greeting: string;
  body: string;
  button: string;
  expiry: string;
  ignore: string;
};

export function getEmailConfirmMessages(locale?: string): EmailConfirmCopy {
  const messages = locale === "ru" ? ru : uk;
  return messages.emailConfirm as EmailConfirmCopy;
}
