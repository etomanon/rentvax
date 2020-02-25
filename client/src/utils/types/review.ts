import { User } from './user'
import { Flat } from './flat'

export interface Review {
  id: number
  rating: number
  description: string
  user: User
  flat: Flat
  createdAt: string
  updatedAt: string
}
