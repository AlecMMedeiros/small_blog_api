const express = require('express');
const { authController } = require('../controllers');
const { reqBodyMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/',
 reqBodyMiddleware.loginBody,
  authController.login);

module.exports = router;