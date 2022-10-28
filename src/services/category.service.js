const { Category, sequelize } = require('../models');
const { categoryError } = require('../utils/errorMap.utils');

const getAllCategories = async () => {
  const fetchCategories = await Category.findAll();

  return { code: 200, object: fetchCategories };
};

const createCategory = async (payload) => {
  const { name } = payload;

  const transaction = await sequelize.transaction();
  
  try {
    await Category.create({ name });
    const [newCategory] = await Category.findAll({
      where: { name },    
    });
    await transaction.commit();

    return { code: 201, object: newCategory };    
  } catch (error) {
    await transaction.rollback();

    return categoryError.type03;
  }
};

module.exports = { createCategory, getAllCategories };