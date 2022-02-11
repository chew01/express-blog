const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.get('/:userName', userController.getPostsWithUserName);

router.put('/:userName', userController.updateUserWithName);

router.delete('/:userName', userController.deleteUserWithName);

module.exports = router;
