"use client"
import { UserLoginForm } from "@/components/form/UserLoginForm"
import Link from "next/link"
import React from "react"

function Page() {
  return (
    <div className="mt-auto grid w-full gap-5 rounded-2xl bg-white p-4 pb-5">
      <div>
        <p className="text-gray900 text-xl font-semibold">Selamat Datang</p>
        <p className="text-gray500 mt-2 text-sm">
          Masuk untuk lingkungan Anda lebih bersih!
        </p>
      </div>

      <UserLoginForm />

      <div className="flex items-center gap-2">
        <div className="grow border-b border-gray-200"></div>
        <span className="text-gray400 shrink text-xs">Atau</span>
        <div className="grow border-b border-gray-200"></div>
      </div>

      <button
        className=" h-11 w-full rounded-xl border px-[18px] disabled:text-gray-400"
        disabled
      >
        Masuk dengan Google
      </button>

      <div className="text-gray500 flex items-center justify-center gap-1 text-sm font-medium">
        Belum punya akun?{" "}
        <Link href={"/registration/cleaner"} className="text-brand600">
          Daftar
        </Link>
      </div>
    </div>
  )
}

export default Page
