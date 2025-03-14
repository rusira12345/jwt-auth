const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["Owner","Cashier","Manager"],
        default:"Cashier"
    },
    otp:{
        type:String,
        default:''
    },
    otpExpiretime:{
        type:Number,
        default:0
    }
})
module.exports = mongoose.model("User",userSchema);