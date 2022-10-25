const userService = require('../services/user.service');

const register = async (req, res) => {  
  const validate = userService.validateBody(req.body);

  if (validate) return res.status(validate.code).json({ message: validate.message });

  const token = await userService.validateNewUSer(req.body);

  if (!token.code) {
    userService.createUser(req.body);
    return res.status(201).json({ token });
  }

  return res.status(token.code).json({ message: token.message });
};

module.exports = { register };