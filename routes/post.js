const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.get('/', postController.getPosts);

router.post('/', postController.createPost);

router.get('/:postId', postController.getPostWithLink);

router.put('/:postId', postController.updatePostWithLink);

router.delete('/:postId', postController.deletePostWithLink);

router.get('/:postId/comments', commentController.getCommentsWithPostId);

router.post('/:postId/comments', commentController.createCommentWithPostId);

router.get(':postId/comments/:commentId', commentController.getCommentWithId);

router.put(
  ':postId/comments/:commentId',
  commentController.updateCommentWithId
);

router.delete(
  ':postId/comments/:commentId',
  commentController.deleteCommentWithId
);

module.exports = router;
