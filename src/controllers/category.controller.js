const { categoryService } = require('../services');

const register = async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);

  return res.status(newCategory.code).json(newCategory.object || { message: newCategory.message });
};

const getAllCategories = async (_req, res) => {
  const fetchData = await categoryService.getAllCategories();

  return res.status(fetchData.code).json(fetchData.object);
};

module.exports = { register, getAllCategories };