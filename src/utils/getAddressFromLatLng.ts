type TLatLng = { lat: number; lng: number }

type GoogleServiceProps = {
  location: TLatLng
}

export const getAddressFromLatLng = async ({
  location,
}: GoogleServiceProps) => {
  const geocoder = new google.maps.Geocoder()
  try {
    const res = await geocoder.geocode({ location, language: "id" })
    if (res && res?.results && res.results.length) {
      return res.results.find(
        (item) =>
          item.types.includes("administrative_area_level_4") ||
          item.types.includes("postal_code"),
      )
    }
  } catch (error) {
    return error
  }
}
