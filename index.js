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
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: "The users information could not be retrieved." }));
});

server.post('/api/users', (req,res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({errorMessage: "Please provide name and bio for the user."});
  } else {
    db.insert(user)
      .then(data => res.status(201).json({...data, ...user}))
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
    .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }));
});

server.put('/api/users/:id', (req,res) => {
  const id = req.params.id;
  const user = req.body;
  db.findById(id)
    .then(foundUser => {
      if(!foundUser) {
        res.status(404).json({message: "The user with the specified ID does not exist."});
      } else {
        if (!user.bio || !user.name) {
          res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        } else {
          db.update(id, user)
          .then(data => res.status(200).json({...foundUser, ...user}))
          .catch(err => res.status(500).json({ error: "The user information could not be modified." }));
        }
      }
    });

});

server.delete('/api/users/:id', (req,res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if(!user) {
        res.status(404).json({message: "The user with the specified ID does not exist."});
      } else {
        db.remove(id)
          .then(data => res.status(200).json({message:"User successfully deleted!"}))
          .catch(err => res.status(500).json({error: "The user could not be removed"}));
      }
    })
});


server.listen(port, () => console.log(`Listening on port ${port}`))