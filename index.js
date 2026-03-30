const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// XSS: unsanitized user input reflected in HTML response
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.contentType('text/plain').send(`<h1>Results for: ${query}</h1>`);
});

// Command injection: user input passed directly to exec
app.get('/ping', (req, res) => {
  const host = req.query.host;
  execFile('ping', ['-c', '1', host], (err, stdout) => {
    res.send(stdout);
  });
});

// SQL injection: string concatenation in query
app.get('/user', (req, res) => {
  const id = req.query.id;
  const query = "SELECT * FROM users WHERE id = '" + id + "'";
  res.send(query);
});

app.listen(3000);
