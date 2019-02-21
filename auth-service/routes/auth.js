const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Hive = require('../models/Hive')
const Honey = require('../models/Honey')
const bcrypt = require('bcryptjs')
const _ = require('lodash')

const logger = require('../logger/logger')
const logInPromise = async (user, req) => {
  try {
    return req.login(user)
  } catch (error) {
    logger.error('Something went wrong')
  }
}

router.post('/signup', async (req, res, next) => {
  const { email, password, isApicultor } = req.body

  if (!email || !password) {
    logger.error('Missing email or password')
    res.status(400).json({ message: 'Provide email and password' })
    return
  }
  try {
    const user = await User.findOne({ email })
    if (user) throw new Error(`Email ${email} already exists`)

    const salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(password, salt)

    const newUser = new User({
      email,
      password: hashPass,
      isApicultor
    })

    const loggedUser = await newUser.save()
    await logInPromise(loggedUser, req)

    return res.status(200).json(user)
  } catch (error) {
    logger.error(error)
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
    res.status(500).json({ message: error.message })
  }
})

router.get('/loggedin', (req, res) => {
  return req.user
    ? res.status(200).json(req.user)
    : res.status(400).json({ message: 'You should loggin first' })
})

router.get('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    return res.status(200).json({ message: 'User logged out' })
  } else {
    return res.status(400).json({ message: 'You should loggin first' })
  }
})

router.post('/fill-details', (req, res, next) => {
  const {name, surname, address, phoneNumber} = req.body
  const email = req.body.email
  const update = {name, surname, address, phoneNumber, isFilled:true}
  User.findOneAndUpdate({ email }, update, {new : true})
    .then(user => {
      if(!user) {throw new Error('The email does not exist')}
      res.status(200).json({ message: 'User updated successfully' })
    })
    .catch(e => res.status(500).json({ message: e.message }))  
})

router.post('/update-profile', (req, res, next) => {
  let update = _.pickBy(req.body, function(value) {return value !== ''})
  update = _.omit(update, 'password')

  User.findById(update.id)
    .then(user => {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        throw new Error('The user does not exist')
      }
      User.findByIdAndUpdate(update.id, update, {new: true})
        .then(user => {res.status(200).json(user)})
        .catch(error => next({ message: 'There was a problem updating user data' }))
    })
    .catch(error => res.status(500).json({ message: error }))
})

router.post('/delete-profile/:id', (req, res, next) => {
  
  User.findById(req.params.id)
    .then(user => {
      if(user.isApicultor){
        // Deleting beekeeper honey
        Hive.find({ beekeeper: user._id })
          .then(hives => {
            hives.forEach(hive => {
              Honey.deleteOne({ hive: hive._id })
                .then(honey => console.log('HONEY DELETED: ' + honey))
                .then( () => {
                  // Deleting users hives and the user himself
                  User.findByIdAndRemove(req.params.id)
                    .then(user => {
                      console.log('USER REMOVED: ' + user)
                      Hive.deleteMany({ beekeeper: user._id })
                        .then(hive => {
                          console.log('HIVE REMOVED: ' + hive)
                          res.status(200).json({ message: 'USER, HIVES AND HONEYS RELATED HAVE BEEN REMOVED OF DB' })
                        })
                        .catch((error) => next({ message: 'There was a problem deleting user hives: ' + error }))
                    })
                    .catch((error) => next({ message: 'There was a problem finding user: ' + error }))
                })
                .catch(error => next({ message: 'There was a problem deleting user honey: ' + error }))
            })   
          })
          .catch(error => res.status(500).json({ message: error }))  
      }

      else {
        console.log('ENTRO EN EL ELSE ----------->')
        Hive.updateMany({ patrons: { $in: [user._id]} }, { $pull: { patrons: user._id} }, { new: true })
          .then(hives => {
            console.log('USER SPONSORED HIVES DELETED: ' + hives)
            User.findByIdAndRemove(req.params.id)
              .then(user => res.status(200).json({ message: 'USER AND SPONSORED HIVES HAVE BEEN REMOVED OF DB' }))
              .catch(error => next({ message: 'There was a problem deleting user: ' + error }))
          })
          .catch(error => res.status(500).json({ message: error }))
      }
    })
})


module.exports = router
