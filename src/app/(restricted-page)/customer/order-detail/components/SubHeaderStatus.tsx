import { OrderStatus } from "@/constants/type"
import clsx from "clsx"
import { ArrowRight } from "react-feather"

type TSubHeaderStatusProps = {
  status: OrderStatus
  xp?: number
}

const TEXT_STATUS = {
  [OrderStatus.ONGOING]: "Cleaner Sedang Menuju Lokasi Anda",
  [OrderStatus.ONTAKING]: "Cleaner Mengankut Sampah Anda",
  [OrderStatus.ONGOING_SEND]:
    "Sampah Anda telah diangkut dan segera menuju TPA TrashHub",
  [OrderStatus.DONE]: "Pick-Up Success!",
}

const COLOR = {
  [OrderStatus.ONGOING]: {
    text: "text-brand-600",
    background: "bg-brand-25",
  },
  [OrderStatus.ONTAKING]: {
    text: "text-brand-600",
    background: "bg-brand-25",
  },
  [OrderStatus.ONGOING_SEND]: {
    text: "text-warning-600",
    background: "bg-warning-25",
  },
  [OrderStatus.DONE]: {
    text: "text-success-600",
    background: "bg-success-25",
  },
}

const SubHeaderStatus = ({ status, xp = 0 }: TSubHeaderStatusProps) => {
  const isButtonLacak = [OrderStatus.ONGOING, OrderStatus.ONTAKING].includes(
    status,
  )

  const isShowXp = status === OrderStatus.DONE

  const handleClickLacak = () => {
    console.log("lacal")
  }
  return (
    <div
      className={clsx(
        "flex items-center px-6 py-[10px] text-xs font-medium",
        COLOR[status].background,
        COLOR[status].text,
      )}
    >
      <p>{TEXT_STATUS[status]}</p>

      {isShowXp && <p className="ml-auto">+{xp}xp</p>}
      {isButtonLacak && (
        <button
          className="ml-auto flex items-center gap-2 text-sm font-semibold"
          onClick={handleClickLacak}
        >
          Lacak
          <ArrowRight size={20} />
        </button>
      )}
    </div>
  )
}

export default SubHeaderStatus
