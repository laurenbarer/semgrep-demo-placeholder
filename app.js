const express = require('express');
const app = express();

// Intentional SQL injection vulnerability for demo
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  // BAD: Direct string interpolation in SQL query
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  return res.json({ query: query });
});

// Intentional XSS vulnerability for demo
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  // BAD: User input directly rendered without sanitization
  return res.send(`<h1>Search results for: ${searchTerm}</h1>`);
});

// Intentional hardcoded secret for demo
const API_KEY = 'sk_live_1234567890abcdef';
app.get('/api/data', (req, res) => {
  return res.json({ apiKey: API_KEY });
});

// Intentional command injection vulnerability for demo
const { exec } = require('child_process');
app.get('/ping/:host', (req, res) => {
  const host = req.params.host;
  // BAD: User input directly used in command
  exec(`ping -c 4 ${host}`, (error, stdout) => {
    return res.send(stdout);
  });
});

// Intentional weak cryptography for demo
const crypto = require('crypto');
app.post('/hash', (req, res) => {
  const password = req.body.password;
  // BAD: Using MD5 which is cryptographically broken
  const hash = crypto.createHash('md5').update(password).digest('hex');
  return res.json({ hash: hash });
});

app.listen(3000, () => {
  console.log('Demo app running on port 3000');
});
