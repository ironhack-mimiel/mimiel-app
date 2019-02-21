require('dotenv').config()

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

const authRouter = require('./routes/auth')

const app = express()

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
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/auth', authRouter)

module.exports = app
