const express = require('express');
const { categoryController, authController } = require('../controllers');

const router = express.Router();

router.post('/', authController.validateAcess, categoryController.register);

module.exports = router;