var express = require('express');
var PouchDB = require('pouchdb');
var pug = require('pug')
var app = express();
app.listen(3000)
app.set('view engine', 'pug')


app.get('/', function (req, res) {
  res.render('index.html', { title: 'Welcome to the Scheet'})
})

app.use(express.static('views'));

// app.use('/scripts', express.static(__dirname + '/node_modules/'));