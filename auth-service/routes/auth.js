const express = require('express')
const router = express.Router()
// const Hive = require('../models/Hive')
// const Honey = require('../models/Honey')
const User = require('../models/User')

const bcrypt = require('bcryptjs')
const _ = require('lodash')

const handlers = require('../handlers')
const logInPromise = require('./logInPromise')

const logger = require('../logger/logger')

router.post('/signup', async (req, res, next) => {
  logger.info('Request to /signup received', {traceId: req.headers.id})

  try {
    const loggedUser = await handlers.signup(req.body, {traceId: req.headers.id}) 
    await logInPromise(loggedUser, req)

    return res.status(200).json(loggedUser)
  } catch (error) {
    logger.error(error, {traceId: req.headers.id})
    return res.status(500).json({ message: error.message })
  }
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: 'Provide email and password' })
    return
  }

  try {
    const user = await User.findOne({ email })

    if (!user) throw new Error('The email does not exist')

    if (!bcrypt.compareSync(password, user.password))
      throw new Error('The password is not correct')

    await logInPromise(user, req)

    return res.status(200).json(user)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: error.message }, {traceId: req.headers.id})
  }
})

router.get('/loggedin', (req, res) => {
  logger.info('Request received')
  return req.user
    ? res.status(200).json(req.user)
    : res.status(400).json({ message: 'You should loggin first' })
})

router.get('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.status(200).json({ message: 'User logged out' })
  } else {
    res.status(400).json({ message: 'You should loggin first' })
  }
})

router.post('/fill-details', async (req, res, next) => {
  const {name, surname, address, phoneNumber, email } = req.body
  const update = {name, surname, address, phoneNumber, isFilled:true}

  try {
    logger.info(`Updating user with info: ${JSON.stringify(update)}`, {traceId: req.headers.id})
    const user = await User.findOneAndUpdate({ email }, update, {new : true})
    if(!user) {throw new Error('The email does not exist')}

    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    logger.error(`Error happened: ${error.message}`)
    res.status(500).json({message: error.message })
  }
})

router.post('/update-profile', async (req, res, next) => {
  let update = _.pickBy(req.body, function(value) {return value !== ''})
  update = _.omit(update, 'password')
  logger.info(`Updating user with info: ${JSON.stringify(update)}`, {traceId: req.headers.id})

  try {
    const user = await User.findById(update.id)
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw new Error('Password does not match')
    }

    const resultUser = await User.findByIdAndUpdate(update.id, update, {new: true})

    logger.info('User updated successfully', {traceId: req.headers.id})
    res.status(200).json(resultUser)
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`)
    res.status(500).json({ message: error })
  }
})

// router.post('/delete-profile/:id', (req, res, next) => {
  
//   User.findById(req.params.id)
//     .then(user => {
//       if(user.isApicultor){
//         // Deleting beekeeper honey
//         Hive.find({ beekeeper: user._id })
//           .then(hives => {
//             hives.forEach(hive => {
//               Honey.deleteOne({ hive: hive._id })
//                 .then(honey => console.log('HONEY DELETED: ' + honey))
//                 .then( () => {
//                   // Deleting users hives and the user himself
//                   User.findByIdAndRemove(req.params.id)
//                     .then(user => {
//                       console.log('USER REMOVED: ' + user)
//                       Hive.deleteMany({ beekeeper: user._id })
//                         .then(hive => {
//                           console.log('HIVE REMOVED: ' + hive)
//                           res.status(200).json({ message: 'USER, HIVES AND HONEYS RELATED HAVE BEEN REMOVED OF DB' })
//                         })
//                         .catch((error) => next({ message: 'There was a problem deleting user hives: ' + error }))
//                     })
//                     .catch((error) => next({ message: 'There was a problem finding user: ' + error }))
//                 })
//                 .catch(error => next({ message: 'There was a problem deleting user honey: ' + error }))
//             })   
//           })
//           .catch(error => res.status(500).json({ message: error }))  
//       }

//       else {
//         console.log('ENTRO EN EL ELSE ----------->')
//         Hive.updateMany({ patrons: { $in: [user._id]} }, { $pull: { patrons: user._id} }, { new: true })
//           .then(hives => {
//             console.log('USER SPONSORED HIVES DELETED: ' + hives)
//             User.findByIdAndRemove(req.params.id)
//               .then(user => res.status(200).json({ message: 'USER AND SPONSORED HIVES HAVE BEEN REMOVED OF DB' }))
//               .catch(error => next({ message: 'There was a problem deleting user: ' + error }))
//           })
//           .catch(error => res.status(500).json({ message: error }))
//       }
//     })
// })


module.exports = router
