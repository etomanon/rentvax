import { use, serializeUser, deserializeUser } from 'passport'
import { Strategy } from 'passport-google-oauth2'
import { getRepository } from 'typeorm'
import { config } from 'dotenv'

import { User } from '../entities/User'
config()

use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === 'production'
          ? 'https://rentvax.com/api/auth/google/callback'
          : 'http://localhost:3001/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userRepository = await getRepository(User)
        let user = await userRepository.findOne({ providerId: profile.id })
        if (!user) {
          user = await userRepository.create({
            providerId: profile.id,
            email: profile.emails[0].value,
          })
          await userRepository.save(user)
        }
        return done(undefined, user)
      } catch (e) {
        console.log('ERROR', e)
        return done(undefined, undefined)
      }
    }
  )
)

serializeUser((user, done) => {
  done(null, user)
})

deserializeUser((user, done) => {
  done(null, user)
})
