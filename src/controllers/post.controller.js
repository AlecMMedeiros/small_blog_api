const postService = require('../services/post.service');

const register = async (req, res) => {
  const { authorization } = req.headers;

  const newPost = await postService.newPost(authorization, req.body);

  return res.status(newPost.code).json(newPost.object || { message: newPost.message });
};

const updatePost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const runUpdate = await postService.updatePost(authorization, id, req.body);

  return res.status(runUpdate.code).json(runUpdate.object || { message: runUpdate.message });
};

const deletePost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const removePost = await postService.remove(id, authorization);

  return res.status(removePost.code).json(removePost.object || { message: removePost.message });
};

const getAllposts = async (_req, res) => {
  const fetchPosts = await postService.getAllposts();

  return res.status(fetchPosts.code).json(fetchPosts.object);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const fetchpost = await postService.getPostById(id);

  return res.status(fetchpost.code).json(fetchpost.object || { message: fetchpost.message });
};

const searchPost = async (req, res) => {
  const { q } = req.query;

  const fetchData = await postService.search(q);

  return res.status(200).json(fetchData);
};

module.exports = { getAllposts, getPostById, register, updatePost, deletePost, searchPost };