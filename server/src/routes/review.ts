import { Router } from 'express'
import { logged } from '../passport/logged'

import * as review from '../controllers/review'

export const router = Router()

router.post('/review/user', logged, review.reviewGetByUser)

router.post('/review/flat-name', review.reviewGetByFlatName)

router.post('/review/distance', review.reviewGetByDistance)

router.post('/review', logged, review.reviewPost)

router.put('/review/:id', logged, review.reviewPutId)

router.delete('/review/:id', logged, review.reviewDeleteId)
