const Joi = require('joi');
const jwtUtil = require('../utils/jwt.util');

const { User } = require('../models');

const validateBody = (params) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(params);

  if (error) return { code: 400, message: 'Some required fields are missing' };

  return null;
};

const validateLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { code: 400, message: 'Invalid fields' };
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const token = jwtUtil.createToken(userWithoutPassword);

  return token;
};

const validateToken = (token) => {
  if (!token) return { code: 401, message: 'Token not found' };

  const user = jwtUtil.validateToken(token);

  return user;
};

module.exports = { validateBody, validateLogin, validateToken };