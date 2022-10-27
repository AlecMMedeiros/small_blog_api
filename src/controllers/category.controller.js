const categoryService = require('../services/category.service');

const register = async (req, res) => {  
  const validateReqBody = categoryService.validateBody(req.body);

  if (validateReqBody) {
 return res.status(validateReqBody.code).json({ message: validateReqBody.message });
}

  const newCategory = await categoryService.createCategory(req.body);

  return res.status(201).json(newCategory);
};

const getAllCategories = async (_req, res) => {
  const fetchData = await categoryService.getAllCategories();

  return res.status(200).json(fetchData);
};

module.exports = { register, getAllCategories };