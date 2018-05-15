const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Hive = require('../models/Hive');
const Honey = require('../models/Honey');
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

  User.findById(update.id)
    .then(user => {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        throw new Error('The user does not exist');
      }
      User.findByIdAndUpdate(update.id, update, {new: true})
        .then(user => {res.status(200).json(user)})
        .catch(error => next({ message: 'There was a problem updating user data' }))
    })
    .catch(error => res.status(500).json({ message: error }));
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
                .then(honey => console.log("HONEY DELETED: " + honey))
                .then( () => {
                  // Deleting users hives and the user himself
                  User.findByIdAndRemove(req.params.id)
                    .then(user => {
                      console.log('USER REMOVED: ' + user);
                      Hive.deleteMany({ beekeeper: user._id })
                        .then(hive => {
                          console.log('HIVE REMOVED: ' + hive);
                          res.status(200).json({ message: "USER, HIVES AND HONEYS RELATED HAVE BEEN REMOVED OF DB" })
                        })
                        .catch((error) => next({ message: "There was a problem deleting user hives: " + error }))
                    })
                    .catch((error) => next({ message: "There was a problem finding user: " + error }))
                })
                .catch(error => next({ message: 'There was a problem deleting user honey: ' + error }))
            })   
          })
          .catch(error => res.status(500).json({ message: error }))  
      }

      else {
        console.log('ENTRO EN EL ELSE ----------->');
        Hive.updateMany({ patrons: { $in: [user._id]} }, { $pull: { patrons: user._id} }, { new: true })
          .then(hives => {
              console.log("USER SPONSORED HIVES DELETED: " + hives);
              User.findByIdAndRemove(req.params.id)
                .then(user => res.status(200).json({ message: "USER AND SPONSORED HIVES HAVE BEEN REMOVED OF DB" }))
                .catch(error => next({ message: 'There was a problem deleting user: ' + error }))
          })
          .catch(error => res.status(500).json({ message: error }))
      }
    })
})


module.exports = router;
