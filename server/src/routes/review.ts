import { logged } from '../passport/logged'

import * as review from '../controllers/review'
import { Router } from 'express'

export const router = Router({
  mergeParams: true,
})

router.post('/user', logged, review.reviewGetByUser)

router.post('/flat-name', review.reviewGetByFlatName)

router.post('/distance', review.reviewGetByDistance)

router.post('/', logged, review.reviewPost)

router.put('/:id', logged, review.reviewPutId)

router.delete('/:id', logged, review.reviewDeleteId)
