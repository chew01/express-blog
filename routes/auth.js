const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/login', authController.loginUser);

router.get(
  '/check',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);

module.exports = router;
