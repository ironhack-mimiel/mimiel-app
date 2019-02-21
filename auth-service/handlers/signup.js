const bcrypt = require('bcryptjs')

const logger = require('../logger/logger')
const User = require('../models/User')

module.exports = async function ({ email, password, isApicultor }, {traceId}) {
  if (!email || !password) {
    const error = 'Missing email or password'
    logger.error(error, {traceId})
    throw new Error(error)
  }

  try {
    logger.info(`Checking if ${email} exists in database`)
    const user = await User.findOne({ email })
    if (user) throw new Error(`Email ${email} already exists`)

    const salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(password, salt)

    const newUser = new User({
      email,
      password: hashPass,
      isApicultor
    })

    logger.info(`Creating user with data ${JSON.stringify(newUser)}`, {traceId})
    const loggedUser = await newUser.save()
    return loggedUser
  } catch (error) {
    logger.error(error, {traceId})
    throw new Error(error.message)
  }
}