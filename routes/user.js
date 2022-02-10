const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.get('/:userId', userController.getUserWithId);

router.put('/:userId', userController.updateUserWithId);

router.delete('/:userId', userController.deleteUserWithId);

module.exports = router;
