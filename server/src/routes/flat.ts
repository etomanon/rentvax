import { logged } from '../passport/logged'

import * as flat from '../controllers/flat'
import { Router } from 'express'

export const router = Router({
  mergeParams: true,
})

router.get('/:name', flat.flatGetName)

router.post('/', logged, flat.flatPost)
