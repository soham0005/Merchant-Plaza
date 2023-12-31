const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    role:{
        type:String,
        default:"user"
    },
    status:{
        type:String,
        default:"active"
    },
    profilePic:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

const User = mongoose.model('users',userSchema);
module.exports = User;