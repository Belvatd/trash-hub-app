import { BounceLoader } from "react-spinners"

const MarkerIcon = ({ isLoading }: { isLoading?: boolean }) => (
  <div>
    {!isLoading && (
      <div className="pinPoint bg-brand-600 h-6 w-6 rounded-full border-[3px] border-white shadow-sm"></div>
    )}
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <BounceLoader className="z-5" color="#309C7A" size={150} />
      </div>
    )}
  </div>
)

export default MarkerIcon
