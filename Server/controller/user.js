//import mongoose
let mongoose = require('mongoose');
let passport = require('passport');
//define the user Models
let UserModel = require('../Models/users');
let User = UserModel.User; //alias for User

//Display user login
module.exports.DisplayLogin = (req,res) =>
{
    //check to see if the user is not alewady logged in
  if(!req.user)
  {
    //render the login page
    res.render('auth/login',
    {
      title:'Login',
      contacts :'',
      messages : req.flash('error'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  }
  else{
    return res.redirect('/businesscontact'); //redirect to contact list
  }
}


//Process to login
module.exports.ProcessLogin = () =>
{
    return passport.authenticate('local',{
    successRedirect :'/businesscontact',
    failureRedirect: '/login',
    failureFlash:true
})
}

//Display registration page
module.exports.DisplayRegistration = (req,res) =>
{
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
}

//Process user register
module.exports.ProcessRegistration = (req,res) =>
{
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
}

//Process logout
module.exports.ProcessLogout = (req,res) =>
{
    req.logout();
    res.redirect('/'); //redirect to homepage
}


//RequireAuth,function to check if the user is authenticated
module.exports.RequireAuth = (req,res,next) => 
{

  //check if the user is login
  if(!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
  next();
}