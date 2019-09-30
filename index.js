const express = require('express'),
      db = require('./data/db');

const server = express();

const port = 5000;
server.listen(port, () => console.log(`Listening on port ${port}`))