var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//Addition - Purusadi
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Koneksi ke DB
mongoose.connect('mongodb+srv://martial:martial123@cluster0.qxzax.mongodb.net/martial?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

var cookieSession = require('cookie-session');
var passport = require('passport');
var Drugs = require("./model/Drug");
var passportSetup = require('./config/passport-setup');
var keys = require('./config/keys');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//Additional Router
var drugRouter = require('./routes/drugRouter');
var authRouter = require('./routes/authRouter');
var profileRouter = require('./routes/profileRoutes');
var userRouter = require('./routes/userRouter');
var recipeRouter = require('./routes/RecipeRouter');
var transactionRouter = require('./routes/TransactionRouter');



var app = express();

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
//Additional app.use
app.use('/drug', drugRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/users', userRouter);
app.use('/recipe', recipeRouter);
app.use('/transaction', transactionRouter);


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
