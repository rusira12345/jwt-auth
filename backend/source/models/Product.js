const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    Barcode:{
        type:String,
        required:true
    },
    ProductName:{
        type:String,
        required:true
    },
    ProductPrice:{
        type:Number,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    }
})
module.exports= mongoose.model("products",productSchema);
