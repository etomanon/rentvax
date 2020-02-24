import { Flat } from './../entities/Flat'
import { flatGetOrCreate } from './flat'
import { userGetCurrent } from './user'
import { Review } from '../entities/Review'
import { getRepository, getConnection } from 'typeorm'
import { Request, Response } from 'express'

export const reviewGetFlat = async (req: Request, res: Response) => {
  const results = await getRepository(Review).findOne({
    relations: ['user', 'flat'],
    where: {
      // TODO: Maybe wrong?
      'flat.id': req.params.flatId,
    },
  })
  return res.send(results)
}

export const reviewPost = async (req: Request, res: Response) => {
  const user = await userGetCurrent(req)
  const { address, location, rating, description } = req.body
  const flat = await flatGetOrCreate(address, location)
  const RepositoryReview = await getRepository(Review)
  if (RepositoryReview.find({ user, flat })) {
    res.statusMessage =
      'Cannot create multiple reviews for same flat from same user'
    res.status(500).end()
  }
  const review = RepositoryReview.create({
    rating,
    description,
    flat,
    user,
  })
  const result = RepositoryReview.save(review)
  await getConnection()
    .createQueryBuilder()
    .relation(Flat, 'reviews')
    .of(flat)
    .add(review)
  return res.send(result)
}

export const reviewPutId = async (req: Request, res: Response) => {
  const review = await getRepository(Review).findOne(req.params.id)
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
  const review = await getRepository(Review).findOne(req.params.id)
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
