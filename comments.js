// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();
app.use(bodyParser.json());

// Read list of comments from file
let comments = [];
fs.readFile('comments.json', 'utf8', (err, data) => {
  if (!err) {
    comments = JSON.parse(data);
  }
});

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add new comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
    if (!err) {
      res.json(newComment);
    } else {
      res.status(500).send('Failed to write to file');
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});