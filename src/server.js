const express = require('express');
const nunjucks = require('nunjucks');


const server = express();
server.use(express.static('public'))
nunjucks.configure('src/views', {express: server, noCache: true});

//Routes
server.get('/', (req, res) => {
  res.render('index.html')
});
server.get('/create', (req, res) => {
  res.render('create.html')
});
server.get('/results', (req, res) => {
  res.render('results.html')
});

server.listen('3000');
