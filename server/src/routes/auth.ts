import { authenticate } from 'passport'

import * as auth from '../controllers/auth'

import { Router } from 'express'

export const router = Router({
  mergeParams: true,
})

router.get(
  '/google',
  authenticate('google', {
    scope: ['email', 'profile'],
  })
)

router.get(
  '/google/callback',
  authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/review',
  })
)

router.get('/logout', auth.authGetLogout)
