const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');

const routers = express.Router();

routers.use('/login', authRoute);

routers.use('/user', userRoute);

module.exports = routers;
