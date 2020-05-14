export interface Flat {
  id: number
  name: string
  location: Location
  createdAt: string
  updatedAt: string
}
interface Location {
  type: string
  coordinates: number[]
}
