"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const PickupMenu = () => {
  const router = useRouter()
  return (
    <>
      <div className="mx-auto flex w-16 flex-col items-center">
        <button
          type="button"
          onClick={() => router.push("/customer/create-order")}
        >
          <Image
            src={"/assets/icons/pickup-menu.svg"}
            alt="pickup-icon"
            width={44}
            height={44}
          />
        </button>

        <p className="mt-1 text-center text-xs font-medium">Pick-Up</p>
      </div>
    </>
  )
}

export default PickupMenu
