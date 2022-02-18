require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.loginUser = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err, mongooseUser, info) => {
      if (err) return next(err);
      if (!mongooseUser)
        return res.status(400).send({ status: 'fail', data: info });
      req.login(mongooseUser, { session: false }, (err) => {
        if (err) return next(err);
        const user = {
          name: mongooseUser.name,
          email: mongooseUser.email,
        };
        const token = jwt.sign(user, process.env.JWT_SECRET);
        res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
        return;
      });
    }
  )(req, res);
};
