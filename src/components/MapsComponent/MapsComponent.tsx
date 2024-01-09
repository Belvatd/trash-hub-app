"use client"
import { useEffect, useState } from "react"
import GoogleMaps from "./GoogleMapsProvider"
import { TLatLng } from "./type"
import { checkLocationPermission } from "@/utils/checkLocationPermission"

const MapsComponent = () => {
  const [location, setLocation] = useState<TLatLng>()
  const getLocationNow = async () => {
    console.log("getLokasi saat ini")
    await checkLocationPermission({
      isOnlyRequestPermission: false,
      callbackFn: ({ type, latLng: locationLatLng }) => {
        if (type === "DENIED" || type === "INVALID") {
          console.log("Gagal Mendapatkan Lokasi Saat ini")
        }

        if (locationLatLng) {
          setLocation(locationLatLng)
        }
      },
    })
  }

  useEffect(() => {
    void getLocationNow()
  }, [])

  return (
    <div className="h-[300px] w-full">
      <GoogleMaps center={location} />
    </div>
  )
}

export default MapsComponent
