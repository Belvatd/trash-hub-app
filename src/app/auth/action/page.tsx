import { auth } from "@/firebase/config"
import { parseActionCodeURL, checkActionCode } from "firebase/auth"
import VerifyEmail from "./components/VerifyEmail"
import ResetPassword from "./components/ResetPassword"

type TPage = {
  searchParams: {
    mode?: string
    oobCode?: string
  }
}

const getOperationAuth = async (code: string) => {
  try {
    const res = await checkActionCode(auth, code)

    return { operation: res.operation, email: res.data.email }
  } catch (error) {}
}

const Page = async ({ searchParams }: TPage) => {
  const data = await getOperationAuth(searchParams.oobCode || "")

  if (data?.operation === "VERIFY_EMAIL") {
    return <VerifyEmail code={searchParams.oobCode} />
  }

  if (data?.operation === "PASSWORD_RESET") {
    return <ResetPassword code={searchParams.oobCode} />
  }

  return <div>URL Telah Expired</div>
}

export default Page
