"use client"
import { HTMLAttributes, useEffect, useState } from "react"
import GoogleMaps from "./GoogleMapsProvider"
import { TGoogleMaps, TLatLng } from "./type"
import { checkLocationPermission } from "@/utils/checkLocationPermission"

type TMapsComponent = {
  containerProps?: HTMLAttributes<HTMLDivElement>
  mapProps?: TGoogleMaps
  customPinpoint?: TLatLng
} & TGoogleMaps
const MapsComponent = (props: TMapsComponent) => {
  const { containerProps, mapProps, customPinpoint } = props
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
    <div {...containerProps}>
      <GoogleMaps center={customPinpoint || location} {...mapProps} />
    </div>
  )
}

export default MapsComponent
