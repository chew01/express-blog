const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');
const { DateTime } = require('luxon');
const async = require('async');

exports.getPosts = (req, res, next) => {
  Post.find()
    .populate('tags')
    .populate('author')
    .sort()
    .exec((err, result) => {
      if (err) return next(err);
      return res.send({ status: 'success', data: result });
    });
};

exports.createPost = [
  body('title', 'Title cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('content').escape(),
  body('tags.*').escape(),
  body('author', 'Author cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('isPublished', 'Published status must be a boolean')
    .trim()
    .isBoolean()
    .toBoolean(),
  body('hyperlink')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Hyperlink cannot be empty')
    .isBase64({ urlSafe: true })
    .withMessage('Hyperlink is not URL safe')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const formattedHyperlink =
      DateTime.fromJSDate(new Date()).toISODate() + '-' + req.body.hyperlink;

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      author: req.body.author,
      isPublished: req.body.isPublished,
      hyperlink: formattedHyperlink,
    });

    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 'fail', data: errors });
    }
    User.findById(req.body.author).exec((err, result) => {
      if (err) return next(err);
      if (!result) {
        return res
          .status(400)
          .send({ status: 'fail', data: 'Author provided does not exist' });
      }
      Post.findOne({ hyperlink: formattedHyperlink }).exec((err, result) => {
        if (err) return next(err);
        if (result) {
          return res.status(400).send({
            status: 'fail',
            data: 'A post has already been created with the same hyperlink',
          });
        }
        post.save((err) => {
          if (err) return next(err);
          return res.status(201).send({
            status: 'success',
            data: 'Post successfully created at ' + post.url,
          });
        });
      });
    });
  },
];

exports.getPostWithLink = (req, res, next) => {
  Post.findOne({ hyperlink: req.params.postLink })
    .populate('tags')
    .populate('author')
    .exec((err, result) => {
      if (err) return next(err);
      if (!result)
        return res
          .status(404)
          .send({ status: 'fail', data: 'Post does not exist' });
      return res.send({ status: 'success', data: result });
    });
};

exports.updatePostWithLink = [
  body('title', 'Title cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('content').escape(),
  body('tags.*').escape(),
  body('author', 'Author cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('isPublished', 'Published status must be a boolean')
    .trim()
    .isBoolean()
    .toBoolean(),

  (req, res, next) => {
    const errors = validationResult(req);

    const post = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      author: req.body.author,
      isPublished: req.body.isPublished,
    };

    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 'fail', data: errors });
    }
    async.parallel(
      {
        post: (callback) => {
          Post.findOne({ hyperlink: req.params.postLink }).exec(callback);
        },
        author: (callback) => {
          User.findById(req.body.author).exec(callback);
        },
      },
      (err, result) => {
        if (err) return next(err);
        if (!result.post)
          return res
            .status(400)
            .send({ status: 'fail', data: 'Post does not exist' });
        if (!result.author)
          return res
            .status(400)
            .send({ status: 'fail', data: 'Author provided does not exist' });
        Post.updateOne({ hyperlink: req.params.postLink }, post, (err) => {
          if (err) return next(err);
          return res.send({
            status: 'success',
            data: 'Post successfully updated at /posts/' + req.params.postLink,
          });
        });
      }
    );
  },
];

exports.deletePostWithLink = (req, res, next) => {
  Post.findOne({ hyperlink: req.params.postLink }).exec((err, result) => {
    if (err) return next(err);
    if (!result) {
      return res
        .status(400)
        .send({ status: 'fail', data: 'Post does not exist' });
    }
    Post.deleteOne({ hyperlink: req.params.postLink }, (err) => {
      if (err) return next(err);
      return res.send({
        status: 'success',
        data: 'Post was successfully removed',
      });
    });
  });
};
