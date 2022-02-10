const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);

router.post('/', postController.createPost);

router.get('/:postId', postController.getPostWithId);

router.put('/:postId', postController.updatePostWithId);

router.delete('/:postId', postController.deletePostWithId);

router.get('/:postId/comments', postController.getCommentsWithPostId);

router.post('/:postId/comments', postController.createCommentWithPostId);

router.get(':postId/comments/:commentId', postController.getCommentWithId);

router.put(':postId/comments/:commentId', postController.updateCommentWithId);

router.delete(
  ':postId/comments/:commentId',
  postController.deleteCommentWithId
);

module.exports = router;
