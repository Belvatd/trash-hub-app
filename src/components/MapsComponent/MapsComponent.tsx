"use client"
import { HTMLAttributes, useEffect, useState } from "react"
import GoogleMaps from "./GoogleMapsProvider"
import { TGoogleMaps, TLatLng } from "./type"
import { checkLocationPermission } from "@/utils/checkLocationPermission"

type TMapsComponent = {
  containerProps?: HTMLAttributes<HTMLDivElement>
  mapProps?: TGoogleMaps
  customPinpoint?: TLatLng
  isGetLocationNow?: boolean
} & TGoogleMaps
const MapsComponent = (props: TMapsComponent) => {
  const {
    containerProps,
    mapProps,
    customPinpoint,
    isGetLocationNow = true,
  } = props
  const [location, setLocation] = useState<TLatLng>()
  const getLocationNow = async () => {
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

  const handleClickSelect = () => {
    void getLocationNow()
  }

  useEffect(() => {
    if (isGetLocationNow) {
      void getLocationNow()
    }
  }, [isGetLocationNow])

  return (
    <div {...containerProps}>
      <GoogleMaps
        center={customPinpoint || location}
        {...mapProps}
        onClickSelect={handleClickSelect}
      />
    </div>
  )
}

export default MapsComponent
