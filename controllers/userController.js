const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.getUsers = (req, res, next) => {
  User.find({}, { name: 1, _id: 0 })
    .sort()
    .exec((err, result) => {
      if (err) return next(err);
      return res.send({ status: 'success', data: result });
    });
};

exports.createUser = [
  body('name', 'Name cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('email')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email is in invalid format')
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Password cannot be empty')
    .isStrongPassword()
    .withMessage('Password is not strong enough')
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      // return validation errors
      return res.status(400).send({ status: 'fail', data: errors });
    }
    // no errors
    User.findOne({ email: req.body.email }).exec((err, result) => {
      if (err) return next(err);
      if (result) {
        // user already exists
        return res.status(409).send({
          status: 'fail',
          data: 'User already exists with the given email.',
        });
      }
      // user does not exist, save user
      user.save((err) => {
        if (err) return next(err);
        return res.status(201).send({
          status: 'success',
          data: 'User successfully created.',
        });
      });
    });
  },
];

exports.getUserWithId = (req, res) => {
  res.send('get userId ' + req.params.userId);
};

exports.updateUserWithId = (req, res) => {
  res.send('put userId ' + req.params.userId);
};

exports.deleteUserWithId = (req, res) => {
  res.send('delete userId ' + req.params.userId);
};
