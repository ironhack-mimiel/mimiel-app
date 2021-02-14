require('dotenv').config()
const DBURL = process.env.DBURL
const INTIAL_TRACEID = '1'
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const loggerMW = require('morgan')
const traceMW = require('./middleware/tracer')

const logger = require('./logger/logger')
const authRouter = require('./routes/auth')

function start () {
  const app = express()
  
  _connectToDB()
  _setMiddleware(app)
  require('./passport')(app)
  
  _setRoutes(app)
  return app
}

function _setMiddleware (app) {
  app.use(cors())
  app.use(loggerMW('dev'))
  app.use(traceMW)
  app.use(express.json())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(
    session({
      secret: 'our-passport-local-strategy-app',
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // 1 day
      })
    })
  )
}

function _setRoutes (app) {
  app.use(express.static(path.join(__dirname, 'public')))
  
  app.use('/api/auth', authRouter)
}

async function _connectToDB () {
  mongoose.Promise = Promise
  try {
    mongoose.connect(DBURL, {useNewUrlParser: true})
    logger.info('Connected to Mongo!', {traceId: INTIAL_TRACEID})
  } catch (error) {
    logger.error(`Error connecting to mongo: ${JSON.stringify(error)}`, {traceId: INTIAL_TRACEID})
  }
}

module.exports = start()
