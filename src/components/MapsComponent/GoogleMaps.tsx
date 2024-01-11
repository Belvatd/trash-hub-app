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

  onClickSelect,
}: TGoogleMaps) => {
  const refMap = useRef<google.maps.Map>()
  const [latLng, setLatLng] = useState<TLatLng>(defaultLatLng)
  const [address, setAddress] = useState({
    name: "",
    secondary: "",
    placeId: "",
  })
  const [showButton, setShowButton] = useState(false)
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

      onSubmit &&
        onSubmit({
          addressName,
          addressSecondary,
          placeId,
          lat: location.lat,
          lng: location.lng,
        })
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
      void getAddressFromGeocode(center || defaultLatLng)
    }

    setIsLoading(true)
  }, [center, getAddressFromGeocode])

  return (
    <>
      {(showButton || !center) && (
        <button
          className="absolute bottom-0 left-0 right-0 top-0 z-[1002] m-auto h-[34px] w-[92px] rounded-xl 
    bg-white px-3 py-2 text-xs font-semibold text-gray-700"
          onClick={(event) => {
            event.preventDefault()
            return onClickSelect && onClickSelect()
          }}
        >
          Pilih di peta
        </button>
      )}

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
        <MarkerIcon />
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
