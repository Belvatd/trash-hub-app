"use client"

import { BottomSheet } from "@/components/BottomSheet"
import { MapsComponent } from "@/components/MapsComponent"
import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import { auth } from "@/firebase/config"
import { useGetUserById } from "@/hooks/services/Auth"
import { useEditOrder } from "@/hooks/services/CustomerOrders"
import { Divider } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
  const [open, setOpen] = useState(true)
  const [loadingMarker, setLoadingMarker] = useState(true)
  const searchParams = useSearchParams()
  const _lat = searchParams.get("_lat")
  const _long = searchParams.get("_long")
  const orderId = searchParams.get("orderId")

  const [statusProgress, setStatusProgress] = useState<
    "WAITING" | "ONPROGRESS" | "DONE"
  >("WAITING")

  const { mutateAsync: mutateEdit } = useEditOrder({
    onSuccess(val) {
      console.log(val)
    },
    onError(err) {
      console.log(err)
    },
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingMarker(false)
      mutateEdit({
        id: orderId || "",
        updatedData: {
          status: "ONPROGRESS",
          cleanerId: "w3XsqIgIS0f7XJzVP5Ybk7irZ842",
        },
      })
      setStatusProgress("ONPROGRESS")
    }, 10000)
    return () => clearTimeout(timeout)
  }, [mutateEdit, orderId])

  const {
    data: dataUserById,
    isFetching,
    status,
  } = useGetUserById("w3XsqIgIS0f7XJzVP5Ybk7irZ842")

  const pinpoint = {
    lat: Number(_lat),
    lng: Number(_long),
  }

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
            <div>
              <p className="pb-2 text-[16px] font-semibold">
                Sedang Mencari Cleaner Terdekat...
              </p>
              <p className="pb-[4px] text-[14px] font-normal text-gray-500">
                Sampah akan dipick-up setelah Anda mendapatkan Cleaner
              </p>
            </div>
            <Divider />
            <div className="justify-beetween flex">
              <div className="flex flex-col gap-2">
                <p className="pb-2 text-[16px] font-semibold">Cleaner Anda</p>
                <p className="pb-[4px] text-[14px] font-normal text-gray-500">
                  {dataUserById?.fullName}
                </p>
              </div>
            </div>
          </div>
        </BottomSheet>
      </div>
    </div>
  )
}

export default Page
