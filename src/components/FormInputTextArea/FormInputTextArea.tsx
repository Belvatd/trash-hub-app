"use client"

import { Control, Controller } from "react-hook-form"
import TextArea, { TTextAreaProps } from "../TextArea/TextArea"

type FormTextType = {
  control: Control<any, any>
  name: string
  label: string
} & TTextAreaProps

const FormInputText = (props: FormTextType) => {
  const { control, name, label, ...inputProps } = props
  return (
    <Controller
      name={name || ""}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <>
          <TextArea
            {...inputProps}
            placeholder={label || ""}
            isError={!!error}
            caption={error?.message}
            onChange={onChange}
          />
        </>
      )}
    />
  )
}

export default FormInputText
