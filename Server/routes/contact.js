//modules requires for routing
//import express object
let express = require('express');
//create routing machanisim,create the router for my app 
let router = express.Router();
//import mongoose
let mongoose = require('mongoose');
let passport = require('passport');

//create the bussinessContent object - represents a document in the bussinessContact collection
let contacts = require('../Models/businessContact');

//import userController for authentication
let userController = require('../controller/user');
//import contactController
let contactController = require('../controller/businesscontact');

//define the user Models
let UserModel = require('../Models/users');
let User = UserModel.User; //alias for User

//function to check if the user is authenticated
/* Move to userController
function requireAuth(req,res,next)
{
  //check if the user is login
  if(!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
  next();
}
*/

//Get business contact page
router.get('/',userController.RequireAuth,(req,res,next)=>{

  contactController.DisplayContactList(req,res);
  
});

// Get add page - 
router.get('/add',userController.RequireAuth,(req,res,next)=>{
  
  contactController.DisplayAddContact(req,res);

});

// Post add - save new business contact 
router.post('/add',userController.RequireAuth,(req,res,next)=>{
    contactController.CreateContact(req,res);
  
});

// Get edit - show business contact to be edited  
router.get('/:id',userController.RequireAuth,(req,res,next)=>{
  contactController.DisplayEdit(req,res);
  // Post edit - save business contact be edited 
}).post('/:id',userController.RequireAuth,(req,res,next)=>{
contactController.UpdateContact(req,res);

});

//delete by id
router.get('/delete/:id',userController.RequireAuth,(req,res,next)=>{
  contactController.DeleteContact(req,res); 
});

module.exports = router;