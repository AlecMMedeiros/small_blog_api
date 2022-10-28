const express = require('express');
const { categoryController } = require('../controllers');
const { authMiddleware, reqBodyMiddleware } = require('../middlewares');

const router = express.Router();

router.get('/',
  authMiddleware.validateAccess,
  categoryController.getAllCategories);

router.post('/',
  authMiddleware.validateAccess,
  reqBodyMiddleware.categoryBody,
  categoryController.register);

module.exports = router;