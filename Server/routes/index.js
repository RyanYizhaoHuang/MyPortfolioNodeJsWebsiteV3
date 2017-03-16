//modules required for routing
//import express object
let express = require('express');
//create routing machanisim,create the router for my app 
let router = express.Router();
//import mongoose
let mongoose = require('mongoose');
let passport = require('passport');

//define the user Models
let UserModel = require('../Models/users');
let User = UserModel.User; //alias for User


//create the bussinessContent object - represents a document in the bussinessContact collection
let contacts = require('../Models/businessContact');
//let games = require('../Models/games');

//function to check if the user is authenticated
function requireAuth(req,res,next)
{
  //check if the user is login
  if(!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
  next();
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    displayName: req.user ? req.user.displayName : '',
    title: 'Yizhao(Ryan) Huang'
  });
});

//Get about page
router.get('/about', (req, res, next) => {
  res.render('about', { 
    title: 'About Ryan',
    displayName: req.user ? req.user.displayName : ''
  });
});

//Get contact page
router.get('/contact', (req, res, next) => {
  res.render('contact', { 
    title: 'Contact Ryan',
    displayName: req.user ? req.user.displayName : ''
  });
});

//Get projects page
router.get('/projects', (req, res, next) => {
  res.render('projects', { 
    title: "Ryan's Project",
    displayName: req.user ? req.user.displayName : ''
  });
});

//Get services page
router.get('/services', (req, res, next) => {
  res.render('services', { 
    title: "Ryan's Services",
    displayName: req.user ? req.user.displayName : ''
  });
});

//login - redger the login view
router.get('/login',(req,res,next) =>{
  //check to see if the user is not alewady logged in
  if(!req.user)
  {
    //render the login page
    res.render('auth/login',
    {
      title:'Login',
      contacts :'',
      messages : req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  }
  else{
    return res.redirect('/businesscontact'); //redirect to contact list
  }
}); 

// Post /login - process the login page  -- handle the login feature
router.post('/login',passport.authenticate('local',{
  successRedirect :'/businesscontact',
  failureRedirect: '/login',
  failureFlash:true
}));

// get /register - render the 
router.get('/register',(req,res,next)=>{
  //check if the user is not already logged in
  if(!req.user)
  {
    res.render('auth/register',{
      title:'Register',
      contacts :'',
      messages : req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  }
});

//post /register - process the registration view
router.post('/register',(req,res,next)=>{
  User.register(
    new User({
        username:req.body.username,
        //password:req.body.password,
        email:req.body.email,
        displayName:req.body.displayName
      }),
      req.body.password,
      (err) => {
        if(err) { 
          console.log('Error inserting new user');
          if(err.name == 'UserExistsError')
          {
            req.flash('registerMessage','Registration Error: User Already Exists!');
          }
          return  res.render('auth/register',{
                      title:'Register',
                      contacts :'',
                      messages : req.flash('registerMessage'),
                      displayName: req.user ? req.user.displayName : ''
                    });
        }
        //if registration is successful
        return passport.authorize('local')(req,res,()=>{
          res.redirect('/businesscontact');
        });
      });
});

// get /logout - logout the user and redirect to the home page
router.get('/logout',(req,res,next)=>{
  req.logout();
  res.redirect('/'); //redirect to homepage
});

module.exports = router;