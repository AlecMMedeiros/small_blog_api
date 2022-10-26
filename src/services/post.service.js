const Joi = require('joi');
const { Op } = require('sequelize');
const JWT = require('../utils/jwt.util');

const { BlogPost, User, Category, PostCategory } = require('../models');

const errorMessage = 'Some required fields are missing';

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

const validateCategory = async (id) => {
  const validate = Category.findByPk(id);
  return validate;
};

const updatePost = async (toke, id, payload) => {
  const { title, content } = payload;
  const user = JWT.decoded(toke);
  const postBaseData = await BlogPost.findByPk(id); 
  if (user.data.id === postBaseData.dataValues.userId) {
    await BlogPost.update({ title, content }, {
      where: { id },
    });
    const updatedPost = await getPostById(id);
    return { code: 200, message: updatedPost };
  }
  return { code: 401, message: 'Unauthorized user' };
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

const validateBody = (payload) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      'any.required': errorMessage,
      'string.empty': errorMessage,
    }),
    content: Joi.string().required().messages({
      'any.required': errorMessage,
    }),
    categoryIds: Joi.array().items(Joi.number().required()
      .messages({
        'any.required': 'one or more "categoryIds" not found',
      })).required().messages({ 'any.required': errorMessage }),
  });
  const { error } = schema.validate(payload);
  if (error) return { code: 400, message: error.details[0].message };
  return null;
};

const validateBodyUpdate = (payload) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      'any.required': errorMessage,
      'string.empty': errorMessage,
    }),
    content: Joi.string().required().messages({
      'any.required': errorMessage,
    }),
  });
  const { error } = schema.validate(payload);
  if (error) return { code: 400, message: error.details[0].message };
  return null;
};

const remove = async (id, token) => {
  const user = JWT.decoded(token);
  const postBaseData = await BlogPost.findByPk(id); 
  if (user.data.id === postBaseData.dataValues.userId) {
    await BlogPost.destroy({ where: { id } });
    return { code: 204 };
  }
  return { code: 401, message: 'Unauthorized user' };
};

const search = async (payload) => {
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${payload}%` } },
        { content: { [Op.like]: `%${payload}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });
  console.log(result);
  return result;
};

module.exports = {
  getAllposts,
  getPostById,
  newPost,
  validateBody,
  updatePost,
  validateBodyUpdate,
  remove,
  search,
};