//BusinessContact table schema
//adding the mongoose module
let mongoose = require('mongoose');

//create a model class
let businessContactSchema = mongoose.Schema(
    {
        name:String,
        position:String,
        company:String,
        address:String,
        contact:String
    },
    {
        collection:"contacts"
    }
);

module.exports = mongoose.model('contacts',businessContactSchema);
/*
//connect to mongoDB and use the businessContact DB
mongoose.connect("mongodb://localhost/businessContact",(err)=> {
  if(err)
  { console.log("Error connecting to the DB");}
  else
  { console.log("Connected to MongoDB");}
});
*/