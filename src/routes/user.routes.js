const express = require('express');
const { userController } = require('../controllers');
const { reqBodyMiddleware, authMiddleware, userMiddleware } = require('../middlewares');

const router = express.Router();

router.get('/:id',
  authMiddleware.validateAccess,
  userController.getUserById);

router.delete('/me',
  authMiddleware.validateAccess,
  userController.removeMe);

router.get('/',
  authMiddleware.validateAccess,
  userController.getAllUsers);

router.post('/',
  reqBodyMiddleware.userBody,
  userMiddleware.validateNewUSer,
  userController.register);

module.exports = router;