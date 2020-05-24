import { config } from 'dotenv'
import { createConnection, getRepository, getConnection } from 'typeorm'
import { User } from '../entities/User'
import { Flat } from '../entities/Flat'
import { Review } from '../entities/Review'
import { USER } from './user'
import { FLAT } from './flat'
import { reviewSeed } from './review'

config()

const createData = async <T>(Entity: any, seed: T[]) => {
  const repo = await getRepository(Entity)
  for (const s of seed) {
    const created = await repo.create(s)
    await repo.save(created)
  }
}

createConnection().then(async () => {
  // remove data
  await getConnection().synchronize(true)

  await createData(User, USER)
  await createData(Flat, FLAT)

  const REVIEW = await reviewSeed()
  await createData(Review, REVIEW)

  console.log('Database seeded')
  process.exit()
})
