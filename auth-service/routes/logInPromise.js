const logger = require('../logger/logger')

const logInPromise = async (user, req) => {
  try {
    return req.login(user)
  } catch (error) {
    logger.error('Something went wrong', {traceId: req.headers.id})
  }
}

module.exports = logInPromise