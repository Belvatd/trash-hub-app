import { TTrash } from "@/constants/type"
import React from "react"
import { Info } from "react-feather"

type TTrashSectionProps = {
  trashData?: TTrash
}

const TrashSection = ({ trashData }: TTrashSectionProps) => {
  if (!trashData) {
    return (
      <div className="flex gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-gray-500">
        <Info size={18} />
        <p className="text-xs">
          Rincian akan tersedia setelah sampah Anda dikonfirmasi di TPA TrashHub
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="text-center">
          <p className="text-xs text-gray-500">Total Sampah</p>
          <p className="mt-1 text-sm font-medium">{trashData.totalTrash} Kg</p>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">Banyak Jenis</p>
          <p className="mt-1 text-sm font-medium">
            {trashData.detailTrash.length} Kg
          </p>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">Total Xp</p>
          <p className="mt-1 text-sm font-medium">+{trashData.totalXp}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {trashData.detailTrash.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <p className="text-gray-500">{item.name}</p>
            <p>{item.total}Kg</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrashSection
