"use client"

import { useAuth } from "@/app/(restricted-page)/AuthProvider"
import { NullishExtractor } from "@/constants/type"
import { CreateUserType, useGetUserById } from "@/hooks/services/Auth"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import AddressForm from "../components/AddressForm"
import { MoonLoader } from "react-spinners"

export type TAddressItem = NullishExtractor<CreateUserType["address"]>[number]

const Page = () => {
  const searchParams = useSearchParams()
  const idx = searchParams.get("id")
  const { user } = useAuth()

  const [address, setAddress] = useState<TAddressItem>()

  const { data: dataUserById, isFetching } = useGetUserById(user?.uid || "")

  useEffect(() => {
    if (!!dataUserById?.address?.length && idx) {
      const addressSelected = dataUserById?.address[idx] as TAddressItem

      setAddress(addressSelected)
    }
  }, [dataUserById, idx])

  if (isFetching) {
    return (
      <div className="w-full py-7">
        <MoonLoader className="mx-auto" />
      </div>
    )
  }

  return <AddressForm address={address} isEdit={true} indexEdit={idx} />
}

export default Page
