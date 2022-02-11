const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers); // editor facing

router.post('/', userController.createUser); // editor facing

router.get('/:userName', userController.getPostsWithUserName); // page facing

router.put('/:userName', userController.updateUserWithName); // editor facing

router.delete('/:userName', userController.deleteUserWithName); // editor facing

module.exports = router;
