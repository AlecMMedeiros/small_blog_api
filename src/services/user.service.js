const jwtUtil = require('../utils/jwt.util');
const { User, sequelize } = require('../models');
const { userError } = require('../utils/errorMap.utils');

const createUser = async (payload) => {
  const { displayName, email, password, image } = payload;
  const { password: _, ...userWithoutPassword } = payload;

  const transaction = await sequelize.transaction();

  try {
    const token = jwtUtil.createToken(userWithoutPassword);

    await User.create({ displayName, email, password, image });
    await transaction.commit(); 

    return { code: 201, object: { token } };
  } catch (error) {
    await transaction.rollback();

    throw userError.type04;
  }
};

const getAllUsers = async () => {
  const fetchUsers = await User.findAll({ attributes: { exclude: ['password'] } });

  return { code: 200, object: fetchUsers };
}; 

const getUserById = async (id) => {
  const fetchUser = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (fetchUser === null) return userError.type01;

  return { code: 200, object: fetchUser };
};

const removeMe = async (token) => {
  const transaction = await sequelize.transaction();
  try {
    const { data: { id } } = jwtUtil.decoded(token);
    await User.destroy({ where: { id } });
    await transaction.commit();
    return { code: 204 };    
  } catch (error) {
    await transaction.rollback();
    return userError.type04;
  }
};

module.exports = { createUser, getAllUsers, getUserById, removeMe };