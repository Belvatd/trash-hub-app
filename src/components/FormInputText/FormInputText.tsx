"use client"

import { Control, Controller } from "react-hook-form"
import TextField, { TTextFieldProps } from "../TextField/TextField"

type FormTextType = {
  control: Control<any, any>
  name: string
  label: string
} & TTextFieldProps

const FormInputText = (props: FormTextType) => {
  const { control, name, label, ...inputProps } = props

  return (
    <Controller
      name={name || ""}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TextField
            {...inputProps}
            placeholder={label || ""}
            onChange={onChange}
            isError={!!error}
            caption={error?.message}
            value={value || ""}
          />
        </>
      )}
    />
  )
}

export default FormInputText
