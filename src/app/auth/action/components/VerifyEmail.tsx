import { applyActionCode } from "firebase/auth"
import { auth } from "@/firebase/config"
import Link from "next/link"

type TVerifyEmailProps = {
  code?: string
}

const onVerifyCode = async (code: string) => {
  try {
    await applyActionCode(auth, code)
    return true
  } catch (error) {
    return false
  }
}

const VerifyEmail = async ({ code }: TVerifyEmailProps) => {
  const isVerified = await onVerifyCode(code || "")

  if (isVerified) {
    return <div>Email Berhasil Terverifikasi.</div>
  }
}

export default VerifyEmail
