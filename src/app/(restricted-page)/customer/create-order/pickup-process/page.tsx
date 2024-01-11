"use client"

import { BottomSheet } from "@/components/BottomSheet"
import { MapsComponent } from "@/components/MapsComponent"
import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import { auth } from "@/firebase/config"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
  const [userId, setUserId] = useState("")
  const [open, setOpen] = useState(true)
  const [loadingMarker, setLoadingMarker] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingMarker(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  const searchParams = useSearchParams()

  const _lat = searchParams.get("_lat")
  const _long = searchParams.get("_long")

  const pinpoint = {
    lat: Number(_lat),
    lng: Number(_long),
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid)
      }
    })
    return () => unsubscribe()
  }, [])

  // const { data: dataUserById, isFetching, status } = useGetUserById(userId)

  return (
    <div>
      <ServiceHeader
        pageName="Pilih Alamat"
        goToPage="/customer/create-order"
      />
        <div>
          <MapsComponent
            customPinpoint={pinpoint}
            mapProps={{
              draggable: false,
              isLoadingMarker: loadingMarker,
            }}
            containerProps={{
              className: "h-[90vh] w-full",
            }}
          />
          <BottomSheet className="h-fit p-4" open={open} setOpen={setOpen}>
            <div className="flex flex-col gap-4">
              <p className="text-[16px] font-semibold">
                Sedang Mencari Cleaner Terdekat...
              </p>
              <p className="pb-[4px] text-[14px] font-normal text-gray-500">
                Sampah akan dipick-up setelah Anda mendapatkan Cleaner
              </p>
            </div>
          </BottomSheet>
        </div>
    </div>
  )
}

export default Page
