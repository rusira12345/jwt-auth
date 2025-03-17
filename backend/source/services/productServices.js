const product = require("../models/Product")
const addProduct = async(details) =>{
         const {Barcode,ProductName, ProductPrice,Quantity}= details;
        const products = new product({
                Barcode,ProductName,ProductPrice,Quantity
            })         
        await products.save();
        
}
const productSearch  = async(details)=>{
    const {Barcode} = details;
    if(!Barcode)
    {
        throw new Error("you must include barcode");
    }
    const products = await product.findOne({Barcode})
    return products
}
module.exports = {addProduct,productSearch}