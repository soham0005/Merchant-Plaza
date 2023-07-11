const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    images:{
        type: Array,
        default:[],
        required:true,
    },
    billAvailable:{
        type:Boolean,
        required:true,
        default:false
    },
    warrantyAvailable:{
        type:Boolean,
        default:false,
        required:true
    },
    accessoriesAvailable:{
        type:Boolean,
        default:false,
        required:true,
    },
    boxAvailable:{
        type:Boolean,
        default:false,
        required:true,
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        required:true,
        default:"pending",
    },


},{timestamps:true})

module.exports = mongoose.model("products",productSchema);