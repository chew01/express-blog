const { body, validationResult } = require('express-validator');
const Tag = require('../models/tag');

exports.getTags = (req, res, next) => {
  Tag.find({}, { _id: 0, __v: 0 })
    .sort()
    .exec((err, result) => {
      if (err) return next(err);
      return res.send({ status: 'success', data: result });
    });
};

exports.createTag = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Tag name cannot be empty')
    .isBase64({ urlSafe: true })
    .withMessage('This tag is not URL safe')
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const tag = new Tag({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 'fail', data: errors });
    }
    Tag.findOne({ name: req.body.name }).exec((err, result) => {
      if (err) return next(err);
      if (result) {
        return res
          .status(400)
          .send({ status: 'fail', data: 'Tag already exists' });
      }
      tag.save((err) => {
        if (err) return next(err);
        return res.status(201).send({
          status: 'success',
          data: 'New tag successfully created at ' + tag.url,
        });
      });
    });
  },
];

exports.getPostsWithTagName = (req, res, next) => {
  Tag.findOne({ name: req.params.tagName }, { _id: 0, __v: 0 }).exec(
    (err, result) => {
      if (err) return next(err);
      if (!result) {
        return res
          .status(404)
          .send({ status: 'fail', data: 'Tag does not exist' });
      }
      return res.send(result);
    }
  );
};

exports.updateTagWithTagName = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Tag name cannot be empty')
    .isBase64({ urlSafe: true })
    .withMessage('This tag is not URL safe')
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const tag = {
      name: req.body.name,
    };

    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 'fail', data: errors });
    }
    Tag.findOne({ name: req.params.tagName }).exec((err, result) => {
      if (err) return next(err);
      if (!result)
        return res
          .status(400)
          .send({ status: 'fail', data: 'Tag does not exist.' });
      Tag.updateOne({ name: req.params.tagName }, tag, (err) => {
        if (err) return next(err);
        return res.send({
          status: 'success',
          data: 'Tag successfully updated. New link at /tags/' + req.body.name,
        });
      });
    });
  },
];

exports.deleteTagWithTagName = (req, res) => {
  Tag.findOne({ name: req.params.tagName }).exec((err, result) => {
    if (err) return next(err);
    if (!result)
      return res
        .status(400)
        .send({ status: 'fail', data: 'Tag does not exist' });
    Tag.deleteOne({ name: req.params.tagName }).exec((err) => {
      if (err) return next(err);
      return res.send({
        status: 'success',
        data: 'Tag was successfully removed',
      });
    });
  });
};
