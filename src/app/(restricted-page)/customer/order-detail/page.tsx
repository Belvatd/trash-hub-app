"use client"

import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"
import {
  CreateOrderType,
  useGetCustomerOrder,
  useGetTrash,
} from "@/hooks/services/CustomerOrders"
import { useParams, useSearchParams } from "next/navigation"
import SubHeaderStatus from "./components/SubHeaderStatus"
import { OrderStatus } from "@/constants/type"
import SellerSection from "./components/SellerSection"
import { BounceLoader } from "react-spinners"
import TrashSection from "./components/TrashSection"
import formatDate from "@/utils/formatDate"
import { useGetUserById } from "@/hooks/services/Auth"

const Page = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("orderId") || ""

  const { data: orderData, isLoading } = useGetCustomerOrder({
    variables: {
      id,
    },
    enabled: !!id,
  })

  const { data: cleanerData } = useGetUserById(orderData?.cleanerId|| "")

  const { data: trashData } = useGetTrash({
    variables: {
      id: orderData?.trashId || "",
    },
    enabled: !!orderData?.trashId,
  })

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200">
        <ServiceHeader pageName="Detail Pick-Up" goToPage="/customer" />
      </div>

      {isLoading && (
        <div className="py-9">
          <BounceLoader color="#309C7A" className="mx-auto mb-6" />
        </div>
      )}

      {!!orderData && !isLoading && (
        <div className="flex-grow">
          <SubHeaderStatus status={OrderStatus.DONE} xp={trashData?.totalXp} />

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

            <SellerSection cleanerName={cleanerData?.fullName}/>
            <hr />

            <div className="py-6">
              <p className="mb-4 font-semibold">Lokasi Pick-Up</p>
              <p className="text-sm text-gray-500">{orderData?.fullAddress}</p>
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
