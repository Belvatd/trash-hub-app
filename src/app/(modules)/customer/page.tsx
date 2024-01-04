"use client"

import { auth } from "@/firebase/config"
import { signOut } from "firebase/auth"

const Page = () => {
  const handleLogout = async () => await signOut(auth)
  return (
    <div>
      Customer Restricted Page
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Page
