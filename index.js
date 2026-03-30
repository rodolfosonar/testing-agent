const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Vulnerable to XSS - unsanitized user input reflected in response
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`<h1>Results for: ${query}</h1>`);
});

// Vulnerable to command injection
app.get('/ping', (req, res) => {
  const host = req.query.host;
  exec(`ping -c 1 ${host}`, (err, stdout) => {
    res.send(stdout);
  });
});

app.listen(3000);
