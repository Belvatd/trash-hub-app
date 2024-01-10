"use client"

import { MapsComponent } from "@/components/MapsComponent"
import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import { auth } from "@/firebase/config"
import { useGetUserById } from "@/hooks/services/Auth"
import { useEffect, useState } from "react"
import { Edit, PenTool } from "react-feather"
import { BounceLoader } from "react-spinners"

const Page = () => {
  const [userId, setUserId] = useState("")
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid)
      }
    })
    return () => unsubscribe()
  }, [])

  const { data: dataUserById, isFetching, status } = useGetUserById(userId)

  const pinpoint = {
    lat: dataUserById?.address?.[dataUserById?.indexAddressSelected]?.pinpoint
      ?._lat,
    lng: dataUserById?.address?.[dataUserById?.indexAddressSelected]?.pinpoint
      ?._long,
  }

  return (
    <div>
      <ServiceHeader pageName="Pick-Up" goToPage="/customer" />
      <BounceLoader
        color="#309C7A"
        className="fixed left-1/2 -translate-x-1/2 transform"
        loading={isFetching}
      />
      {!isFetching && status === "success" && (
        <div className="m-auto flex flex-col gap-3 p-6">
          <p className="text-[16px] font-semibold">Pick-Up dimana?</p>
          <MapsComponent
            customPinpoint={pinpoint}
            mapProps={{
              mapContainerClassName: "rounded-lg",
              draggable: false,
            }}
            containerProps={{
              className: "h-[100px] w-full",
            }}
          />
          <div className="flex justify-between gap-1">
            {dataUserById?.address?.length > 0 && (
              <div className="w-full">
                <p className="pb-[4px] font-medium text-gray900">
                  {
                    dataUserById?.address?.[dataUserById?.indexAddressSelected]
                      ?.addressName
                  }
                </p>
                <p className="text-[12px] font-normal text-gray500">
                  {
                    dataUserById?.address?.[dataUserById?.indexAddressSelected]
                      ?.fullAddress
                  }
                </p>
              </div>
            )}
            <button
              type="button"
              className="flex items-start"
              onClick={() => console.log("clicked")}
            >
              <Edit color="#309C7A" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
