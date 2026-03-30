const express = require('express');
const axios = require('axios');
const _ = require('lodash');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/user', (req, res) => {
  const id = req.query.id;
  res.send(`User: ${id}`);
});

app.listen(3000);
