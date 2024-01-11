import clsx from "clsx"
import { Edit } from "react-feather"

type TAddressCardProps = {
  addressName: string
  address: string
  onClick?: () => void
  isActive: boolean
}

const AddressCard = ({
  addressName,
  address,
  onClick,
  isActive,
}: TAddressCardProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex h-[92px] cursor-pointer justify-between gap-1 rounded-lg border p-4",
        isActive
          ? "border-[#B5E5D0] bg-[#F7FDFA]"
          : "border-[#F2F4F7] bg-white",
      )}
    >
      <div className="w-full">
        <p className="pb-[4px] font-medium text-gray-900">{addressName}</p>
        <p className="line-clamp-2 text-[12px] font-normal text-gray-500">
          {address}
        </p>
      </div>
      <button
        type="button"
        className="flex items-start"
        onClick={() => console.log("clicked")}
      >
        <Edit color="#309C7A" size={20} />
      </button>
    </div>
  )
}

export default AddressCard
