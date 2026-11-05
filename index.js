const express = require('express');
const axios = require('axios');
const _ = require('lodash');

const app = express();
app.disable("x-powered-by");

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
