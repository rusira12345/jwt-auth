const jwt = require("jsonwebtoken")
const {secretkey} = require("../configuration/jwtConfig")
const authaddProducts = (req,res,next) =>{
         const {Barcode,ProductName, ProductPrice,Quantity,pimage}= req.body;
        const tokenkey = req.header("Authorization");
         if(!Barcode || !ProductName || ! ProductPrice || !Quantity)
         {
            return res.status(400).json({message:"The input section is missing"});
         }
         if(!tokenkey)
         {
            return res.status(401).json({message:"Unauthorized. missing token"})
         }
         const [bearer,token] =  tokenkey.split(" ");
         if(bearer!=="Bearer" || !token)
         {
            return res.status(401).json({message:"unauthorized:Invalid token format"})
         }
         jwt.verify(token,secretkey,(err,payload)=>{
            if(err)
            {
                return res.status(403).json({message:"Forbidden: Invalid token"});
            }
            else{
                const role = payload.role;
                if(role==="Manager")
                {
                        req.body = {
                            Barcode:Barcode,
                            ProductName:ProductName,
                            ProductPrice:ProductPrice,
                            Quantity:Quantity,
                            pimage:pimage
                        }
                        next();
                }
            }
         })
}
const authsearchproduct = (req,res,next) =>{
      const {Barcode} = req.body;
      const tokenkey = req.header("Authorization");
      if(!tokenkey)
      {
         return res.status(401).json({message:"Unauthorized. missing token"})
      }
      const [bearer,token] =  tokenkey.split(" ");
      if(bearer!=="Bearer" || !token)
         {
            return res.status(401).json({message:"unauthorized:Invalid token format"})
         }
      jwt.verify(token,secretkey,(err,payload)=>{
         if(err)
         {
            return res.status(403).json({message:"Forbidden: Invalid token"});
         }
         else{
            const role = payload.role;
            if(role==="Cashier")
            {
               req.body = {
                  Barcode:Barcode
               }
               next();
            }
         }
      })

}
module.exports = {authaddProducts,authsearchproduct}