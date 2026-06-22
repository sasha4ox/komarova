"use client";

import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { MuiTelInput } from "mui-tel-input";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
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

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/telegram", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, locale }),
      });
      if (response.ok) {
        router.push("/form-confirmation");
      }
    } catch {
      setError("email", { type: "custom", message: t("error") });
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
          rules={{ required: t("phoneRequired") }}
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
        <button type="submit" className={styles.send}>
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </section>
  );
}
