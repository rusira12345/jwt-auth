const mongoose = require("mongoose");
const transaction = new mongoose.Schema({
    TotalPrice:{
        type:Number,
        Required:true
    },
    Customer_payment:{
        type:Number,
        Required:true
    },
    Balance:{
        type:Number,
        Required:true
    },
    Transaction_time:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model("transaction",transaction);