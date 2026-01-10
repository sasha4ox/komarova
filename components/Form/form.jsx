'use client'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useForm, Controller } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input'
import styles from "./form.module.css";
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const conriesToShow = [
                    // EU
                    'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT',
                    'LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE', 'UA',

                    // Major / common world countries
                    'US', // United States
                    'CA', // Canada
                    'GB', // United Kingdom
                    'AU', // Australia
                    'NZ', // New Zealand
                    'JP', // Japan
                    'CN', // China
                    'IN', // India
                    'BR', // Brazil
                    'MX', // Mexico
                    'KR', // South Korea
                    'SG', // Singapore
                    'CH', // Switzerland
                    'NO', // Norway
                    'TR', // Turkey
                    'IL', // Israel
                    'AE', // United Arab Emirates
                    'SA', // Saudi Arabia
                    'ZA'  // South Africa
                    ]

export default function Form() {
  const { control, handleSubmit, setError, formState: { isSubmitting } } = useForm({
  
  defaultValues: {
    firstName: "",
    phone: "",
    email: ""
  },
  });

  const [isEmailSent, setIsEmailSent] = useState(false);
  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/telegram', {
        method: 'post',
        headers: {
        'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        gtag_report_conversion()
        setIsEmailSent(true)
      }
    } catch (error) {
        setIsEmailSent(false)
        setError("email", { type: "custom", message: "Нажаль, ми не змогли відправити запит!" })
    }

  } 

  return (
    <section className={styles.formWrapper}>
      <h2>Записатись на Консультацію</h2>
      <span className={styles.formHeader}>Якщо у вас залишилися питання або потреба обговорити вашу проблему з психічним здоров’ям, будь ласка, не вагайтеся звернутися до мене.</span>
      <div className={styles.links}>
        <a href="https://t.me/KonungFox" target="_blank"  className={styles.link} aria-label="Приєднуйтесь до Telegram">
          <TelegramIcon fontSize='large'/>
        </a>
        <a className={styles.link} href="https://www.facebook.com/" target="_blank" aria-label="Приєднуйтесь до Facebook">
          <FacebookIcon fontSize='large'/>
        </a>
        <a className={styles.link} href="https://www.instagram.com/" target="_blank" aria-label="Приєднуйтесь до Instagram">
          <InstagramIcon fontSize='large'/>
        </a>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "Це поле обов'язкове" }}
          render={({ field, fieldState: { error } }) => (
              <TextField
                  {...field}
                  label="Ваше ім'я"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
              />
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{ required: "Телефон є обов'язковим полем" }}
          render={({ field, fieldState: { error } }) => (
              <MuiTelInput {...field}
                  defaultCountry="UA"
                  onlyCountries={conriesToShow}
                  label="Ваш телефон"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null} />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
          required: "Це поле обов'язкове",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Введіть коректну email адресу",
          },
        }}
          render={({ field, fieldState: { error } }) => (
              <TextField
                  {...field}
                  label="Ваш e-mail"
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
                  label="Повідомлення для мене"
                  multiline 
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
              />
          )}
        />
        {isEmailSent && <Alert severity="success" sx={{ mb: 2 }}>
    ✅    Запит успішно надіслано! Ми звʼяжемося з вами найближчим часом.
        </Alert>}
        <button type="submit" className={styles.send}>{isSubmitting ? "Надсилаю запит" : "Надіслати запит"}</button>
      </form>
    </section>
  );
}
