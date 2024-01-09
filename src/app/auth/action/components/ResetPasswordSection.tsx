"use client"

import TextField from "@/components/TextField/TextField"
import {
  ResetPasswordSchema,
  TResetPassword,
  useResetPassword,
} from "@/hooks/services/Auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "react-feather"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"

type TResetPasswordSectionProps = {
  code?: string
}

const ResetPasswordSection = ({ code }: TResetPasswordSectionProps) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const { register, handleSubmit, formState } = useForm<TResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {},
    mode: "onChange",
  })
  const { errors } = formState

  const { mutate: resetPassword, isPending } = useResetPassword({
    onSuccess: () => {
      return router.push("/login")
    },
    onError(error) {
      console.log(error)
    },
  })

  const onSubmit = (data: TResetPassword) => {
    resetPassword({
      code: code || "",
      password: data.confirmPassword,
    })
  }

  return (
    <div className="mb-1 grid w-full gap-5">
      <div>
        <p className="text-xl font-semibold text-gray900">Lupa Kata Sandi</p>
        <p className="mt-2 text-sm text-gray500">Buat sandi baru</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <TextField
            placeholder="Kata Sandi Baru"
            type={showPassword ? "text" : "password"}
            isError={!!errors.password}
            caption={errors?.password?.message}
            addonRight={() => (
              <button
                className="text-gray400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
            {...register("password")}
          />

          <TextField
            placeholder="Konfirmasi Kata Sandi Baru"
            type={showPassword2 ? "text" : "password"}
            isError={!!errors.confirmPassword}
            caption={errors?.confirmPassword?.message}
            addonRight={() => (
              <button
                className="text-gray400"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
            {...register("confirmPassword")}
          />
        </div>

        <button className="btn-success mt-5" disabled={isPending}>
          {isPending ? <ClipLoader size={20} color="#309C7A" /> : "Simpan"}
        </button>
      </form>
    </div>
  )
}

export default ResetPasswordSection
