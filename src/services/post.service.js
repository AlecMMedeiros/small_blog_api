const Joi = require('joi');
const JWT = require('../utils/jwt.util');

const { BlogPost, User, Category, PostCategory } = require('../models');

const validateCategory = async (id) => {
  const validate = Category.findByPk(id);
  return validate;
};

const newPost = async (toke, payload) => {
  const user = JWT.decoded(toke);
  const { title, content, categoryIds } = payload;
  const validateCategories = await Promise.all(categoryIds.map(
    async (categoryId) => validateCategory(categoryId),
  ));
  const getValidateResult = validateCategories.some((ele) => ele === null);
  if (getValidateResult === false) {
    const postRegister = await BlogPost.create({ title, content, userId: user.data.id });
    const newPostResume = await BlogPost.findByPk(postRegister.null);
    const getPostId = newPostResume.dataValues.id;
    await Promise.all(categoryIds.map(
      async (categoryId) => PostCategory.create({ postId: getPostId, categoryId }),
    ));
    return newPostResume;
  }
  return true;
};

const getAllposts = async () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
      through: { attributes: [] },
    },
  ],
});

const getPostById = async (id) => BlogPost.findByPk(
  id, {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    {
      model: Category,
      as: 'categories',
      attributes: ['id', 'name'],
      through: { attributes: [] },
    },
  ],
},
);

const validateBody = (payload) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
    content: Joi.string().required().messages({
      'any.required': 'Some required fields are missing',
    }),
    categoryIds: Joi.array().items(Joi.number().required()
      .messages({
        'any.required': 'one or more "categoryIds" not found',
      })).required().messages({ 'any.required': 'Some required fields are missing' }),
  });

  const { error } = schema.validate(payload);

  if (error) return { code: 400, message: error.details[0].message };

  return null;
};

module.exports = { getAllposts, getPostById, newPost, validateBody };