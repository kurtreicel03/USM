const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const app = express();

// PARSER MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SERVING STATIC FILES
app.use(express.static('public'));

// SETTING TEMPLATE
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;
