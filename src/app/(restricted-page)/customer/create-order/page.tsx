"use client"

import { FormInputText } from "@/components/FormInputText"
import { FormInputTextArea } from "@/components/FormInputTextArea"
import { MapsComponent } from "@/components/MapsComponent"
import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import { auth } from "@/firebase/config"
import { useGetUserById } from "@/hooks/services/Auth"
import {
  CreateOrderSchema,
  CreateOrderType,
} from "@/hooks/services/CustomerOrders/model"
import { zodResolver } from "@hookform/resolvers/zod"
import { Divider } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowRight, Edit, Info } from "react-feather"
import { FieldErrors, useForm } from "react-hook-form"
import { BounceLoader } from "react-spinners"

const Page = () => {
  const [userId, setUserId] = useState("")
  const router = useRouter()
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

  const { handleSubmit, control, watch } = useForm<CreateOrderType>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      addressNotes: "",
      orderNotes: "",
      trashPicture: "",
      pinpoint: {
        _lat: 0,
        _long: 0,
      },
    },
    mode: "onChange",
  })

  const onError = (error: FieldErrors<CreateOrderType>) => {
    console.log(error, "aaa")
    return error
  }

  const onSubmit = async (data: CreateOrderType) => {
    try {
      const payload = {
        addressNotes: data?.addressNotes,
        orderNotes: data?.orderNotes,
        trashPicture: data?.trashPicture,
        pinpoint: {
          _lat: dataUserById?.address?.[dataUserById?.indexAddressSelected]
            ?.pinpoint?._lat,
          _long:
            dataUserById?.address?.[dataUserById?.indexAddressSelected]
              ?.pinpoint?._long,
        },
      }
      // mutate(payload)
      console.log(payload, "payload")
    } catch (e) {
      console.log(e)
    }
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
        <form
          className="m-auto h-full"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="m-6 flex flex-col gap-3">
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
                      dataUserById?.address?.[
                        dataUserById?.indexAddressSelected
                      ]?.addressName
                    }
                  </p>
                  <p className="text-[12px] font-normal text-gray500">
                    {
                      dataUserById?.address?.[
                        dataUserById?.indexAddressSelected
                      ]?.fullAddress
                    }
                  </p>
                </div>
              )}
              <button
                type="button"
                className="flex items-start"
                onClick={() => router.push("/customer/add-address")}
              >
                <Edit color="#309C7A" size={20} />
              </button>
            </div>
            <FormInputText
              addonLeft={() => {
                return <Info size={20} className="text-gray-500" />
              }}
              name={"addressNotes"}
              control={control}
              label={"Keterangan tambahan (opsional)"}
            />
          </div>
          <Divider className="mx-6" />
          <div className="m-6 flex flex-col gap-3">
            <p className="text-[16px] font-semibold">Informasi Tambahan</p>
            <FormInputTextArea
              name={"orderNotes"}
              control={control}
              label={"Berikan deskripsi tambahan (opsional)"}
              className="h-[120px] resize-none"
            />
          </div>
          <div className="relative top-[60px] flex justify-center px-6 py-3">
            <button
              className="w-full rounded-[12px] bg-[#309C7A] py-[10px] font-semibold text-white"
              type="submit"
            >
              <div className="flex justify-center gap-2 align-middle items-center">
                <p className="text-[16px]">Pesan Pick-Up</p>
                <ArrowRight size={20} />
              </div>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Page
