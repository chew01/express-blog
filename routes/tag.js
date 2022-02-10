const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('get tags');
});

router.post('/', function (req, res, next) {
  res.send('post tags');
});

router.get('/:tagName', function (req, res, next) {
  res.send('get tagName ' + req.params.tagName);
});

router.put('/:tagName', function (req, res, next) {
  res.send('put tagName ' + req.params.tagName);
});

router.delete('/:tagName', function (req, res, next) {
  res.send('delete tagName ' + req.params.tagName);
});

module.exports = router;
