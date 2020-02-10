import { Router } from 'express'
import { logged } from '../passport/logged'

import * as review from '../controllers/review'

export const router = Router()

router.get('/review/:flatId', review.reviewGetFlat)

router.post('/review', logged, review.reviewPost)

router.put('/review/:id', logged, review.reviewPutId)

router.delete('/review/:id', logged, review.reviewDeleteId)
