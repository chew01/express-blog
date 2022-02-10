const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.get('/', tagController.getTags);

router.post('/', tagController.createTag);

router.get('/:tagName', tagController.getPostsWithTagName);

router.put('/:tagName', tagController.updateTagWithTagName);

router.delete('/:tagName', tagController.deleteTagWithTagName);

module.exports = router;
