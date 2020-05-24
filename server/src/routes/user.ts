import { logged } from '../passport/logged'

import * as user from '../controllers/user'
import { Router } from 'express'

export const router = Router({
  mergeParams: true,
})

router.get('/', logged, user.userGet)
