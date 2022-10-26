const express = require('express');
const { postController, authController } = require('../controllers');

const router = express.Router();

router.get('/', authController.validateAcess, postController.getAllposts);

module.exports = router;