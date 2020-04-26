import { getRepository } from 'typeorm'
import { Review, Rating } from '../entities/Review'
import { User } from '../entities/User'
import { USER } from './user'
import { Flat } from '../entities/Flat'
import { FLAT } from './flat'

export const reviewSeed: () => Promise<Partial<Review>[]> = async () => [
  {
    description: 'Lorem ipsum',
    user: await getRepository(User).findOne({
      email: USER[0].email,
    }),
    flat: await getRepository(Flat).findOne({
      name: FLAT[0].name,
    }),
    rating: Rating.BEST,
  },
  {
    description: 'Old',
    user: await getRepository(User).findOne({
      email: USER[0].email,
    }),
    flat: await getRepository(Flat).findOne({
      name: FLAT[1].name,
    }),
    rating: Rating.BEST,
  },
  {
    description:
      'Lorem ipsum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum ',
    user: await getRepository(User).findOne({
      email: USER[1].email,
    }),
    flat: await getRepository(Flat).findOne({
      name: FLAT[0].name,
    }),
    rating: Rating.WORST,
  },
  {
    description:
      'Lorem ipsum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum ',
    user: await getRepository(User).findOne({
      email: USER[1].email,
    }),
    flat: await getRepository(Flat).findOne({
      name: FLAT[1].name,
    }),
    rating: Rating.NORMAL,
  },
  {
    description:
      'Lorem ipsum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum ',
    user: await getRepository(User).findOne({
      email: USER[2].email,
    }),
    flat: await getRepository(Flat).findOne({
      name: FLAT[3].name,
    }),
    rating: Rating.BAD,
  },
  {
    description:
      'Lorem ipsum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum ',
    user: await getRepository(User).findOne({
      email: USER[3].email,
    }),
    flat: await getRepository(Flat).findOne({
      name: FLAT[2].name,
    }),
    rating: Rating.GOOD,
  },
  {
    description:
      'Lorem ipsum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum ',
    user: await getRepository(User).findOne({
      email: USER[3].email,
    }),
    flat: await getRepository(Flat).findOne({
      name: FLAT[0].name,
    }),
    rating: Rating.GOOD,
  },
]
