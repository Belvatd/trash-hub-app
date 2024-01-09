export const optionsGoogleSearch = {
  region: "id",
  input: "",
  componentRestrictions: {
    country: "id",
  },
}

export const mapContainerStyle = {
  height: "100%",
  width: "100%",
  display: "relative",
}

export const optionsGoogleMap = {
  disableDefaultUI: true,
  zoomControl: false,
}

export const defaultZoom = 14

export const defaultLatLng = {
  lat: -6.2,
  lng: 106.816666,
}

export const messageError = {
  DENIED:
    "Akses Lokasi terblokir, silahkan mengaktifkan di setting browser anda",
  INVALID: "Error: Fitur Akses lokasi saat ini tidak tersedia di browser anda",
}
