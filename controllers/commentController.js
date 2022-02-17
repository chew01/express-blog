const Post = require('../models/post');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.getCommentsWithPostLink = (req, res, next) => {
  Post.findOne({ hyperlink: req.params.postLink }).exec((err, result) => {
    if (err) return next(err);
    if (!result)
      return res
        .status(404)
        .send({ status: 'fail', data: 'Post does not exist' });
    Comment.find({ post: result._id })
      .populate('post')
      .sort({ createdAt: -1 })
      .exec((err, comments) => {
        if (err) return next(err);
        return res.send({ status: 'success', data: comments });
      });
  });
};

exports.createCommentWithPostLink = [
  body('title', 'Title cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('content', 'Content cannot be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('commenter_name', 'Name cannot be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('commenter_email')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email is in invalid format')
    .normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 'fail', data: errors });
    }
    Post.findOne({ hyperlink: req.params.postLink }).exec((err, result) => {
      if (err) return next(err);
      if (!result)
        return res
          .status(400)
          .send({ status: 'fail', data: 'Post does not exist' });

      const comment = new Comment({
        title: req.body.title,
        content: req.body.content,
        commenter_name: req.body.commenter_name,
        commenter_email: req.body.commenter_email,
        post: result._id,
      });

      comment.save((err) => {
        if (err) return next(err);
        res.send({
          status: 'success',
          data:
            'Comment successfully created at /' +
            req.params.postLink +
            '/comments/' +
            comment._id,
        });
      });
    });
  },
];

exports.getCommentWithId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.commentId)) {
    return res
      .status(404)
      .send({ status: 'fail', data: 'Comment does not exist' });
  }
  Comment.findById(castId)
    .populate('post')
    .exec((err, result) => {
      if (err) return next(err);
      if (!result)
        return res
          .status(404)
          .send({ status: 'fail', data: 'Comment does not exist' });
      res.send({ status: 'success', data: result });
    });
};

exports.deleteCommentWithId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.commentId)) {
    return res
      .status(400)
      .send({ status: 'fail', data: 'Comment does not exist' });
  }
  Comment.findById(req.params.commentId).exec((err, result) => {
    if (err) return next(err);
    if (!result)
      return res
        .status(400)
        .send({ status: 'fail', data: 'Comment does not exist' });
    Comment.findByIdAndRemove(req.params.commentId).exec((err) => {
      if (err) return next(err);
      return res.send({
        status: 'success',
        data: 'Comment was successfully removed',
      });
    });
  });
};
