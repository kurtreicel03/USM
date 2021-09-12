const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// PARSER MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SERVING STATIC FILES
app.use(express.static('public'));

// SETTING TEMPLATE
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views/partials'),
  })
);
app.set('view engine', 'hbs');

const userRoutes = require('./routes/user');

app.use('/', userRoutes);

module.exports = app;
