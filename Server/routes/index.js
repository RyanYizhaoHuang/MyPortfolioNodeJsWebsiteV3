//modules required for routing
//import express object
let express = require('express');
//create routing machanisim,create the router for my app 
let router = express.Router();
/*
//import mongoose
let mongoose = require('mongoose');
let passport = require('passport');

//define the user Models
let UserModel = require('../Models/users');
let User = UserModel.User; //alias for User


//create the bussinessContent object - represents a document in the bussinessContact collection
let contacts = require('../Models/businessContact');
//let games = require('../Models/games');
*/

//import controller
let indexController = require('../controller/index');
let userController = require('../controller/user');



/* GET home page. */
router.get('/', (req, res, next) => {
  indexController.DisplayHome(req,res);
});

//Get about page
router.get('/about', (req, res, next) => {
  indexController.DisplayAbout(req,res);
});

//Get contact page
router.get('/contact', (req, res, next) => {
  indexController.DisplayContact(req,res);
});

//Get projects page
router.get('/projects', (req, res, next) => {
  indexController.DisplayProject(req,res);
});

//Get services page
router.get('/services', (req, res, next) => {
  indexController.DisplayServices(req,res);
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