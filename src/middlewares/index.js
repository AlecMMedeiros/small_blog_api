const authMiddleware = require('./auth.middleware');
const reqBodyMiddleware = require('./reqBodyValidate.middleware');
const userMiddleware = require('./user.middleware');

module.exports = {
  authMiddleware,
  reqBodyMiddleware,
  userMiddleware,
};
