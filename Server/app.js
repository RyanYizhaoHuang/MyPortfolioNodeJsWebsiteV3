let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//modules for authentication
let session = require("express-session");
let passport = require("passport");
let passportlocal = require("passport-local");
let LocalStrategy = passportlocal.Strategy;
let flash = require("connect-flash"); //display errors / login messages


//import "mongoose"
let mongoose = require('mongoose');

//import the config module to get URI
let DBconfig = require('./config/db');

//connect to mongoDB and use the businessContact DB
mongoose.connect(process.env.URI || DBconfig.URI);
/*
mongoose.connect(URL,(err)=> {
  if(err)
  { console.log("Error connecting to the DB");}
  else
  { console.log("Connected to MongoDB");}
});
*/

//create a db object and make a ref to connection
let db = mongoose.connection;
//event handler, listen for a successful connection
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
  console.log("Connected to MongoDB...");
});

let index = require('./routes/index');  //wildcard route
let bussinesscontact = require('./routes/contact.js'); //busniess contact route
let users = require('./routes/users'); //routes for users and auth

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

//setup session
app.use(session({
  secret : "SomeSecret",
  saveUninitialized:true,
  resave: true
}));

//initializa passport and flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//route redirects
app.use('/', index); //top level links
app.use('/businesscontact',bussinesscontact); //businesscontact links - start with /businesscontact
app.use('/users', users); // users link - start with /users

// User Configuration
let UserModel = require('./Models/users');
let User = UserModel.User;

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());  //passport local mongoose
passport.deserializeUser(User.deserializeUser()); 

//Handle 404 errors
app.use(function(req,res){
  res.status(400);
  res.render('errors/404',{
    title: '404: File Not Found',
    displayName: req.user ? req.user.displayName : ''
  });
});

//Handle 500 Errors
//Handle 404 errors
app.use(function(error,req,res,next){
  res.status(500);
  res.render('errors/500',{
    title: '500: Internal Server Error',
    error:error,
    displayName: req.user ? req.user.displayName : ''   
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
