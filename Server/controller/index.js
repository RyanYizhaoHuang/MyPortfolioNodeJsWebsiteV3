/* Already import in the route page
//modules required for routing
//import express object
let express = require('express');
//create routing machanisim,create the router for my app 
let router = express.Router();
//import mongoose
let mongoose = require('mongoose');
let passport = require('passport');
*/

//Display home page
module.exports.DisplayHome = (req,res) => 
{
    res.render('index', { 
    displayName: req.user ? req.user.displayName : '',
    title: 'Yizhao(Ryan) Huang',
    contacts :''
  });
}

//Display contact 
module.exports.DisplayContact = (req,res) =>
{
    res.render('contact', { 
    title: 'Contact Ryan',
    displayName: req.user ? req.user.displayName : '',
    contacts :''
  });
}

//Display about page
module.exports.DisplayAbout = (req,res) => 
{
    res.render('about', { 
    title: 'About Ryan',
    displayName: req.user ? req.user.displayName : '',
    contacts :''
  });
}


//Display project page
module.exports.DisplayProject = (req,res) =>
{
    res.render('projects', { 
    title: "Ryan's Project",
    displayName: req.user ? req.user.displayName : '',
    contacts :''
  });
}


//Display services page
module.exports.DisplayServices = (req,res) =>
{
    res.render('services', { 
    title: "Ryan's Services",
    displayName: req.user ? req.user.displayName : '',
    contacts :''
  });
}


//Display projects detail page
module.exports.DisplayProjectDetail = (req,res) =>
{
  res.render('projects/detail',{
    title: "Ryan's Project",
    displayName: req.user ? req.user.displayName : ''
  });
}