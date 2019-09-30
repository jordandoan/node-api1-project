const express = require('express'),
      db = require('./data/db');

const server = express();

const port = 5000;

server.use(express.json());

server.get('/', (req,res) => {
  res.send("Hey! You're on the / route.");
})

server.get('/api/users', (req,res) => {
  db.find()
    .then(users => res.status(200).json(users));
});

server.post('/api/users', (req,res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({errorMessage: "Please provide name and bio for the user."});
  } else {
    db.insert(user)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(500).json({ error: "There was an error while saving the user to the database"}));
  }
});

server.get('/api/users/:id', (req,res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({message: "The user with the specified ID does not exist."});
      }
    })
    .catch(err => res.send(err));
});

server.put('/api/users/:id', (req,res) => {
  res.send("hi");
});

server.delete('/api/users/:id', (req,res) => {
  res.send("hi");
});


server.listen(port, () => console.log(`Listening on port ${port}`))