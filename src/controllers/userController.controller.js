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

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  return user === null ? res.status(404).json({
    message: 'User does not exist',
  }) : res.status(200).json(user); 
};

module.exports = { register, getAllUsers, getUserById };