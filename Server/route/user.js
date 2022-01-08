const express = require('express');
const router = express.Router();

const loginCtrl = require('../controller/login');
const signupCtrl = require('../controller/signup');
const authCtrl = require('../controller/auth');

router.post('/login', loginCtrl);

router.post('/signup', signupCtrl);

router.post('/forgotpassword', authCtrl.forgotPassword);

router.post('/resetpassword/:token', authCtrl.resetPassword);

module.exports = router;