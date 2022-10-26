const postService = require('../services/post.service');

const register = async (req, res) => {
  const { authorization } = req.headers;
  const validate = postService.validateBody(req.body);

  if (validate) return res.status(validate.code).json({ message: validate.message });

  const newCategory = await postService.newPost(authorization, req.body);
  console.log(newCategory);

  return newCategory === true ? res.status(400).json({
    message: 'one or more "categoryIds" not found',
  })
    : res.status(201).json(newCategory);
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
module.exports = { getAllposts, getPostById, register };