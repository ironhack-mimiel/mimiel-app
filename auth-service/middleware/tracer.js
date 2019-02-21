const uuid = require('uuid')

module.exports = (req, res, next) => {
  if (!req.headers.id) {
    req.headers.id = uuid()
    next()
  }
}