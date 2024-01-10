import { UserLoginForm } from "@/components/form/UserLoginForm"
import Link from "next/link"
import React from "react"

function Page() {
  return (
    <div className="mt-auto grid w-full gap-5 rounded-2xl bg-white p-4 pb-5">
      <div>
        <p className="text-xl font-semibold text-gray-900">Selamat Datang</p>
        <p className="mt-2 text-sm text-gray-500">
          Masuk untuk lingkungan Anda lebih bersih!
        </p>
      </div>

      <UserLoginForm />

      <div className="flex items-center gap-2">
        <div className="grow border-b border-gray-200"></div>
        <span className="shrink text-xs text-gray-400">Atau</span>
        <div className="grow border-b border-gray-200"></div>
      </div>

      <button
        className=" h-11 w-full rounded-xl border px-[18px] disabled:text-gray-400"
        disabled
      >
        Masuk dengan Google
      </button>

      <div className="flex items-center justify-center gap-1 text-sm font-medium text-gray-500">
        Belum punya akun?{" "}
        <Link href={"/registration/cleaner"} className="text-brand-600">
          Daftar
        </Link>
      </div>
    </div>
  )
}

export default Page
