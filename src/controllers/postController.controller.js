const postService = require('../services/post.service');

const register = async (req, res) => {
  const { authorization } = req.headers;
  const validate = postService.validateBody(req.body);
  if (validate) return res.status(validate.code).json({ message: validate.message });
  const newCategory = await postService.newPost(authorization, req.body);
  return newCategory === true ? res.status(400).json({
    message: 'one or more "categoryIds" not found',
  })
    : res.status(201).json(newCategory);
};

const updatePost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const validate = postService.validateBodyUpdate(req.body);
  if (validate) return res.status(validate.code).json({ message: validate.message });
  const runUpdate = await postService.updatePost(authorization, id, req.body);

  return runUpdate.code === 200 ? res.status(runUpdate.code).json(runUpdate.message)
  : res.status(runUpdate.code).json({ message: runUpdate.message });
};

const deletePost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const postExists = await postService.getPostById(id);
  if (postExists === null) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  const removePost = await postService.remove(id, authorization);

  return removePost.code === 204 ? res.status(removePost.code).json()
  : res.status(removePost.code).json({ message: removePost.message });
};

const getAllposts = async (req, res) => {
  const result = await postService.getAllposts();
  return res.status(200).json(result);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);

  return post === null ? res.status(404).json({
    message: 'Post does not exist',
  }) : res.status(200).json(post);
};
module.exports = { getAllposts, getPostById, register, updatePost, deletePost };