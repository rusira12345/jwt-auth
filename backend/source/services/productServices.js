const product = require("../models/Product")
const addProduct = async(details) =>{
         const {Barcode,ProductName, ProductPrice,Quantity,pimage}= details;
        const products = new product({
                Barcode,ProductName,ProductPrice,Quantity,pimage
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
const updateproductbycashier = async(item) =>{
        const {items}=item
        if(!items)
        {
            throw new Error("No products");
        }
        else{
            for(let i=0;i<items.length;i++)
            {
                const productname = items[i].productname;
                const quantity = items[i].quantity;
                const existproduct = await product.findOne({ProductName:productname})
                if(!existproduct)
                {
                    throw new Error("The product is not in the inventory");
                }
                else
                {
                    existproduct.Quantity=existproduct.Quantity- parseInt(quantity);
                    await existproduct.save()
                } 
            }
        }
}
module.exports = {addProduct,productSearch,updateproductbycashier}