"use client"

import { auth } from "@/firebase/config"
import { parseActionCodeURL, checkActionCode } from "firebase/auth"
import VerifyEmail from "./components/VerifyEmail"
import ResetPassword from "./components/ResetPassword"
import { useSearchParams } from "next/navigation"
import { createQuery } from "react-query-kit"

const useCheckActionCode = createQuery<
  { operation: string; email?: string | null },
  { code: string }
>({
  queryKey: ["action-code"],
  fetcher: async ({ code }) => {
    const res = await checkActionCode(auth, code)
    return { operation: res.operation as string, email: res.data.email }
  },
  refetchOnMount: false,
})

const Page = () => {
  const searchParams = useSearchParams()
  const oobCode = searchParams.get("oobCode") || ""

  const { data } = useCheckActionCode({
    variables: {
      code: oobCode || "",
    },
    retry: false,
    enabled: !!oobCode,
  })

  if (!data) {
    return <div>URL Telah Expired</div>
  }

  return (
    <div>
      {data.operation === "VERIFY_EMAIL" && <VerifyEmail code={oobCode} />}
      {data.operation === "PASSWORD_RESET" && <ResetPassword code={oobCode} />}
    </div>
  )
}

export default Page
