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

//define the user Models
let UserModel = require('../Models/users');
let User = UserModel.User; //alias for User

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
//Get business contact page
router.get('/',requireAuth,(req,res,next)=>{

  //find all business contact
  contacts.find((err,contacts) =>{

    if(err)
    {
      return console.error(err);
    }
    else
    {
      console.log("Here is the contacts: %j", contacts );
      res.render('contact/index',{
        title:'Business Contact',
        contacts: contacts,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
});

// Get add page - 
router.get('/add',requireAuth,(req,res,next)=>{
  res.render('contact/details',{
    title:'Add a new Contact',
    contacts:'',
    displayName: req.user ? req.user.displayName : ''
  });
});

// Post add - save new business contact 
router.post('/add',requireAuth,(req,res,next)=>{

  contacts.create({
    name: req.body.name,
    position:req.body.position,
    company: req.body.company,
    address:req.body.address,
    contact:req.body.contact
  },(error,contacts)=> {
    if(error){
      console.log(error);
      res.end(err);
    }
    else
    {
      res.redirect('/businesscontact');
    }
  });
});

// Get edit - show business contact to be edited  
router.get('/:id',requireAuth,(req,res,next)=>{

try {
  
    //get a reference to the id of the contact to edit
    //let mongoose convert id to a HexString, if yes go to next if can not convert go to catech
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
      //find business contact by id
      contacts.findById(id,(err,contacts) =>{

        if(err)
        {
          console.error(err);
          res.end(error);
        }
        else
        {
          console.log("Here is the contacts: %j", contacts );
          res.render('contact/details',{
            title:'Business Contact',
            contacts: contacts,
            displayName: req.user ? req.user.displayName : ''
          });
        }
      });
  } catch (error) {
      console.log(error);
      res.redirect('/errors/404');
}
});


// Post edit - save business contact be edited  
router.post('/:id',requireAuth,(req,res,next)=>{

//get a reference to the id of the contact to edit
let id = req.params.id;
// create a new contact object to hold the changes
let contact = new contacts(
    {
        _id: id,
        name: req.body.name,
        position:req.body.position,
        company: req.body.company,
        address:req.body.address,
        contact:req.body.contact
    }
);

//save contact object
contacts.update({_id:id},contact,(err)=>{

        if(err)
        {
            console.log(err);
            res.end(error);
        }
        else
        {
            //refresh the contact list
            res.redirect('/businesscontact');
        }
    });

});

//delete by id
router.get('/delete/:id',requireAuth,(req,res,next)=>{
  
  //get a reference to the id of the contact
  let id = req.params.id;
  contacts.remove({_id: id}, (err) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/businesscontact');
    }
  });
});

module.exports = router;