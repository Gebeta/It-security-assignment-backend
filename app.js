var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('express-jwt');

const mongoose = require('./config/mongoose');
const { jwt_key,session_key } = require('./config/vars');
const {routes} = require('./config/routes')

mongoose.connect();

var usersRouter = require('./routes/users.route');
var authRouter = require('./routes/auth.route');
var feedbackRouter = require('./routes/feedback.route');
var image = require('./routes/images');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(jwt({ secret: jwt_key, algorithms: ['HS256']})
.unless({path: routes.public}));

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/images', image);

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

module.exports = app;
