const Joi = require('joi');
const jwtUtil = require('../utils/jwt.util');

const { User } = require('../models');

const createUser = async (params) => {
  const { displayName, email, password, image } = params;
  User.create({ displayName, email, password, image });
};

const getAllUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserById = async (id) => User.findByPk(id, { attributes: { exclude: ['password'] } });

const validateBody = (params) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'string.min': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
  });

  const { error } = schema.validate(params);

  if (error) return { code: 400, message: error.details[0].message };

  return null;
};

const validateNewUSer = async (params) => {
  const { email } = params;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return { code: 409, message: 'User already registered' };
  }

  const { password: _, ...userWithoutPassword } = params;

  const token = jwtUtil.createToken(userWithoutPassword);

  return token;
};

module.exports = { validateBody, validateNewUSer, createUser, getAllUsers, getUserById };