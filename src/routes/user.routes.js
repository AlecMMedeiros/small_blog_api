const express = require('express');
const { userController, authController } = require('../controllers');

const router = express.Router();

router.get('/', authController.validateAcess, userController.getAllUsers);
router.get('/:id', authController.validateAcess, userController.getUserById);
router.post('/', userController.register);
router.delete('/me', authController.validateAcess, userController.removeMe);

module.exports = router;