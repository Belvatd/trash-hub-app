"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "react-feather"

type TServiceHeader = {
  pageName: string
  goToPage: string
}

const ServiceHeader = (props: TServiceHeader) => {
  const { pageName, goToPage } = props
  const route = useRouter()
  return (
    <>
      <div className="flex items-center gap-2 px-6 py-4 text-gray-900">
        <button onClick={() => route.push(goToPage)}>
          <ArrowLeft />
        </button>
        <p className="textxl font-semibold">{pageName}</p>
      </div>
    </>
  )
}

export default ServiceHeader
