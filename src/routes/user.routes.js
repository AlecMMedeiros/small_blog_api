const express = require('express');
const { userController } = require('../controllers');
const { validateAccess } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/:id', validateAccess, userController.getUserById);

router.delete('/me', validateAccess, userController.removeMe);
 
router.get('/', validateAccess, userController.getAllUsers);
router.post('/', userController.register);

module.exports = router;