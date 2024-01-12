import { MessageSquare, Phone } from "react-feather"

const SellerSection = () => {
  return (
    <div className="flex items-center gap-3 py-6">
      <div className="h-10 w-10 rounded-lg bg-slate-500"></div>
      <div className="flex-grow text-sm">
        <p className="font-medium">Budiono Samoedra</p>
        <p className="text-gray-500">TrashHub Sawojajar</p>
      </div>
      <button className="h-9 w-9 rounded-lg bg-gray-50 p-2 text-brand-500">
        <Phone size={20} />
      </button>
      <button className="h-9 w-9 rounded-lg bg-gray-50 p-2 text-brand-500">
        <MessageSquare size={20} />
      </button>
    </div>
  )
}

export default SellerSection
