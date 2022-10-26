const postService = require('../services/post.service');

const getAllposts = async (req, res) => {
  const result = await postService.getAllposts();
  return res.status(200).json(result);
};

module.exports = { getAllposts };