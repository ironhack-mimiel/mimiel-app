const logger = require('../logger/logger')

module.exports = async (user, req) => {
  return  new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) return reject('Something went wrong')
      resolve(user)
    })
  })
}
 