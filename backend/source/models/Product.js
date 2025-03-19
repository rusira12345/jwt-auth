const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    Barcode:{
        type:String,
        required:true,
        unique:true
    },
    ProductName:{
        type:String,
        unique:true,
        required:true
    },
    ProductPrice:{
        type:Number,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    pimage:{
        type:String,
        required:true
    }
})
module.exports= mongoose.model("products",productSchema);
