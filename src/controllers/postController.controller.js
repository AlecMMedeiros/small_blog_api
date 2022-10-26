const postService = require('../services/post.service');

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
module.exports = { getAllposts, getPostById };