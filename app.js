const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

require('./models/Users');
require('./models/Articles')
require('./config/passport');
app.use(require('./routes'));

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb://localhost/passport-tutorial',{ useNewUrlParser: true });
mongoose.set('debug', true);

//Error handlers & middlewares
/*
if(!isProduction) {
  app.use(function(err, req, res)  {
    req.status(err.status || 500);

    req.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use(function(err, req, res)  {
  req.status(err.status || 500);

  req.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

*/

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));
