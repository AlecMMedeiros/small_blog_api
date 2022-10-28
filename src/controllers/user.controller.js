const { userService } = require('../services');

const register = async (req, res) => {
const newUser = await userService.createUser(req.body);

  return res.status(newUser.code).json(newUser.object);
};

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  return res.status(users.code).json(users.object || { message: users.message });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  return res.status(user.code).json(user.object || { message: user.message }); 
};

const removeMe = async (req, res) => {
  const { authorization } = req.headers;
  const remove = await userService.removeMe(authorization);
  return res.status(remove.code).json(remove.object || { message: remove.message });
};

module.exports = { register, getAllUsers, getUserById, removeMe };