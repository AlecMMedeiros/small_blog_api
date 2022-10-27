const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const validateReqBody = authService.validateBody(req.body);

  if (validateReqBody) {
 return res.status(validateReqBody.code).json({ message: validateReqBody.message }); 
}
  const token = await authService.validateLogin({ email, password });

  return token.code ? res.status(token.code).json({ message: token.message })
   : res.status(200).json({ token });  
};

module.exports = { login };
