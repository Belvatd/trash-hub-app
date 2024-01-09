export type TLatLng = { lat: number; lng: number }

export type TParamsOnSubmit = TLatLng & {
  addressName: string
  addressSecondary: string
  placeId: string
}

export type TGoogleMaps = {
  center?: TLatLng
  onSubmit?: (data: TParamsOnSubmit) => void
  loading?: boolean
  style?: React.CSSProperties
  id?: string
}
