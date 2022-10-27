const express = require('express');
const { categoryController } = require('../controllers');
const { validateAccess } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', validateAccess, categoryController.getAllCategories);
router.post('/', validateAccess, categoryController.register);

module.exports = router;