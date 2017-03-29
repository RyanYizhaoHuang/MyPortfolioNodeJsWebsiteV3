//create the bussinessContent object - represents a document in the bussinessContact collection
let contacts = require('../Models/businessContact');
//import mongoose
let mongoose = require('mongoose');

//Display businessContact list
module.exports.DisplayContactList = (req,res) => 
{
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
}

//Display BusinessContact
module.exports.DisplayAddContact = (req,res) =>
{
    res.render('contact/details',{
    title:'Add a new Contact',
    contacts:'',
    displayName: req.user ? req.user.displayName : ''
  });
}

//Create new contact
module.exports.CreateContact = (req,res) =>
{
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
}


//Display Edit page
//Find the contact by id and populate the form 
module.exports.DisplayEdit = (req,res) =>
{
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
}

//Save contact
module.exports.UpdateContact = (req,res) =>
{
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
}

//Delete contact
module.exports.DeleteContact = (req,res) =>
{
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
}