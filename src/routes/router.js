const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
// const authMiddleware = require('../middlewares/auth.middleware');

const routers = express.Router();

routers.use('/login', authRoute);

routers.use('/user', userRoute);

// routers.use(authMiddleware.validateToken);

module.exports = routers;
