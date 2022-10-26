const categoryService = require('../services/category.service');

const register = async (req, res) => {  
  const validate = categoryService.validateBody(req.body);

  if (validate) return res.status(validate.code).json({ message: validate.message });

  const newCategory = await categoryService.createCategory(req.body);

  return res.status(201).json(newCategory);
};

const getAllCategories = async (req, res) => {
  const result = await categoryService.getAllCategories();
  return res.status(200).json(result);
};

module.exports = { register, getAllCategories };