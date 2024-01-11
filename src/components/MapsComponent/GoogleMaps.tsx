"use client"

import { GoogleMap } from "@react-google-maps/api"
import { useCallback, useEffect, useRef, useState, memo } from "react"

import MarkerIcon from "./components/MarkerIcon"

import { type TGoogleMaps, type TLatLng } from "./type"
import {
  defaultLatLng,
  defaultZoom,
  mapContainerStyle,
  optionsGoogleMap,
} from "./constants"

import { getAddressFromLatLng } from "@/utils/getAddressFromLatLng"
import { formatAddressGoogleMaps } from "@/utils/formatAddressGoogleMaps"

const GoogleMaps = ({
  center,
  onSubmit,
  loading: loadingProps,
  style,
  id,
  mapContainerClassName,
  withDetailAddress,
  draggable,
  isLoadingMarker
}: TGoogleMaps) => {
  const refMap = useRef<google.maps.Map>()
  const [latLng, setLatLng] = useState<TLatLng>(defaultLatLng)
  const [address, setAddress] = useState({
    name: "",
    secondary: "",
    placeId: "",
  })
  const [isValidLocation, setIsValidLocation] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // NOTES: HANDLE GEOCODING
  const getAddressFromGeocode = useCallback(async (location: TLatLng) => {
    try {
      const result = await getAddressFromLatLng({
        location,
      })

      const { placeId, addressName, addressSecondary, isCountryValid } =
        formatAddressGoogleMaps({
          addressComponent: (result as google.maps.GeocoderResult)
            .address_components,
          placeId: (result as google.maps.GeocoderResult).place_id,
        })

      setIsValidLocation(isCountryValid)
      setAddress({
        name: addressName,
        secondary: addressSecondary,
        placeId,
      })
      setLatLng(location)
    } catch {
      setIsValidLocation(false)
    } finally {
      setTimeout(() => setIsLoading(false), 400)
    }
  }, [])

  // NOTES: FOR SET LAT LNG FROM PROPS, THIS SHOULD EXECUTE ONCE (FIRST TIME)

  const handleDragEnd = useCallback(() => {
    if (!refMap) return

    const refTemp = refMap?.current as google.maps.MapOptions

    const centered = {
      lat: (refTemp?.center as google.maps.LatLng)?.lat(),
      lng: (refTemp?.center as google.maps.LatLng)?.lng(),
    }
    void getAddressFromGeocode(centered)
  }, [getAddressFromGeocode])

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      refMap.current = mapInstance
    },
    [refMap],
  )

  const onUnmount = useCallback(() => {
    refMap.current = undefined
  }, [])

  useEffect(() => {
    if (center) {
      setLatLng(center)
    }
    setIsLoading(true)
    void getAddressFromGeocode(center || defaultLatLng)
  }, [center, getAddressFromGeocode])

  return (
    <>
      <GoogleMap
        mapContainerClassName={mapContainerClassName}
        mapContainerStyle={{ ...mapContainerStyle, ...style }}
        center={latLng || defaultLatLng}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDragStart={() => setIsLoading(true)}
        onDragEnd={handleDragEnd}
        options={{ draggable, ...optionsGoogleMap }}
        zoom={defaultZoom}
      >
        {/* {!isLoading && (
          <div className="tooltip-container">
            <div className="tooltip text-primary25">Alamatmu di sini</div>
          </div>
        )} */}
        <MarkerIcon isLoading={isLoadingMarker} />
      </GoogleMap>

      {withDetailAddress && (
        <div className="py-4">
          {isLoading ? (
            "loading ..."
          ) : !isValidLocation ? (
            "location not valid"
          ) : (
            <>
              <h5 className="text-tertiary500 pb-2 text-base font-bold">
                {address.name}
              </h5>
              <p className="text-tertiary300">{address.secondary}</p>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default memo(GoogleMaps)
