import { MessageSquare, Phone } from "react-feather"

const SellerSection = ({ cleanerName }: { cleanerName: string }) => {
  return (
    <div className="flex items-center gap-3 py-6">
      <div className="h-10 w-10 rounded-lg bg-slate-500"></div>
      <div className="flex-grow text-sm">
        <p className="font-medium">{cleanerName}</p>
        <p className="text-gray-500">Cleaner</p>
      </div>
      <button className="text-brand-500 h-9 w-9 rounded-lg bg-gray-50 p-2">
        <Phone size={20} />
      </button>
      <button className="text-brand-500 h-9 w-9 rounded-lg bg-gray-50 p-2">
        <MessageSquare size={20} />
      </button>
    </div>
  )
}

export default SellerSection
