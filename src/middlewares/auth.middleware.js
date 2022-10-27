const authService = require('../services/auth.service');

const validateAccess = async (req, res, next) => {
    const { authorization } = req.headers;
    const result = await authService.validateToken(authorization);
    if (result.code) return res.status(result.code).json({ message: result.message }); 
  
    next();
  };

module.exports = { validateAccess };