"use client";

import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import {
  hasRecentLeadSubmission,
  markLeadSubmitted,
  storeLeadTransactionId,
} from "../../helpers/leadTracking";
import styles from "./form.module.css";

const conriesToShow = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "UA",
  "US",
  "CA",
  "GB",
  "AU",
  "NZ",
  "JP",
  "CN",
  "IN",
  "BR",
  "MX",
  "KR",
  "SG",
  "CH",
  "NO",
  "TR",
  "IL",
  "AE",
  "SA",
  "ZA",
];

const ERROR_FIELD_MAP = {
  invalid_email: "email",
  disposable_email: "email",
  invalid_phone: "phone",
  missing_fields: "email",
  name_too_long: "firstName",
  text_too_long: "text",
};

export default function Form({ defaultText = "", compact = false }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("form");
  const showSocialLinks = false;
  const { control, handleSubmit, setError, formState: { isSubmitting } } =
    useForm({
      defaultValues: {
        firstName: "",
        phone: "",
        email: "",
        text: defaultText,
        locale,
      },
    });

  const getErrorMessage = (code) => {
    switch (code) {
      case "disposable_email":
        return t("disposableEmail");
      case "invalid_phone":
        return t("phoneInvalid");
      case "invalid_email":
        return t("emailInvalid");
      case "submit_failed":
        return t("submitFailed");
      case "duplicate_submission":
        return t("alreadySubmitted");
      default:
        return t("error");
    }
  };

  const onSubmit = async (data) => {
    if (hasRecentLeadSubmission(data.email, data.phone)) {
      setError("email", {
        type: "custom",
        message: t("alreadySubmitted"),
      });
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, locale }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        if (result.duplicate) {
          setError("email", {
            type: "custom",
            message: t("alreadySubmitted"),
          });
          return;
        }

        markLeadSubmitted(data.email, data.phone);
        storeLeadTransactionId(data.email, data.phone);

        if (result.pendingEmail) {
          const params = new URLSearchParams({ email: data.email });
          router.push(`/email-pending?${params.toString()}`);
          return;
        }

        router.push("/form-confirmation");
        return;
      }

      const errorCode = result.error || "submit_failed";
      const field = ERROR_FIELD_MAP[errorCode] || "email";
      const message =
        process.env.NODE_ENV === "development" && result.detail
          ? `${getErrorMessage(errorCode)} (${result.detail})`
          : getErrorMessage(errorCode);
      setError(field, {
        type: "custom",
        message,
      });
    } catch {
      setError("email", { type: "custom", message: t("submitFailed") });
    }
  };

  return (
    <section className={styles.formWrapper}>
      <h2>{t("title")}</h2>
      {!compact && <span className={styles.formHeader}>{t("intro")}</span>}
      {showSocialLinks && <div className={styles.links} />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: t("required") }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label={t("firstName")}
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{
            required: t("phoneRequired"),
            validate: (value) =>
              matchIsValidTel(value, {
                onlyCountries: conriesToShow,
              }) || t("phoneInvalid"),
          }}
          render={({ field, fieldState: { error } }) => (
            <MuiTelInput
              {...field}
              defaultCountry="UA"
              onlyCountries={conriesToShow}
              lang={locale === "ru" ? "ru" : "uk"}
              label={t("phone")}
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: t("required"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("emailInvalid"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label={t("email")}
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="text"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label={t("request")}
              placeholder={t("placeholder")}
              multiline
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <button type="submit" className={styles.send} disabled={isSubmitting}>
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </section>
  );
}
