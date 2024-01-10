import { OrderType } from "@/constants/type"
import OrderIcon from "./components/OrderIcon"
import formatDate from "@/utils/formatDate"
import { ArrowRight } from "react-feather"

const OrderCard = () => {
  const isOngoing = true
  return (
    <div className="flex gap-[9px] rounded-xl border border-gray-100 p-4">
      <OrderIcon orderType={OrderType.PICKUP} />
      <div className="flex-grow">
        <div className="flex w-full items-center">
          <p className="text-sm font-medium">Cleaner menuju lokasi</p>

          {!isOngoing && (
            <p className="ml-auto text-[10px] text-gray-500">
              {formatDate(new Date())}
            </p>
          )}
        </div>

        <div className="text-xxs mt-1 flex items-center gap-2 text-gray-500">
          <p>Rumah</p>
          {isOngoing ? (
            <>
              <hr className=" inline-block h-2 w-[1px] bg-gray-100" />
              <p>Soemanto Anjay</p>
            </>
          ) : (
            <p className="ml-auto">+20xp</p>
          )}
        </div>
      </div>

      {isOngoing && (
        <button className="text-gray-500">
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  )
}

export default OrderCard
