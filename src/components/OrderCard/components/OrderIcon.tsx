import { OrderType } from "@/constants/type"
import clsx from "clsx"
import Image from "next/image"

type TOrderIconProps = {
  orderType: OrderType
}

const URL_ICON = {
  [OrderType.PICKUP]: "/assets/icons/truck.svg",
  [OrderType.CLEANER]: "/assets/icons/clean.svg",
  [OrderType.ROUTINE_PICKUP]: "/assets/icons/truck-rutin.svg",
}

const BACKGROUND_COLOR = {
  [OrderType.PICKUP]: "bg-brand-25",
  [OrderType.CLEANER]: "bg-orange-25",
  [OrderType.ROUTINE_PICKUP]: "bg-blue-25",
}

const OrderIcon = ({ orderType }: TOrderIconProps) => {
  return (
    <div
      className={clsx(
        "bg-brand-50 h-10 w-10 rounded-lg p-[10px]",
        BACKGROUND_COLOR[orderType],
      )}
    >
      <Image
        src={URL_ICON[orderType]}
        alt="order-icon"
        width={20}
        height={20}
      />
    </div>
  )
}

export default OrderIcon
