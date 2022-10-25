const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const validate = authService.validateBody(req.body);

  if (validate) return res.status(validate.code).json({ message: validate.message });

  const token = await authService.validateLogin({ email, password });

  return token.code ? res.status(token.code).json({ message: token.message })
   : res.status(200).json({ token });  
};

module.exports = { login };