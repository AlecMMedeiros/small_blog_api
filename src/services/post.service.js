const { Op } = require('sequelize');
const JWT = require('../utils/jwt.util');
const { postError } = require('../utils/errorMap.utils');

const { BlogPost, User, Category, PostCategory, sequelize } = require('../models');

const getAllposts = async () => {
  const fetchPosts = await BlogPost.findAll({
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
  return { code: 200, object: fetchPosts };
};

const getPostById = async (id) => {
  const fetchData = await BlogPost.findByPk(
    id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ] },
  );
  return fetchData === null
    ? postError.type01
    : { code: 200, object: fetchData };
};

const updatePost = async (token, postId, payload) => {
  const { title, content } = payload;

  const transaction = await sequelize.transaction();

  try {
    const { data: { id } } = JWT.decoded(token);
    const { dataValues: { userId } } = await BlogPost.findByPk(postId);
  
    if (id === userId) {
      await BlogPost.update({ title, content }, {
        where: { id: postId },
      });
      const updatedPost = await getPostById(postId);
    
      await transaction.commit();
      return { code: 200, object: updatedPost.object };
    }
    return postError.type02;
  } catch (error) {
    await transaction.rollback();
    throw postError.type04;
  }
};

const newPost = async (token, payload) => {
  const { title, content, categoryIds } = payload;
  
  const { data: { id } } = JWT.decoded(token);
  
  const transaction = await sequelize.transaction();

  try {
    const postRegister = await BlogPost.create({ title, content, userId: id });
    const newPostResume = await BlogPost.findByPk(postRegister.null);
    const getPostId = newPostResume.dataValues.id;
    await Promise.all(categoryIds.map(
      async (categoryId) => PostCategory.create({ postId: getPostId, categoryId }),
    ));
    await transaction.commit();
    return { code: 201, object: newPostResume };
  } catch (_) {
    await transaction.rollback();
    return postError.type03;
  }
};

const remove = async (postId, token) => {
  const transaction = await sequelize.transaction();

  try {
    const { data: { id } } = JWT.decoded(token);
    const { dataValues: { userId } } = await BlogPost.findByPk(postId);

    if (id === userId) {
      await BlogPost.destroy({ where: { id: postId } });
      await transaction.commit();
      return { code: 204, object: '' };
    }

    return postError.type02;
  } catch (_) {
    await transaction.rollback();

    return postError.type01;
  }
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
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });
  return result;
};

module.exports = {
  getAllposts,
  getPostById,
  newPost,
  updatePost,
  remove,
  search,
};