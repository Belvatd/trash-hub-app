import { LoadScriptNext, LoadScriptNextProps } from "@react-google-maps/api"

import GoogleMap from "./GoogleMaps"
import { TGoogleMaps } from "./type"

const libraries: LoadScriptNextProps["libraries"] = ["places", "geometry"]

const GoogleMapProvider = (props: TGoogleMaps) => {
  return (
    <LoadScriptNext
      googleMapsApiKey={"AIzaSyAhBcrx_GRr0IodqwWXAtPT7afiikDAoFE"}
      language="id"
      libraries={libraries}
    >
      <GoogleMap {...props} />
    </LoadScriptNext>
  )
}

export default GoogleMapProvider
