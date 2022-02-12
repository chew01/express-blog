const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const async = require('async');
const Post = require('../models/post');

exports.getUsers = (req, res, next) => {
  User.find({}, { __v: 0, password: 0 })
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
      return res.status(400).send({ status: 'fail', data: errors });
    }
    async.parallel(
      {
        name_check: (callback) => {
          User.findOne({ name: req.body.name }).exec(callback);
        },
        email_check: (callback) => {
          User.findOne({ email: req.body.email }).exec(callback);
        },
      },
      (err, result) => {
        if (err) return next(err);
        if (result.name_check) {
          res.status(400).send({
            status: 'fail',
            data: 'User already exists with the given name',
          });
        }
        if (result.email_check) {
          res.status(400).send({
            status: 'fail',
            data: 'User already exists with the given email',
          });
        }
        user.save((err) => {
          if (err) return next(err);
          return res
            .status(201)
            .send({ status: 'success', data: 'User successfully created' });
        });
      }
    );
  },
];

exports.getPublicPostsWithUserName = (req, res, next) => {
  User.findOne({ name: req.params.userName }).exec((err, result) => {
    if (err) return next(err);
    if (!result)
      return res
        .status(404)
        .send({ status: 'fail', data: 'User does not exist' });
    Post.find({ author: result._id, isPublished: true }, { __v: 0 })
      .populate('tags', { name: 1 })
      .populate('author', { name: 1 })
      .sort()
      .exec((err, result) => {
        if (err) return next(err);
        res.send({ status: 'success', data: result });
      });
  });
};

exports.updateUserWithName = [
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

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 'fail', data: errors });
    }
    async.parallel(
      {
        name_check: (callback) => {
          User.findOne({ name: req.body.name }).exec(callback);
        },
        email_check: (callback) => {
          User.findOne({ email: req.body.email }).exec(callback);
        },
      },
      (err, result) => {
        if (err) return next(err);
        if (result.name_check) {
          res.status(400).send({
            status: 'fail',
            data: 'User already exists with the given name',
          });
        }
        if (result.email_check) {
          res.status(400).send({
            status: 'fail',
            data: 'User already exists with the given email',
          });
        }
        User.updateOne({ name: req.params.userName }, user, (err) => {
          if (err) return next(err);
          res.send({ status: 'success', data: 'User successfully updated' });
        });
      }
    );
  },
];

exports.deleteUserWithName = (req, res) => {
  User.findOne({ name: req.params.userName }).exec((err, result) => {
    if (err) return next(err);
    if (!result)
      return res
        .status(400)
        .send({ status: 'fail', data: 'User does not exist' });
    User.deleteOne({ name: req.params.userName }, (err) => {
      if (err) return next(err);
      return res.send({ status: 'success', data: 'User successfully removed' });
    });
  });
};

exports.getAllPostsWithUserName = (req, res, next) => {
  User.findOne({ name: req.params.userName }).exec((err, result) => {
    if (err) return next(err);
    if (!result)
      return res
        .status(404)
        .send({ status: 'fail', data: 'User does not exist' });
    Post.find({ author: result._id }, { __v: 0 })
      .populate('tags', { name: 1 })
      .populate('author', { name: 1 })
      .sort()
      .exec((err, result) => {
        if (err) return next(err);
        res.send({ status: 'success', data: result });
      });
  });
};
