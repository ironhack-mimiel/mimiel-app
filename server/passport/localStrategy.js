const passport = require("passport");
const bcrypt = require('bcrypt');
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

const path = require("path");
const app_name = require("../package.json").name;
const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);


passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
(email, password, next) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect email" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }
      debug('User logged in!');
      return next(null, user);
    });
  })
);
