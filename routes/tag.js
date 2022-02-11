const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.get('/', tagController.getTags); // page facing

router.post('/', tagController.createTag); // editor facing

router.get('/:tagName', tagController.getPostsWithTagName); // page facing

router.put('/:tagName', tagController.updateTagWithTagName); // editor facing

router.delete('/:tagName', tagController.deleteTagWithTagName); // editor facing

module.exports = router;
