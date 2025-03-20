const {addProduct,productSearch,updateproductbycashier} = require("../services/productServices")
const addProducts = async(req,res)=>{
    const details = req.body;
    try{
            await addProduct(details);
            return res.status(201).json({message:"Product create successfully"});
    }catch(error)
    {
        return res.status(400).json({message:error.message});
    }
}
const searchproductsss = async(req,res) =>{
    const Barcode = req.body;
    try{
        const product = await productSearch(Barcode);
        return res.status(200).json(product)
    }catch(error)
    {
        return res.status(400).json({message:error.message});
    }
}
const updateproductbycashiers = async(req,res) =>{
    const items =req.body;
    try{
            await updateproductbycashier(items);
            return res.status(200).json({message:"Updated successfully"});
    }catch(error)
    {
        return res.status(400).json({message:error.message});
    }
}
module.exports = {addProducts,searchproductsss,updateproductbycashiers}