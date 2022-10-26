const Joi = require('joi');

const { Category } = require('../models');

const findByName = async (teste) => Category.findAll({
  where: { name: teste },
});

const createCategory = async (params) => { 
  const { name } = params;
  await Category.create({ name });
  const [newCategory] = await Category.findAll({
    where: { name },    
  });
  return newCategory;
};

const validateBody = (params) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': '"name" is required',
    }),
  });

  const { error } = schema.validate(params);

  if (error) return { code: 400, message: error.details[0].message };

  return null;
};

module.exports = { validateBody, createCategory, findByName };