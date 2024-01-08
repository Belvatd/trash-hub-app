"use client";

import { Control, Controller } from "react-hook-form";
import { ReactNode } from "react";
import { TextField, TextFieldProps } from "@mui/material";

type FormTextType = {
  control: Control<any, any>;
  name: string;
  label: ReactNode;
} & TextFieldProps;

const FormInputText = (props: FormTextType) => {
  const { control, name, label, ...inputProps } = props;
  return (
    <Controller
      name={name || ""}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <>
          <TextField
            {...inputProps}
            helperText={error ? error.message : ""}
            label={label}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            variant="outlined"
          />
        </>
      )}
    />
  );
};

export default FormInputText;
