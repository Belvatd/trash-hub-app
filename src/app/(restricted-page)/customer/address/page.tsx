"use client"

import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import { auth } from "@/firebase/config"
import { useEditUser, useGetUserById } from "@/hooks/services/Auth"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Edit, PlusCircle } from "react-feather"
import { BounceLoader } from "react-spinners"
import AddressCard from "./components/AddressCard"

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
  const [activeAddress, setActiveAddress] = useState<number>()

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
      setActiveAddress(dataUserById?.indexAddressSelected)
    }
  }, [dataUserById?.address?.length, dataUserById?.indexAddressSelected])

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

        <div className="gap flex flex-col gap-3">
          {!isFetching &&
            status === "success" &&
            dataUserById?.address?.map((address: any, i: number) => (
              <AddressCard
                key={`address-${i}`}
                isActive={activeAddress === i}
                onClick={() => {
                  setActiveAddress(i)
                  onEditIndexActive(i)
                }}
                addressName={address.addressName || "-"}
                address={address.fullAddress || "-"}
              />
            ))}
        </div>

        <button
          className="button mt-3 flex w-full bg-brand-50 text-brand-600"
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
