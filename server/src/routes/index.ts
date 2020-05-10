import { Router } from 'express'

import { router as routerUser } from './user'
import { router as routerAuth } from './auth'
import { router as routerFlat } from './flat'
import { router as routerReview } from './review'

interface Route {
  path: string
  router: Router
}

export default [
  {
    path: '/user',
    router: routerUser,
  },
  {
    path: '/auth',
    router: routerAuth,
  },
  {
    path: '/flat',
    router: routerFlat,
  },
  {
    path: '/review',
    router: routerReview,
  },
] as Route[]
