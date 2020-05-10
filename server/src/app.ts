import { join } from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { createConnection } from 'typeorm'
import ExpressSession from 'express-session'
import { TypeormStore } from 'connect-typeorm'
import passport from 'passport'
import compression from 'compression'
import helmet from 'helmet'

import ROUTES from './routes'
import { Session } from './entities/Session'
import './passport/passport'

// create typeorm connection
createConnection().then(async connection => {
  // create and setup express app
  const app = express()
  // gzip
  app.use(compression())
  // body parser
  app.use(bodyParser.json())
  // proper headers
  app.use(helmet())
  // no cache
  app.use(helmet.noCache())
  // session for Passport.js with TypeORM
  const session = await connection.getRepository(Session)
  app.use(
    ExpressSession({
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        cleanupLimit: 1,
        ttl: 86400,
      }).connect(session),
      secret: process.env.SESSION_SECRET,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  // register routes
  ROUTES.forEach(r => app.use(`/api${r.path}`, r.router))
  // serve react build
  app.use(express.static(join(__dirname, '/../../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '/../../client/build/index.html'))
  })

  // start express server
  app.listen(3001)
})
