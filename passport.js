require('dotenv').config();
const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, cb) {
      return User.findOne({ email }).exec((err, user) => {
        if (err) return cb(err);
        if (!user) {
          return cb(null, false, { message: 'Incorrect email or password' });
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return cb(err);
          if (!result)
            return cb(null, false, { message: 'Incorrect email or password' });
          return cb(null, user, { message: 'Logged in successfully' });
        });
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, cb) {
      return cb(null, jwtPayload);
    }
  )
);
