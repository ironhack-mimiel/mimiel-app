const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Hive = require('../models/Hive');
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
  const { email, password, isApicultor } = req.body;

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
        password: hashPass,
        isApicultor
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
      User.findByIdAndUpdate(update.id, update, {new: true})
        .then(user => {res.status(200).json(user)})
        //.catch(res.status(500).json({ message: 'There was a problem updating user data'}))
    })
    //.catch(e => res.status(500).json({ message: e.message }));
})

router.post('/delete-profile/:id', (req, res, next) => {
  
  User.findById(req.params.id)
    .then(user => {
      if(user.isApicultor){

        // Deleting beekeeper honey
        Hive.find({ beekeeper: user._id })
          .then(hives => {
            hives.forEach(hive => {
              Honey.remove({ hive: hive._id })
            })
              .catch(error => res.status(500).json({ message: 'There was a problem deleting user honey' }))
          })
          .catch(error => res.status(500).json({ message: 'There was a problem finding user honey' }))
        
          // Deleting users hives and the user himself
        User.findByIdAndRemove(req.params.id)
          .then(user => {
            res.status(200).json({ message: "User deleted succesfully" })
            Hive.deleteMany({ beekeeper: user._id })
              .then(res.status(200).json({ message: "User hives deleted succesfully" }))
              .catch(res.status(500).json({ message: "There was a problem deleting user hives" }))
          })
          .catch(res.status(500).json({ message: "There was a problem deleting user" })) 
      }

      else {
        Hive.find({ patrons: { $in: [user._id]} })
          .then(hives => {
            console.log(hives);  
            //hives.forEach(hive => {
            //})
          })
        }
      })
})


module.exports = router;
