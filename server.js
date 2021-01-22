'use strict';

const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

// Setup Host & Port
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(cors());
app.use(BodyParser.json());

const RouteUser = require('./routes/RouteUser');
const RouteAuth = require('./routes/RouteAuth');

// Route
app.get('/', (req, res) => {
    res.send('NodeJs on Docker');
  });
app.use('/user', RouteUser);
app.use('/auth', RouteAuth);

app.listen(PORT, HOST);
console.log("SERVER RUN ON PORT : " + PORT);