"use client"

import { MapsComponent } from "@/components/MapsComponent"
import GoogleMaps from "@/components/MapsComponent/GoogleMapsProvider"
import { Button } from "@mui/material"
const Page = () => {
  return (
    <div>
      Pesan Penjemputan Sampah
      <MapsComponent />
    </div>
  )
}

export default Page
