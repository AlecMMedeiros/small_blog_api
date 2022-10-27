const express = require('express');
const { postController } = require('../controllers');
const { validateAccess } = require('../middlewares/auth.middleware');
const { newPostBody, updatePostBody } = require('../middlewares/reqBodyValidate.middleware');

const router = express.Router();

router.get('/search', validateAccess, postController.searchPost);

router.get('/:id', validateAccess, postController.getPostById);
router.put('/:id', validateAccess, updatePostBody, postController.updatePost);
router.delete('/:id', validateAccess, postController.deletePost);

router.get('/', validateAccess, postController.getAllposts);
router.post('/', validateAccess, newPostBody, postController.register);

module.exports = router;