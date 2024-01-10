"use client"

import { auth } from "@/firebase/config"
import { parseActionCodeURL, checkActionCode } from "firebase/auth"
import VerifyEmail from "./components/VerifyEmail"
import ResetPassword from "./components/ResetPasswordSection"
import { useSearchParams } from "next/navigation"
import { createQuery } from "react-query-kit"
import { MoonLoader } from "react-spinners"
import Link from "next/link"

const useCheckActionCode = createQuery<
  { operation: string; email?: string | null },
  { code: string }
>({
  queryKey: ["action-code"],
  fetcher: async ({ code }) => {
    console.log("called")
    const res = await checkActionCode(auth, code)
    return { operation: res.operation as string, email: res.data.email }
  },
})

const Page = () => {
  const searchParams = useSearchParams()
  const oobCode = searchParams.get("oobCode") || ""

  const { data, isLoading } = useCheckActionCode({
    variables: {
      code: oobCode || "",
    },
    retry: 1,
    enabled: !!oobCode,
  })

  if (isLoading) {
    return <MoonLoader className="mx-auto my-auto" size={50} color="#309C7A" />
  }

  if (!data) {
    return (
      <div className="mx-auto my-auto text-gray-500">
        <p>URL Telah Expired</p>
        <Link href={"/"} className="mt-2">
          <button className="text-brand-600 inline-block h-9 w-full px-4 text-sm">
            Kembali
          </button>
        </Link>
      </div>
    )
  }

  return (
    <>
      {data.operation === "VERIFY_EMAIL" && <VerifyEmail code={oobCode} />}
      {data.operation === "PASSWORD_RESET" && <ResetPassword code={oobCode} />}
    </>
  )
}

export default Page
