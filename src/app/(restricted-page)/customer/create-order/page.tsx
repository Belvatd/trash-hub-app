"use client"

import { MapsComponent } from "@/components/MapsComponent"
import ServiceHeader from "@/components/ServiceHeader/ServiceHeader"

const Page = () => {
  return (
    <div>
      <ServiceHeader pageName="Pick-Up" goToPage="/customer" />
      <div className="m-auto flex flex-col gap-3 p-6">
        <p className="text-[16px] font-semibold">Pick-Up dimana?</p>
        <MapsComponent
          mapProps={{
            mapContainerClassName: "rounded-lg",
          }}
          containerProps={{
            className: "h-[100px] w-full",
          }}
        />
      </div>
    </div>
  )
}

export default Page
