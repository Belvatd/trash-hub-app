"use client"
import { auth } from "@/firebase/config"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  const handleLogout = async () =>
    await signOut(auth)
      .then(() => {
        router.push("/login")
      })
      .catch((error) => {
        console.log(error)
      })

  return (
    <div>
      Cleaner Restricted Page
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Page
