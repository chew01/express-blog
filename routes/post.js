const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.get('/', postController.getPosts);

router.post('/', postController.createPost);

router.get('/:postLink', postController.getPostWithLink);

router.put('/:postLink', postController.updatePostWithLink);

router.delete('/:postLink', postController.deletePostWithLink);

router.get('/:postLink/comments', commentController.getCommentsWithPostId);

router.post('/:postLink/comments', commentController.createCommentWithPostId);

router.get(':postLink/comments/:commentId', commentController.getCommentWithId);

router.put(
  ':postLink/comments/:commentId',
  commentController.updateCommentWithId
);

router.delete(
  ':postLink/comments/:commentId',
  commentController.deleteCommentWithId
);

module.exports = router;
