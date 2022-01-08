const express = require('express');
const router = express.Router();

const detailsCtrl = require('../controller/patient_detail');
const Auth = require('../utility/Auth');

router.post('/post', Auth, detailsCtrl.postData);

router.get('/get', Auth, detailsCtrl.getData);

router.delete('/delete/:id', Auth, detailsCtrl.deleteData);

module.exports = router;