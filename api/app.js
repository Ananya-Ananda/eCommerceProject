require("dotenv").config(); 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
app.use(express.static(path.join(__dirname, '../frontend/build')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shoppingCartRouter = require('./routes/shoppingCart');
var itemRouter = require('./routes/item');
var booksRouter = require('./routes/books');
var bookPageRouter = require('./routes/bookPage');
var checkoutRouter = require('./routes/checkout');
var firebaseRouter = require('./routes/firebase');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
 });
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shoppingCart', shoppingCartRouter);
app.use('/item', itemRouter);
app.use('/books', booksRouter);
app.use('/bookPage', bookPageRouter);
app.use('/checkout', checkoutRouter);
app.use('/firebase', firebaseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.get('/', (req, res) => {
//   res.send('welcome to a simple HTTP cookie server');
//   console.log('hi')
// });

// app.listen(8000, () => console.log('The server is running port 8000...'));

module.exports = app;
