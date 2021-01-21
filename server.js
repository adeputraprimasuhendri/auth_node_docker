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

// Route
app.get('/', (req, res) => {
    res.send('NodeJs on Docker');
  });
app.use('/user', RouteUser);

app.listen(PORT, HOST);