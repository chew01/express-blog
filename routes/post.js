const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const passport = require('passport');

router.get('/', postController.getPublicPosts); // page facing

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.createPost
); // editor facing

router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  postController.getAllPosts
); // editor facing

router.get('/:postLink', postController.getPostWithLink); // page facing

router.put(
  '/:postLink',
  passport.authenticate('jwt', { session: false }),
  postController.updatePostWithLink
); // editor facing

router.delete(
  '/:postLink',
  passport.authenticate('jwt', { session: false }),
  postController.deletePostWithLink
); // editor facing

router.get('/:postLink/comments', commentController.getCommentsWithPostLink); // page facing

router.post('/:postLink/comments', commentController.createCommentWithPostLink); // page facing

router.get(
  '/:postLink/comments/:commentId',
  commentController.getCommentWithId
); // page facing

router.delete(
  '/:postLink/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  commentController.deleteCommentWithId
); // editor facing

module.exports = router;
