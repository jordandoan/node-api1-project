const express = require('express'),
      db = require('./data/db');

const server = express();

const port = 5000;

server.get('/', (req,res) => {
  res.send("Hey! You're on the / route.");
})

server.get('/api/users', (req,res) => {
  db.find()
    .then(users => res.status(200).json(users));
});

server.post('/api/users', (req,res) => {
  console.log(req.body);
  res.send("hi");
});

server.get('/api/users/:id', (req,res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({message: "The user with the specified ID does not exist."});
      }
    });
});

server.put('/api/users/:id', (req,res) => {
  res.send("hi");
});

server.delete('/api/users/:id', (req,res) => {
  res.send("hi");
});


server.listen(port, () => console.log(`Listening on port ${port}`))