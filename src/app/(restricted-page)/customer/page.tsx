"use client"

import { useAuth } from "@/app/(restricted-page)/AuthProvider"
import { auth } from "@/firebase/config"
import getGreetingTime from "@/utils/getGreetingTime"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Bell, MessageSquare, Pocket } from "react-feather"
import PickupMenu from "./components/PickupMenu"
import RoutinePickupMenu from "./components/RoutinePickupMenu"
import CleanerMenu from "./components/CleanerMenu"
import CleanTogetherMenu from "./components/CleanTogetherMenu"
import OrderCard from "@/components/OrderCard/OrderCard"
import OnGoingSection from "./components/OnGoingSection"

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
    <div className="flex flex-col">
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

      <div className="flex-grow px-6">
        <div className="-mt-10 flex items-center justify-between rounded-xl bg-white p-4 shadow-lg">
          <div className="flex gap-2">
            <div className="w-9 rounded-lg bg-brand-50 p-2 text-brand-500">
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

        <div className="mb-4 mt-8 grid grid-cols-4">
          <PickupMenu />
          <RoutinePickupMenu />
          <CleanerMenu />
          <CleanTogetherMenu />
        </div>

        <OnGoingSection />

        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Page
