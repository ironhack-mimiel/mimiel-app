const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const logInPromise = (user, req) =>
  new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) return reject('Something went wrong');
      resolve(user);
    });
  });

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Provide email and password' });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (user) throw new Error('The email already exists');

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const theUser = new User({
        email,
        password: hashPass
      });

      return theUser.save().then(user => logInPromise(user, req));
    })
    .then(user => res.status(200).json(user))
    .catch(e => res.status(500).json({ message: e.message }));
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Provide email and password' });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) throw new Error('The email does not exist');
      if (!bcrypt.compareSync(password, user.password))
        throw new Error('The password is not correct');
      return logInPromise(user, req);
    })
    .then(user => res.status(200).json(user))
    .catch(e => res.status(500).json({ message: e.message }));
});

router.get('/loggedin', (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(400).json({ message: 'You should loggin first' });
  }
});

router.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    return res.status(200).json({ message: 'User logged out' });
  } else {
    return res.status(400).json({ message: 'You should loggin first' });
  }
});

router.post('/fill-details', (req, res, next) => {
  const {name, surname, address, phoneNumber} = req.body;
  const email = req.body.email;
  const update = {name, surname, address, phoneNumber, isFilled:true};
  User.findOneAndUpdate({ email }, update, {new : true})
  .then(user => {
    if(!user) {throw new Error('The email does not exist')}
    res.status(200).json({ message: 'User updated successfully' });
  })
  .catch(e => res.status(500).json({ message: e.message }));  
})

router.post('/update-profile', (req, res, next) => {
  let update = _.pickBy(req.body, function(value) {return value !== ''});
  update = _.omit(update, 'password');
  console.log(update);

  User.findById(update.id)
    .then(user => {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        throw new Error('The user does not exist');
      }
      User.update({ _id: update.id}, update, {new: true})
        .then(res.status(200).json({ message: 'User updated successfully' }))
        //.catch(res.status(500).json({ message: 'There was a problem updating user data'}))
    })
    //.catch(e => res.status(500).json({ message: e.message }));
})

router.post('/delete-profile/:id', (req, res, next) => {

  User.findByIdAndRemove(req.params.id)
    .then(res.status(200).json({ message: 'User updated successfully' }))
    //.catch(res.status(500).json({ message: 'There was a problem updating user data'}))
})

module.exports = router;
