"use client"

import { MapsComponent } from "@/components/MapsComponent"
import { Button } from "@mui/material"
const Page = () => {

  return (
    <div>
      Pesan Penjemputan Sampah
      <MapsComponent searchEnabled />
      <Button>test</Button>
    </div>
  )
}

export default Page
