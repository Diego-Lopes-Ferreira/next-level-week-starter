const express = require('express');
const server = express();

server.listen('3000');
server.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/')
});
