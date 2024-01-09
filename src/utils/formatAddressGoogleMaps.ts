export const formatAddressGoogleMaps = ({
  addressComponent,
  placeId,
}: {
  addressComponent: google.maps.places.PlaceResult["address_components"]
  placeId: string
}) => {
  const formatAddressType = [
    "administrative_area_level_3",
    "administrative_area_level_2",
    "administrative_area_level_1",
  ]

  const ruleValidCountry = {
    type: "country",
    name: "ID",
    isValid: true,
  }

  let addressName = ""
  const addressSecondary =
    addressComponent
      ?.filter((item) => {
        if (item.types[0] === ruleValidCountry.type) {
          ruleValidCountry.isValid = item.short_name === ruleValidCountry.name
        }

        if (
          item.types[0] === "administrative_area_level_4" ||
          (!addressName && item.types[0] === "administrative_area_level_3")
        ) {
          addressName = item.short_name
        }
        return formatAddressType.includes(item.types[0] as string)
      })
      ?.map((item) => item.short_name)
      ?.join(", ") || ""

  return {
    addressName,
    addressSecondary,
    placeId,
    isCountryValid: ruleValidCountry.isValid,
  }
}
