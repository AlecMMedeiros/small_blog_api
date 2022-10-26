const express = require('express');
const { categoryController, authController } = require('../controllers');

const router = express.Router();

router.post('/', authController.validateAcess, categoryController.register);
router.get('/', authController.validateAcess, categoryController.getAllCategories);

module.exports = router;