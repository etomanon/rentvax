import { Flat } from './../entities/Flat'
import { flatGetOrCreate } from './flat'
import { userGetCurrent } from './user'
import { Review } from '../entities/Review'
import { getRepository, getConnection } from 'typeorm'
import { Request, Response } from 'express'

export const reviewGetByUser = async (req: Request, res: Response) => {
  const take = req.body.take ?? 5
  const skip = req.body.skip

  if (req.body.name) {
    const flat = await getRepository(Flat)
      .createQueryBuilder('flat')
      .where(`flat.name = (:flat)`, {
        flat: req.body.name,
      })
      .getOne()

    if (!flat) {
      return res.send({ result: [], count: 0 })
    }

    const reviewsFlat = await getRepository(Review)
      .createQueryBuilder('review')
      .innerJoinAndSelect('review.user', 'user')
      .innerJoinAndSelect('review.flat', 'flat')
      .where(`flat.id = (:flat) AND user.id = (:user)`, {
        flat: flat.id,
        user: req.user.id,
      })

    const reviewsCount = await reviewsFlat.getCount()
    const reviews = await reviewsFlat
      .orderBy('review.updatedAt', 'ASC')
      .skip(skip)
      .take(take)
      .getMany()

    return res.send({ result: reviews, count: reviewsCount })
  } else {
    const reviewsUser = await getRepository(Review)
      .createQueryBuilder('review')
      .innerJoinAndSelect('review.user', 'user')
      .innerJoinAndSelect('review.flat', 'flat')
      .where(`user.id = (:user)`, {
        user: req.user.id,
      })

    const reviewsCount = await reviewsUser.getCount()
    const reviews = await reviewsUser
      .orderBy('review.updatedAt', 'ASC')
      .skip(skip)
      .take(take)
      .getMany()

    return res.send({ result: reviews, count: reviewsCount })
  }
}

export const reviewGetByFlatName = async (req: Request, res: Response) => {
  const take = req.body.take ?? 5
  const skip = req.body.skip

  const flat = await getRepository(Flat)
    .createQueryBuilder('flat')
    .where(`flat.name = (:flat)`, {
      flat: req.body.name,
    })
    .getOne()

  if (!flat) {
    return res.send({ result: [], count: 0 })
  }

  const reviewsFlat = await getRepository(Review)
    .createQueryBuilder('review')
    .innerJoinAndSelect('review.user', 'user')
    .innerJoinAndSelect('review.flat', 'flat')
    .where(`flat.id = (:flat)`, {
      flat: flat.id,
    })

  const reviewsCount = await reviewsFlat.getCount()
  const reviews = await reviewsFlat
    .orderBy('review.updatedAt', 'ASC')
    .skip(skip)
    .take(take)
    .getMany()

  return res.send({ result: reviews, count: reviewsCount })
}

export const reviewGetByDistance = async (req: Request, res: Response) => {
  const take = req.body.take
  const skip = req.body.skip

  const flatsNearest = await getRepository(Flat)
    .createQueryBuilder('flat')
    .orderBy({
      'ST_Distance(flat.geom, ST_GeomFromGeoJSON(:origin))': {
        order: 'ASC',
        nulls: 'NULLS FIRST',
      },
    })
    .setParameters({ origin: JSON.stringify(req.body.geom) })

  const flatsCount = await flatsNearest.getCount()

  const flats = await flatsNearest
    .skip(skip)
    .take(take)
    .getMany()

  let reviews: Review[] = []
  for (const flat of flats) {
    const reviewsFlat = await getRepository(Review)
      .createQueryBuilder('review')
      .innerJoinAndSelect('review.user', 'user')
      .innerJoinAndSelect('review.flat', 'flat')
      .where(`flat.id = (:flat)`, {
        flat: flat.id,
      })
      .orderBy('review.updatedAt', 'ASC')
      .take(3)
      .getMany()

    reviews = [...reviews, ...reviewsFlat]
  }

  return res.send({ result: reviews, count: flatsCount })
}

export const reviewPost = async (req: Request, res: Response) => {
  const user = await userGetCurrent(req)
  const { address, geom, rating, description } = req.body
  const flat = await flatGetOrCreate(address, geom)
  const RepositoryReview = await getRepository(Review)
  const reviews = await RepositoryReview.find({ user, flat })
  if (reviews.length > 0) {
    res.statusMessage =
      'Cannot create multiple reviews for same flat from same user'
    return res.status(500).end()
  }
  const review = RepositoryReview.create({
    rating,
    description,
    flat,
    user,
  })
  const result = await RepositoryReview.save(review)
  await getConnection()
    .createQueryBuilder()
    .relation(Flat, 'reviews')
    .of(flat)
    .add(review)
  return res.send(result)
}

export const reviewPutId = async (req: Request, res: Response) => {
  const review = await getRepository(Review).findOne(req.params.id, {
    relations: ['user'],
  })
  if (review.user.id === req.user.id) {
    await getRepository(Review).merge(review, req.body)
    const results = await getRepository(Review).save(review)
    await getRepository(Review).merge(review, req.body)
    return res.send(results)
  } else {
    return res.status(500).send({
      code: 500,
      message: 'You can modify only your reviews',
    })
  }
}

export const reviewDeleteId = async (req: Request, res: Response) => {
  const { id } = req.params
  const review = await getRepository(Review).findOne(id, {
    relations: ['user'],
  })
  if (review.user.id === req.user.id) {
    const results = await getRepository(Review).remove(review)
    return res.send(results)
  } else {
    return res.status(500).send({
      code: 500,
      message: 'You can delete only your reviews',
    })
  }
}
