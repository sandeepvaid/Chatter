//import mongoose
const mongoose = require('mongoose');
//Create db schema

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
       
    },
    password:{
        type:String,
        required:true,
       
    },
    name:{
        type:String,
        require:true
    }
},{
    timestamps:true
});

const User = mongoose.model('User' , userSchema);
module.exports = User;