'use client'
import { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
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
  const { control, handleSubmit } = useForm({
   
  defaultValues: {
    firstName: "",
    phone: "",
    email: ""
  },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <section className={styles.formWrapper}>
      <span className={styles.formHeader}>Якщо у вас залишились питання чи запити щодо Вашої проблеми з психічним здоров’ям, будь ласка, не соромтеся зв’язатися зі мною.</span>
      <div className={styles.links}>
        <a href="https://t.me/KonungFox" target="_blank"  className={styles.link}>
          <TelegramIcon fontSize='large'/>
        </a>
        <a className={styles.link} target="_blank">
          <FacebookIcon fontSize='large'/>
        </a>
        <a className={styles.link} target="_blank">
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
                  label="Ваше ім'я або псевдоним"
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
          rules={{ required: "Це поле обов'язкове" }}
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
        <button type="submit" className={styles.send}>Надіслати запит</button>
      </form>
    </section>
  );
}
