"use client"

import { BottomSheet } from "@/components/BottomSheet"
import { MapsComponent } from "@/components/MapsComponent"
import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import { useGetUserById } from "@/hooks/services/Auth"
import { useEditOrder } from "@/hooks/services/CustomerOrders"
import { Divider } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MessageSquare, Phone } from "react-feather"

const Page = () => {
  const [open, setOpen] = useState(true)
  const [loadingMarker, setLoadingMarker] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const _lat = searchParams.get("_lat")
  const _long = searchParams.get("_long")
  const orderId = searchParams.get("orderId")

  const [statusProgress, setStatusProgress] = useState<
    "WAITING" | "ONPROGRESS" | "DONE"
  >("WAITING")

  const listCopyTitle = {
    WAITING: "Sedang Mencari Cleaner Terdekat...",
    ONPROGRESS: "Cleaner Sedang Menuju Lokasi Anda",
    DONE: "Sampah Diangkut",
  }

  const listCopySubTitle = {
    WAITING: "Sampah akan dipick-up setelah Anda mendapatkan Cleaner",
    ONPROGRESS: "Estimasi waktu 15 menit",
    DONE: "Cleaner telah mengangkut sampah Anda",
  }

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

  useEffect(() => {
    if (statusProgress === "ONPROGRESS") {
      const timeout = setTimeout(() => {
        setStatusProgress("DONE")
        mutateEdit({
          id: orderId || "",
          updatedData: {
            status: "DONE",
          },
        })
      }, 8000)

      return () => clearTimeout(timeout)
    }
  }, [statusProgress, mutateEdit, orderId])

  useEffect(() => {
    if (statusProgress === "DONE") {
      const timeout = setTimeout(() => {
        router.push("/customer")
      }, 4000)

      return () => clearTimeout(timeout)
    }
  }, [statusProgress, router])

  const { data: dataUserById } = useGetUserById("w3XsqIgIS0f7XJzVP5Ybk7irZ842")

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
                {listCopyTitle[statusProgress]}
              </p>
              <p className="pb-[4px] text-[14px] font-normal text-gray-500">
                {listCopySubTitle[statusProgress]}
              </p>
            </div>
            {(statusProgress === "ONPROGRESS" || statusProgress === "DONE") && (
              <div>
                <Divider />
                <div className="justify-beetween flex items-center pt-4">
                  <div className="w-[15%]">
                    <img
                      src="/assets/images/cleaner-profile.png"
                      alt="cleaner"
                    />
                  </div>
                  <div className="flex w-[60%] flex-col gap-1">
                    <p className="text-[16px] font-semibold">
                      {dataUserById?.fullName}
                    </p>
                    <p className="pb-[4px] text-[14px] font-normal text-gray-500">
                      Cleaner
                    </p>
                  </div>
                  <div className="flex w-[25%] gap-2">
                    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-gray-50 p-2">
                      <Phone size={20} color="#309C7A" />
                    </div>
                    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-lg bg-gray-50 p-2">
                      <MessageSquare size={20} color="#309C7A" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </BottomSheet>
      </div>
    </div>
  )
}

export default Page
