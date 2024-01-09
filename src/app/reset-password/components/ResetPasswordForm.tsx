"use client"

import TextField from "@/components/TextField/TextField"
import { useSendEmailResetPassword } from "@/hooks/services/Auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, FieldErrors, useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import z from "zod"

const ResetPasswordSchema = z.object({
  email: z
    .string({ required_error: "email harus diisi" })
    .email({ message: "Masukan format email yang benar" })
    .nonempty({ message: "email harus diisi" }),
})

const ResetPasswordForm = () => {
  const router = useRouter()
  const { handleSubmit, control } = useForm<{ email: string }>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {},
    mode: "onChange",
  })

  const { mutate: sendEmailResetPassword, isPending } =
    useSendEmailResetPassword({
      onSuccess(data) {
        setCookie("email-reset-password", data?.email)
        return router.push("/email-action?action=resetPassword")
      },
      onError(err) {
        console.log(err)
      },
    })

  const onSubmit = async (data: { email: string }) => {
    sendEmailResetPassword({ email: data.email })
  }

  const onError = (error: FieldErrors<{ email: string }>) => {
    console.log(error)
    return error
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            placeholder="Email"
            type="email"
            onChange={onChange}
            isError={!!error}
            caption={error?.message}
            value={value || ""}
          />
        )}
      />

      <button
        className="btn-success mt-5 w-full"
        type="submit"
        disabled={isPending}
      >
        {isPending ? <ClipLoader size={20} color="#309C7A" /> : "Kirim"}
      </button>
    </form>
  )
}

export default ResetPasswordForm
