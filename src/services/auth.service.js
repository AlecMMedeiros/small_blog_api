const jwtUtil = require('../utils/jwt.util');

const { User } = require('../models');
const { loginError } = require('../utils/errorMap.utils');

const validateLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return loginError.type01;
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const token = jwtUtil.createToken(userWithoutPassword);

  return { code: 200, object: { token } };
};

module.exports = { validateLogin };