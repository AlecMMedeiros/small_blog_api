const express = require('express');
const routers = require('./routes/router');

const app = express();

app.use(express.json());

app.use(routers);

module.exports = app;
