import { config } from 'dotenv'
import { createConnection, getRepository, getConnection } from 'typeorm'
import { User } from '../entities/User'
import { Flat } from '../entities/Flat'
import { Review, Rating } from '../entities/Review'

config()

createConnection().then(async connection => {
  // remove data
  await getConnection().synchronize(true)

  const repositoryUser = await getRepository(User)
  const user1 = await repositoryUser.save({
    email: '1@mail.com',
    providerId: '1',
  })
  const user2 = await repositoryUser.save({
    email: '2@mail.com',
    providerId: '2',
  })
  const user3 = await repositoryUser.save({
    email: '3@mail.com',
    providerId: '99',
  })
  const user4 = await repositoryUser.save({
    email: '4@mail.com',
    providerId: '100',
  })

  const repositoryFlat = getRepository(Flat)
  const flat1 = await repositoryFlat.save({
    name: 'Na Poříčí 42, 110 00 Praha 1-Florenc, Česko',
    geom: {
      type: 'Point',
      coordinates: [14.4360319, 50.0901679],
    },
  })
  const flat2 = await repositoryFlat.save({
    name: 'Cejl 25, 602 00 Brno-střed, Česko',
    geom: {
      type: 'Point',
      coordinates: [16.6178496, 49.19763570000001],
    },
  })
  const flat3 = await repositoryFlat.save({
    name: 'Komunardů 20, 170 00 Praha 7-Holešovice, Česko',
    geom: {
      type: 'Point',
      coordinates: [14.4501752, 50.1027142],
    },
  })

  const flat4 = await repositoryFlat.save({
    name: 'Ostravská 2, 733 01 Karviná, Česko',
    geom: {
      type: 'Point',
      coordinates: [18.5373543, 49.8558953],
    },
  })

  const repositoryReview = getRepository(Review)
  const review1 = await repositoryReview.save({
    rating: Rating.BAD,
    description:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    flat: flat1,
    user: user1,
  })
  const review2 = await repositoryReview.save({
    rating: Rating.BEST,
    description:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    flat: flat1,
    user: user2,
  })
  const review3 = await repositoryReview.save({
    rating: Rating.GOOD,
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    flat: flat3,
    user: user3,
  })
  const review4 = await repositoryReview.save({
    rating: Rating.NORMAL,
    description: 'normal review',
    flat: flat1,
    user: user3,
  })
  const review5 = await repositoryReview.save({
    rating: Rating.NORMAL,
    description: '4th review',
    flat: flat1,
    user: user4,
  })
  const review6 = await repositoryReview.save({
    rating: Rating.NORMAL,
    description: 'extra review',
    flat: flat2,
    user: user3,
  })
  const review7 = await repositoryReview.save({
    rating: Rating.NORMAL,
    description:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    flat: flat4,
    user: user3,
  })

  console.log('Database seeded')
  process.exit()
})
