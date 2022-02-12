const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.getUsers
); // editor facing

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.createUser
); // editor facing

router.get('/:userName', userController.getPublicPostsWithUserName); // page facing

router.put(
  '/:userName',
  passport.authenticate('jwt', { session: false }),
  userController.updateUserWithName
); // editor facing

router.delete(
  '/:userName',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUserWithName
); // editor facing

router.get(
  '/:userName/all',
  passport.authenticate('jwt', { session: false }),
  userController.getAllPostsWithUserName
); // editor facing

module.exports = router;
