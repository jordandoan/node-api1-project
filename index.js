const express = require('express'),
      db = require('./data/db');

const server = express();

const port = 5000;

server.get('/', (req,res) => {
  res.send("Hey! You're on the / route.");
})

server.get('/api/users', (req,res) => {
  res.send("hi");
});

server.post('/api/users', (req,res) => {
  res.send("hi");
});

server.get('/api/users/:id', (req,res) => {
  res.send("hi");
});

server.put('/api/users/:id', (req,res) => {
  res.send("hi");
});

server.delete('/api/users/:id', (req,res) => {
  res.send("hi");
});


server.listen(port, () => console.log(`Listening on port ${port}`))