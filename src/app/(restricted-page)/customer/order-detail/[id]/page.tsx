"use client"

import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import {
  CreateOrderType,
  useGetCustomerOrder,
  useGetTrash,
} from "@/hooks/services/CustomerOrders"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import SubHeaderStatus from "./components/SubHeaderStatus"
import { OrderStatus, OrderType } from "@/constants/type"
import { Info, MessageSquare, Phone } from "react-feather"
import SellerSection from "./components/SellerSection"
import { BounceLoader } from "react-spinners"
import TextField from "@/components/TextField/TextField"
import TrashSection from "./components/TrashSection"
import formatDate from "@/utils/formatDate"

const Page = () => {
  const { id } = useParams<{ id: string }>()

  const { data: orderData, isLoading } = useGetCustomerOrder({
    variables: {
      id,
    },
    enabled: !!id,
  })

  const { data: trashData } = useGetTrash({
    variables: {
      id: orderData?.trashId,
    },
    enabled: !!orderData?.trashId,
  })

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200">
        <ServiceHeader pageName="Detail Pick-Up" />
      </div>

      {isLoading && (
        <div className="py-9">
          <BounceLoader color="#309C7A" className="mx-auto mb-6" />
        </div>
      )}

      {!!orderData && !isLoading && (
        <div className="flex-grow">
          <SubHeaderStatus status={OrderStatus.DONE} />

          <div className="flex flex-col px-6">
            <div className="flex items-center justify-between py-4">
              <p className="text-sm font-medium">Pick-Up Sampah</p>
              <p className="text-xs text-gray-500">
                {formatDate(new Date(orderData.createdDate), {
                  withTime: true,
                })}
              </p>
            </div>
            <hr />

            <SellerSection />
            <hr />

            <div className="py-6">
              <p className="mb-4 font-semibold">Lokasi Pick-Up</p>
              <p className="text-sm text-gray-500">
                {orderData?.fullAddress as string}
              </p>
            </div>
            <hr />

            <div className="py-6">
              <p className="mb-4 font-semibold">Informasi Tambahan</p>
              <p className="text-sm text-gray-500">{orderData?.orderNotes}</p>
            </div>
            <hr />

            <div className="py-6">
              <p className="mb-4 font-semibold">Rician Sampah</p>

              <TrashSection trashData={trashData} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
