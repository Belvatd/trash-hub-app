import { applyActionCode } from "firebase/auth"
import { auth } from "@/firebase/config"
import Link from "next/link"

type TEmailVerifyProps = {
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

const EmailVerify = async ({ code }: TEmailVerifyProps) => {
  const isVerified = await onVerifyCode(code || "")

  if (isVerified) {
    return (
      <div>
        Email Berhasil Terverifikasi
        <Link href={"/"}>Kembali</Link>
      </div>
    )
  }
}

export default EmailVerify
