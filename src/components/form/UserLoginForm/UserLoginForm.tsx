"use client"

import { TypeAccount } from "@/constants/type"
import { LoginUserSchema, LoginUserType, useLoginUser } from "@/hooks/services/Auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { setCookie } from "cookies-next"
import { sendEmailVerification } from "firebase/auth"
import { useRouter } from "next/navigation"
import { FieldErrors, useForm } from "react-hook-form"

const pathTypeAccont = {
  [TypeAccount.CLEANER]: "/cleaner",
  [TypeAccount.CUSTOMER]: "/customer",
}

const UserLoginForm = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<LoginUserType>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {},
    mode: "onChange",
  })

  const { mutate } = useLoginUser({
    onSuccess: async (data) => {
      if (!data.user.emailVerified) {
        await sendEmailVerification(data.user)
        return router.push("/email-action?action=verifyEmail")
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
      <form className="flex flex-col gap-2 w-96" onSubmit={handleSubmit(onSubmit, onError)}>
        <input placeholder="email" type="email" {...register("email")} />
        <input placeholder="password" type="password" {...register("password")} />
        <button className="bg-slate-300" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default UserLoginForm
