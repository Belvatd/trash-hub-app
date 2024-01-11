"use client"

import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import { auth } from "@/firebase/config"
import { useEditUser, useGetUserById } from "@/hooks/services/Auth"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Edit, PlusCircle } from "react-feather"
import { BounceLoader } from "react-spinners"

type TAddressCardProps = {
  addressName: string
  address: string
  onClick?: () => void
  i: number
}

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
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const editUser = useEditUser({
    onSuccess(val) {
      console.log(val)
    },
    onError(err) {
      console.log(err)
    },
  })

  const onEditIndexActive = (i: number) => {
    editUser.mutate({
      id: userId,
      indexAddressSelected: i,
    })
  }

  useEffect(() => {
    if (dataUserById?.address?.length > 0) {
      setActiveCard(dataUserById?.indexAddressSelected)
    }
  }, [dataUserById?.address?.length, dataUserById?.indexAddressSelected])

  const AddressCard = ({
    addressName,
    address,
    onClick,
    i,
  }: TAddressCardProps) => {
    return (
      <div onClick={onClick} className="cursor-pointer">
        <div
          className={clsx(
            "m-6 flex justify-between gap-1 rounded-lg border p-4",
            activeCard === i
              ? "border-[#B5E5D0] bg-[#F7FDFA]"
              : "border-[#F2F4F7] bg-white",
          )}
        >
          {dataUserById?.address?.length > 0 && (
            <div className="w-full">
              <p className="text-gray900 pb-[4px] font-medium">{addressName}</p>
              <p className="text-gray500 text-[12px] font-normal">{address}</p>
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
    )
  }

  return (
    <div className="h-full pb-3">
      <ServiceHeader
        pageName="Pilih Alamat"
        goToPage="/customer/create-order"
      />

      <div className="p-6">
        <BounceLoader
          color="#309C7A"
          className="mx-auto mb-6"
          loading={isFetching}
        />

        {!isFetching &&
          status === "success" &&
          dataUserById?.address?.map((address: any, i: number) => (
            <AddressCard
              key={`address-${i}`}
              i={i}
              onClick={() => {
                setActiveCard(i)
                onEditIndexActive(i)
              }}
              addressName={address.addressName || "-"}
              address={address.fullAddress || "-"}
            />
          ))}

        <button
          className="button flex w-full bg-brand-50 text-brand-600"
          onClick={() => router.push("/customer/address/add")}
        >
          <PlusCircle size={20} />
          Tambah Alamat
        </button>
      </div>
    </div>
  )
}

export default Page
