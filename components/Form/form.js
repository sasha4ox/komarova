'use client'
import { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useForm, Controller } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input'
import styles from "./form.module.css";


function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = useMemo(() => {
    if (focused) {
      return 'This field is being focused';
    }

    return 'Helper text';
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

export default function Form() {
     const { control, handleSubmit } = useForm({
    // Define default values
    defaultValues: {
      firstName: "",
      phone: "",
      email: ""
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Controller
        name="firstName"
        control={control} // Pass the control object
        rules={{ required: "Це поле обов'язкове" }} // Add validation rules
        render={({ field, fieldState: { error } }) => (
            <TextField
                {...field} // Spreads onChange, onBlur, name, value, and ref
                label="Ваше ім'я або псевдоним"
                variant="outlined"
                error={!!error}
                helperText={error ? error.message : null}
            />
        )}
      />
      <Controller
        name="phone"
        control={control} // Pass the control object
        rules={{ required: "Телефон є обов'язковим полем" }} // Add validation rules
        render={({ field, fieldState: { error } }) => (
            <MuiTelInput {...field}
                defaultCountry="UA"
                onlyCountries={[
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
                    ]}
                label="Ваш телефон"
                variant="outlined"
                error={!!error}
                helperText={error ? error.message : null} />
        )}
      />
      <Controller
        name="email"
        control={control} // Pass the control object
        rules={{ required: "Це поле обов'язкове" }} // Add validation rules
        render={({ field, fieldState: { error } }) => (
            <TextField
                {...field} // Spreads onChange, onBlur, name, value, and ref
                label="Ваш e-mail"
                variant="outlined"
                error={!!error}
                helperText={error ? error.message : null}
            />
        )}
      />
      <button type="submit">Надіслати запит</button>
    </form>
  );
}
