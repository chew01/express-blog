const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getIndex);

router.get('/sign-up', indexController.getSignUp);

router.get('/log-in', indexController.getLogIn);

module.exports = router;
