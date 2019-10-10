const express = require('express');
const hbs = require('hbs');

var app = express();
var regimesRouter = require('./routes/regimes');

/// Stuff below is tentative.
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regimesRouter = require('./routes/regimes');

var app = express();
///

/// View Engine Setup. Tentative
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/regimes', regimesRouter);

app.use(function(req, res, next) {
  next(createError(404));
});
///

/// Error Handling. Tentative.
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
///

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));
hbs.registerPartials(__dirname + '/views/partials');


app.use('/regimes', productsRouter);

app.get('/', (request, response) => {
	response.render('market.hbs')
});

app.get('/account', (request, response) => {
	response.render('account.hbs')
});

app.get('/sellerPage', (request, response) => {
	response.render('sellerPage.hbs')
});

app.get('/sellerRegister', (request, response) => {
	response.render('sellerRegister.hbs')
});

app.listen(3000, () => {
	console.log('Server is up on the port 3000');
});

