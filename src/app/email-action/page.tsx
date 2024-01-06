"use client"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams = useSearchParams()
  const action = searchParams.get("action")
  return <div>Email {action} telah Terkirim. Silahkan cek email anda</div>
}

export default Page
