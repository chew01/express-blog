const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

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
  (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      author: req.body.author,
      isPublished: req.body.isPublished,
    });

    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 'fail', data: errors });
    }
    User.findById(req.body.author).exec((err, result) => {
      if (!result) {
        return res
          .status(400)
          .send({ status: 'fail', data: 'Author provided does not exist.' });
      }
      post.save((err) => {
        if (err) return next(err);
        return res.status(201).send({
          status: 'success',
          data: 'Post successfully created.',
        });
      });
    });
  },
];

exports.getPostWithId = (req, res, next) => {
  Post.findById(req.params.postId, { _id: 0, __v: 0 })
    .populate('author')
    .exec((err, result) => {
      if (!result)
        return res.send({ status: 'fail', data: 'Post does not exist' });
      return res.send({ status: 'success', data: result });
    });
};

exports.updatePostWithId = [
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

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      author: req.body.author,
      isPublished: req.body.isPublished,
      _id: req.params.postId,
    });

    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 'fail', data: errors });
    }
    User.findById(req.body.author).exec((err, result) => {
      if (!result) {
        return res
          .status(400)
          .send({ status: 'fail', data: 'Author provided does not exist.' });
      }
      Post.findByIdAndUpdate(
        req.params.postId,
        post,
        {},
        (err, updatedPost) => {
          if (err) return next(err);
          res.send({
            status: 'success',
            data: 'Post was successfully updated.',
          });
        }
      );
    });
  },
];

exports.deletePostWithId = (req, res, next) => {
  Post.findById(req.params.postId).exec((err, result) => {
    if (!result) {
      return res
        .status(400)
        .send({ status: 'fail', data: 'Post does not exist.' });
    }
    Post.findByIdAndRemove(req.params.postId, (err) => {
      if (err) return next(err);
      return res.send({
        status: 'success',
        data: 'Post was successfully removed.',
      });
    });
  });
};
