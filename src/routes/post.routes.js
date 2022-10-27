const express = require('express');
const { postController } = require('../controllers');
const { reqBodyMiddleware, authMiddleware } = require('../middlewares');

const router = express.Router();

router.get('/search',
    authMiddleware.validateAccess,
    postController.searchPost);

router.get('/:id',
    authMiddleware.validateAccess,
    postController.getPostById);

router.put('/:id',
    authMiddleware.validateAccess,
    reqBodyMiddleware.updatePostBody,
    postController.updatePost);

router.delete('/:id',
    authMiddleware.validateAccess,
    postController.deletePost);

router.get('/',
    authMiddleware.validateAccess,
    postController.getAllposts);
router.post('/',
    authMiddleware.validateAccess,
    reqBodyMiddleware.newPostBody,
    postController.register);

module.exports = router;