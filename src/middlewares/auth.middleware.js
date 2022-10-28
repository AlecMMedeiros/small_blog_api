const { loginError } = require('../utils/errorMap.utils');
const jwtUtil = require('../utils/jwt.util');

const validateAccess = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
 return res.status(loginError.type02.code).json({ message: loginError.type02.message }); 
}

  const user = jwtUtil.validateToken(authorization);

  if (user.code) return res.status(user.code).json({ message: user.message });

  next();
};

module.exports = { validateAccess };