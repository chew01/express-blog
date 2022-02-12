const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const passport = require('passport');

router.get('/', tagController.getTags); // page facing

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  tagController.createTag
); // editor facing

router.get('/:tagName', tagController.getPublicPostsWithTagName); // page facing

router.put(
  '/:tagName',
  passport.authenticate('jwt', { session: false }),
  tagController.updateTagWithTagName
); // editor facing

router.delete(
  '/:tagName',
  passport.authenticate('jwt', { session: false }),
  tagController.deleteTagWithTagName
); // editor facing

router.get(
  '/:tagName/all',
  passport.authenticate('jwt', { session: false }),
  tagController.getAllPostsWithTagName
); // editor facing

module.exports = router;
