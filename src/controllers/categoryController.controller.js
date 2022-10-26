const categoryService = require('../services/category.service');

const register = async (req, res) => {  
  const validate = categoryService.validateBody(req.body);

  if (validate) return res.status(validate.code).json({ message: validate.message });

  const newCategory = await categoryService.createCategory(req.body);

  return res.status(201).json(newCategory);
};

module.exports = { register };