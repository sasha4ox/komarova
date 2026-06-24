import uk from "../../messages/uk.json";
import ru from "../../messages/ru.json";
import en from "../../messages/en.json";
import { normalizeAppLocale } from "./locale";

type EmailConfirmCopy = {
  subject: string;
  greeting: string;
  body: string;
  button: string;
  expiry: string;
  ignore: string;
};

const messagesByLocale = {
  uk,
  ru,
  en,
} as const;

export function getEmailConfirmMessages(locale?: string): EmailConfirmCopy {
  const normalized = normalizeAppLocale(locale);
  return messagesByLocale[normalized].emailConfirm as EmailConfirmCopy;
}
