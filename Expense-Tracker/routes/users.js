const express = require('express');
const router = express.Router();
const signupController = require('../controllers/users');
const loginController = require('../controllers/users');

router.post('/signup', signupController.signup);
router.post('/login', loginController.login);

module.exports = router;