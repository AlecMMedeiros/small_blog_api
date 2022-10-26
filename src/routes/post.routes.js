const express = require('express');
const { postController, authController } = require('../controllers');

const router = express.Router();

router.post('/', authController.validateAcess, postController.register);
router.get('/', authController.validateAcess, postController.getAllposts);
router.get('/:id', authController.validateAcess, postController.getPostById);

module.exports = router;