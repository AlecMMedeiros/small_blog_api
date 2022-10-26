const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const categoryRoute = require('./category.routes');
const postRoute = require('./post.routes');

const routers = express.Router();

routers.use('/login', authRoute);

routers.use('/user', userRoute);

routers.use('/categories', categoryRoute);

routers.use('/post', postRoute);

module.exports = routers;
