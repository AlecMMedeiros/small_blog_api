// const Joi = require('joi');

const { BlogPost, User, Category } = require('../models');

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

module.exports = { getAllposts, getPostById };