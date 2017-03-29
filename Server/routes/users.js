//modules required for routing
//import express object
let express = require('express');
//create routing machanisim,create the router for my app 
let router = express.Router();

userController = require('../controller/user');


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

//login - redger the login view 
router.get('/login',(req,res,next) =>{
  userController.DisplayLogin(req,res);
  // Post /login - process the login page  -- handle the login feature
}).post('/login', userController.ProcessLogin());

// get /register - render the 
router.get('/register',(req,res,next)=>{
  userController.DisplayRegistration(req,res);
  //post /register - process the registration view
}).post('/register',(req,res,next)=>{
  userController.ProcessRegistration(req,res);
});

// get /logout - logout the user and redirect to the home page
router.get('/logout',(req,res,next)=>{
  userController.ProcessLogout(req,res);
});

module.exports = router;
