"use client"

import { FormInputText } from "@/components/FormInputText"
import { TypeAccount } from "@/constants/type"
import {
  CreateUserSchema,
  CreateUserType,
  useCreateUser,
} from "@/hooks/services/Auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "react-feather"
import { FieldErrors, useForm } from "react-hook-form"
import { PulseLoader } from "react-spinners"

type TRegistrationFormProps = {
  type: TypeAccount
}

const UserRegistrationForm = ({ type }: TRegistrationFormProps) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { handleSubmit, control } = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      password: "",
      type: type,
      fullName: "",
      email: "",
    },
    mode: "onChange",
  })

  const { mutate, isPending } = useCreateUser({
    onSuccess(data) {
      if (!data.user.emailVerified) {
        router.push("/email-action?action=verifyEmail")
      }
      console.log(data)
    },
    onError(err: any) {
      console.log("error:", err)
    },
  })

  const onError = (error: FieldErrors<CreateUserType>) => {
    console.log(error)
    return error
  }

  const onSubmit = async (data: CreateUserType) => {
    try {
      const payload = {
        email: data?.email,
        password: data?.password,
        type: type,
        fullName: data?.fullName,
      }
      mutate(payload)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div
      className="h-[100vh] pt-[83%] lg:pt-[65%]"
      style={{ backgroundImage: "url(https://i.ibb.co/3c0P6T7/Bg.png)" }}
    >
      <Box className="z-100 m-2 h-[500px] rounded-[16px] bg-white p-4">
        <Stack
          justifyContent="space-between"
          alignItems="left"
          spacing={"20px"}
        >
          <div>
            <p className="mb-2 text-xl font-semibold">
              Daftar{" "}
              {`${type.charAt(0).toUpperCase()}${type.toLowerCase().slice(1)}`}
            </p>
            <p className="text-sm font-normal text-gray-500">
              Silakan isi data dibawah.
            </p>
          </div>
          <form
            className="flex w-[100%] flex-col gap-5"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <FormInputText name={"fullName"} control={control} label={"Nama"} />
            <FormInputText name={"email"} control={control} label={"Email"} />
            <FormInputText
              type={showPassword ? "text" : "password"}
              name={"password"}
              control={control}
              label={"Kata Sandi"}
              addonRight={() => (
                <button
                  className="text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            />
            <button
              className="rounded-[12px] bg-[#309C7A] px-[18px] py-[10px] font-semibold text-white"
              type="submit"
            >
              {isPending ? <PulseLoader color="white" size={10} /> : "Daftar"}
            </button>
            <p className="text-center text-sm font-medium text-gray-500">
              Sudah punya akun?
              <a
                className="text-sm font-semibold text-[#309C7A] decoration-0"
                href="/login"
              >
                {" "}
                Masuk
              </a>
            </p>
          </form>
        </Stack>
      </Box>
    </div>
  )
}

export default UserRegistrationForm
