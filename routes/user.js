const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('get users');
});

router.post('/', function (req, res, next) {
  res.send('post users');
});

router.get('/:userId', function (req, res, next) {
  res.send('get userId ' + req.params.userId);
});

router.put('/:userId', function (req, res, next) {
  res.send('put userId ' + req.params.userId);
});

router.delete('/:userId', function (req, res, next) {
  res.send('delete userId ' + req.params.userId);
});

module.exports = router;
