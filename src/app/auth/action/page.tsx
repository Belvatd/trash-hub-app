"use client"

import { auth } from "@/firebase/config"
import { parseActionCodeURL, checkActionCode } from "firebase/auth"
import VerifyEmail from "./components/VerifyEmail"
import ResetPassword from "./components/ResetPassword"
import { useSearchParams } from "next/navigation"
import { createQuery } from "react-query-kit"

const useCheckActionCode = createQuery<{ operation: string; email?: string | null }, { code: string }>({
  queryKey: ["action-code"],
  fetcher: async ({ code }) => {
    const res = await checkActionCode(auth, code)
    return { operation: res.operation as string, email: res.data.email }
  },
})

const Page = () => {
  const searchParams = useSearchParams()
  const oobCode = searchParams.get("oobCode") || ""

  const { data } = useCheckActionCode({
    variables: {
      code: oobCode || "",
    },
    enabled: !!oobCode,
  })

  if (data?.operation === "VERIFY_EMAIL") {
    return <VerifyEmail code={oobCode} />
  }

  if (data?.operation === "PASSWORD_RESET") {
    return <ResetPassword code={oobCode} />
  }

  return <div>URL Telah Expired</div>
}

export default Page
