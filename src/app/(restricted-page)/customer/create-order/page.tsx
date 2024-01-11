"use client"

import { BottomSheet } from "@/components/BottomSheet"
import { FormInputText } from "@/components/FormInputText"
import { FormInputTextArea } from "@/components/FormInputTextArea"
import { MapsComponent } from "@/components/MapsComponent"
import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import { auth } from "@/firebase/config"
import { useGetUserById } from "@/hooks/services/Auth"
import { useCreateOrder } from "@/hooks/services/CustomerOrders"
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
  const [open, setOpen] = useState(false)
  const [orderId, setOrderId] = useState("")
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid)
      }
    })
    return () => unsubscribe()
  }, [])

  const { data: dataUserById, isFetching, status } = useGetUserById(userId)
  const { mutateAsync, isPending, status: statusOrder } = useCreateOrder()

  const pinpoint = {
    lat: dataUserById?.address?.[dataUserById?.indexAddressSelected]?.pinpoint
      ?._lat,
    lng: dataUserById?.address?.[dataUserById?.indexAddressSelected]?.pinpoint
      ?._long,
  }

  useEffect(() => {
    const searchParams = new URLSearchParams()
    searchParams.set("_lat", pinpoint?.lat?.toString())
    searchParams.set("_long", pinpoint?.lng?.toString())
    searchParams.set("orderId", orderId)
    if (!isPending && statusOrder === "success" && orderId) {
      router.push(
        `/customer/create-order/pickup-process?${searchParams.toString()}`,
      )
    }
  }, [isPending, statusOrder, orderId, pinpoint?.lat, pinpoint?.lng, router])

  const { handleSubmit, control } = useForm<CreateOrderType>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      customerId: "",
      addressNotes: "",
      orderNotes: "",
      trashPicture: "",
      pinpoint: {
        _lat: 0,
        _long: 0,
      },
      status: "",
    },
    mode: "onChange",
  })

  const onError = (error: FieldErrors<CreateOrderType>) => {
    console.log(error)
    return error
  }

  const onSubmit = async (data: CreateOrderType) => {
    try {
      const payload = {
        customerId: userId,
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
        status: "WAITING",
      }
      const result = await mutateAsync(payload)
      console.log(result)
      if (result) {
        setOrderId(result?.id)
      }
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
              type="button"
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center justify-center gap-2 align-middle">
                <p className="text-[16px]">Pesan Pick-Up</p>
                <ArrowRight size={20} />
              </div>
            </button>
          </div>
          <BottomSheet
            className="h-fit p-4"
            open={open}
            setOpen={setOpen}
            closeOutside
          >
            <div className="flex flex-col gap-4">
              <p className="text-[16px] font-semibold">Cek Data Pick-Up Anda</p>
              <p className="pb-[4px] text-[14px] font-normal text-gray-500">
                Apakah data yang Anda input sudah sesuai?
              </p>
              <button
                className="w-full rounded-[12px] bg-[#309C7A] py-[10px] font-semibold text-white"
                type="submit"
              >
                <div className="flex items-center justify-center gap-2 align-middle">
                  <p className="text-[16px]">Pesan Pick-Up</p>
                  <ArrowRight size={20} />
                </div>
              </button>
            </div>
          </BottomSheet>
        </form>
      )}
    </div>
  )
}

export default Page
