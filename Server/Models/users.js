//user module
let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new Schema({

    username:{
        type:String,
        default: '',
        trim:true,
        required:'username is required'
    },
    //password can be ignore
    /*
        passport:{
        type:String,
        default: '',
        trim:true,
        required:'Passport is required'
    },*/
        email:{
        type:String,
        default: '',
        trim:true,
        required:'Email is required'
    },
        displayName:{
        type:String,
        default: '',
        trim:true,
        required:'Display is required'
    },
        created:{
        type:Date,
        default: Date.now
    },
        updated:{
        type:Date,
        default: Date.now
    },
},
{
    collection: "users"    
})

//what options I can add
let options = ({missingPasswordError:"Wrong Password"});

UserSchema.plugin(passportLocalMongoose,options);

exports.User = mongoose.model('User',UserSchema);