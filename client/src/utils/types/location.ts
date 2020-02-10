interface LatLng {
  lat: number
  lng: number
}

export interface Location {
  formatted_address: string
  place_id: string
  latLng: LatLng
  // allow create only for street_address
  types: string[]
}
