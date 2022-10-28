const { authService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;

  const token = await authService.validateLogin({ email, password });

  return res.status(token.code).json(token.object || { message: token.message });
};

module.exports = { login };
