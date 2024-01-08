"use client"

import TextField from "@/components/TextField/TextField"
import { TypeAccount } from "@/constants/type"
import {
  LoginUserSchema,
  LoginUserType,
  useLoginUser,
} from "@/hooks/services/Auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircularProgress } from "@mui/material"
import { sendEmailVerification } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "react-feather"
import { FieldErrors, useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"

const pathTypeAccont = {
  [TypeAccount.CLEANER]: "/cleaner",
  [TypeAccount.CUSTOMER]: "/customer",
}

const UserLoginForm = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit } = useForm<LoginUserType>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {},
    mode: "onChange",
  })

  const { mutate, isPending } = useLoginUser({
    onSuccess: async (data) => {
      if (!data.user.emailVerified) {
        await sendEmailVerification(data.user)
        return router.push("/email-action?actionverifyEmail")
      }

      router.push(pathTypeAccont[data.type])
    },
    onError(err: any) {
      console.log("error:", err)
    },
  })

  const onError = (error: FieldErrors<LoginUserType>) => {
    console.log(error)
    return error
  }

  const onSubmit = async (data: LoginUserType) => {
    try {
      const payload = {
        email: data?.email,
        password: data?.password,
      }
      mutate(payload)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="grid gap-2">
          <TextField placeholder="Email" type="email" {...register("email")} />
          <TextField
            placeholder="Kata Sandi"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            addonRight={() => (
              <button
                className="text-gray400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          />
        </div>

        <div className="flex">
          <Link
            className="text-brand600 mb-5 ml-auto mt-2 inline-block text-sm font-semibold"
            href={"/reset-password"}
          >
            Lupa kata sandi?
          </Link>
        </div>

        <button className="btn-success" type="submit" disabled={isPending}>
          {isPending ? <ClipLoader size={20} color="#309C7A" /> : "Masuk"}
        </button>
      </form>
    </div>
  )
}

export default UserLoginForm
