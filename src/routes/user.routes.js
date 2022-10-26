const express = require('express');
const { userController, authController } = require('../controllers');

const router = express.Router();

router.get('/', authController.validateAcess, userController.getAllUsers);
router.post('/', userController.register);

module.exports = router;