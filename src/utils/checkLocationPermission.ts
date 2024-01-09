export type TCallbackType = "SUCCESS" | "DENIED" | "REQUEST" | "INVALID"

type TCallbackFn = {
  type: TCallbackType
  latLng?: { lat: number; lng: number }
}

export const checkLocationPermission = async ({
  isOnlyRequestPermission = true,
  callbackFn,
}: {
  isOnlyRequestPermission?: boolean
  callbackFn: (props: TCallbackFn) => void
}) => {
  if (navigator.geolocation) {
    if (isOnlyRequestPermission) {
      navigator.geolocation.getCurrentPosition(() => undefined)
      return callbackFn({
        type: "REQUEST",
      })
    }

    const navigatorRequestPermission = () => {
      navigator.geolocation.getCurrentPosition(
        (latlng) => {
          callbackFn({
            type: "SUCCESS",
            latLng: {
              lat: latlng.coords.latitude,
              lng: latlng.coords.longitude,
            },
          })
        },
        // HANDLE WHEN CLICK BLOCK / CLOSE / X ON PROMPT ACCESS
        () => {
          callbackFn({
            type: "DENIED",
          })
        },
      )
    }

    try {
      const permissionResult = await navigator.permissions.query({
        name: "geolocation",
      })
      switch (permissionResult.state) {
        // ALREADY BLOCK / DENIED ACCESS LOCATION IN BROWSER
        case "denied":
          callbackFn({
            type: "DENIED",
          })
          break
        default:
          navigatorRequestPermission()
          break
      }
    } catch (error) {
      callbackFn({
        type: "INVALID",
      })
    }
  } else {
    callbackFn({
      type: "INVALID",
    })
  }
}
