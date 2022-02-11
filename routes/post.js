const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.get('/', postController.getPosts); // page facing

router.post('/', postController.createPost); // editor facing

router.get('/:postLink', postController.getPostWithLink); // page facing

router.put('/:postLink', postController.updatePostWithLink); // editor facing

router.delete('/:postLink', postController.deletePostWithLink); // editor facing

router.get('/:postLink/comments', commentController.getCommentsWithPostLink); // page facing

router.post('/:postLink/comments', commentController.createCommentWithPostLink); // page facing

router.get(
  '/:postLink/comments/:commentId',
  commentController.getCommentWithId
); // page facing

router.delete(
  '/:postLink/comments/:commentId',
  commentController.deleteCommentWithId
); // editor facing

module.exports = router;
