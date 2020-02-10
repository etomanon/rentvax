import { Router } from 'express'
import { logged } from '../passport/logged'

import * as flat from '../controllers/flat'

export const router = Router()

router.get('/flat/:name', flat.flatGetName)

router.post('/flat', logged, flat.flatPost)

// router.put("/user/:id", user.userPutId);

// router.delete("/user/:id", user.userDeleteId);
