const express = require('express');
const authRoute = require('./auth.routes');
// const authMiddleware = require('../middlewares/auth.middleware');

const routers = express.Router();

routers.use('/login', authRoute);

// routers.use(authMiddleware.validateToken);

module.exports = routers;
