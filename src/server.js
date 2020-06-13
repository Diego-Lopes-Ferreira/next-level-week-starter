const express = require('express');
const nunjucks = require('nunjucks');

const cursor = require('./database/db');


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
  cursor.all(`SELECT * FROM places`, function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.render('results.html', { places: rows, total: 0 })//rows.length })
    }
  })
});

server.listen('3000');
