const express = require('express');
const { authRoute, userRoute, categoryRoute, postRoute } = require('./index.routes');

const routers = express.Router();

routers.use('/login', authRoute);

routers.use('/user', userRoute);

routers.use('/categories', categoryRoute);

routers.use('/post', postRoute);

module.exports = routers;
