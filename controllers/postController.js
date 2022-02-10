const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');
const { DateTime } = require('luxon');

exports.getPosts = (req, res, next) => {
  Post.find({}, { _id: 0, __v: 0 })
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
          .send({ status: 'fail', data: 'Author provided does not exist.' });
      }
      Post.find({ hyperlink: formattedHyperlink }).exec((err, result) => {
        if (err) return next(err);
        if (result.length > 0) {
          return res.status(400).send({
            status: 'fail',
            data: 'A post has already been created with the same hyperlink.',
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
  Post.find({ hyperlink: req.params.postId }, { _id: 0, __v: 0 })
    .populate('author')
    .exec((err, result) => {
      if (err) return next(err);
      if (result.length === 0)
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
    User.findById(req.body.author).exec((err, result) => {
      if (err) return next(err);
      if (!result) {
        return res
          .status(400)
          .send({ status: 'fail', data: 'Author provided does not exist.' });
      }
      Post.updateOne({ hyperlink: req.params.postId }, post, (err) => {
        if (err) return next(err);
        return res.status(201).send({
          status: 'success',
          data: 'Post successfully updated at /posts/' + req.params.postId,
        });
      });
    });
  },
];

exports.deletePostWithLink = (req, res, next) => {
  Post.find({ hyperlink: req.params.postId }).exec((err, result) => {
    if (err) return next(err);
    if (result.length === 0) {
      return res
        .status(400)
        .send({ status: 'fail', data: 'Post does not exist.' });
    }
    Post.deleteOne({ hyperlink: req.params.postId }, (err) => {
      if (err) return next(err);
      return res.send({
        status: 'success',
        data: 'Post was successfully removed.',
      });
    });
  });
};
