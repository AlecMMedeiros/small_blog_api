const { User } = require('../models');
const { userError } = require('../utils/errorMap.utils');

const validateNewUSer = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return res.status(userError.type02.code).json({ message: userError.type02.message });
  }

 next();
};

module.exports = {
  validateNewUSer,
};
