"use client"

import { useAuth } from "@/app/ClientProvider"
import { auth } from "@/firebase/config"
import getGreetingTime from "@/utils/getGreetingTime"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Bell, MessageSquare, Pocket } from "react-feather"

const Page = () => {
  const { user } = useAuth()
  const router = useRouter()
  const handleLogout = async () =>
    await signOut(auth)
      .then(() => {
        router.push("/login")
        console.log("logout")
      })
      .catch((error) => {
        console.log(error)
      })

  return (
    <div className="h-full">
      <div className="bg-patern h-[159px] pt-10 ">
        <div className="flex gap-6 px-6 py-4">
          <div className="flex-grow">
            <p className="text-[10px]">{getGreetingTime()},</p>
            <p className="text-sm font-semibold">
              {user?.displayName ?? "Customer"}
            </p>
          </div>
          <button className="inline-block">
            <MessageSquare />
          </button>
          <button className="inline-block">
            <Bell />
          </button>
        </div>
      </div>

      <div className="h-full px-6">
        <div className="-mt-10 flex items-center justify-between rounded-xl bg-white p-4 shadow-lg">
          <div className="flex gap-2">
            <div className="bg-brand-50 text-brand-500 w-9 rounded-lg p-2">
              <Pocket size={20} />
            </div>

            <div>
              <p className="text-[10px] text-gray-500">Pohon Lestari</p>
              <p className="text-sm font-medium">Tunas</p>
            </div>
          </div>

          <div className="flex">
            <p className="text-xl font-semibold">
              200
              <span className="ml-1 text-[10px] font-normal text-gray-500">
                Xp
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-4">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
        </div>

        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Page
