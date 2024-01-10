"use client"

import { applyActionCode } from "firebase/auth"
import { auth } from "@/firebase/config"
import Link from "next/link"
import { useEffect } from "react"

type TVerifyEmailProps = {
  code?: string
}

const VerifyEmail = ({ code }: TVerifyEmailProps) => {
  const handleVerifyUser = async () => {
    try {
      await applyActionCode(auth, code || "")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleVerifyUser()
  }, [])

  return (
    <div className="mx-auto my-auto text-gray-500">
      <p>Email Berhasil Terverifikasi</p>
      <Link href={"/"} className="mt-2">
        <button className="text-brand-600 inline-block h-9 w-full px-4 text-sm">
          Kembali
        </button>
      </Link>
    </div>
  )
}

export default VerifyEmail
