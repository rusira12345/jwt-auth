const jwt = require("jsonwebtoken");
const {secretkey}  = require("../configuration/jwtConfig")
const authtransaction = (req,res,next) =>{
    const { TotalPrice,Customer_payment,Balance} = req.body;
    const authHeader = req.header("Authorization");
    if(!authHeader)
        {
            return res.status(401).json({message:"Unauthorized:missing token"});
        }
    const [bearer,token] = authHeader.split(" ");
    if(bearer !=="Bearer" || !token)
        {
            return res.status(401).json({message:"unauthorized:Invalid token format"});
        }
        jwt.verify(token,secretkey,(err,payload)=>{
            if(err)
            {
                return res.status(403).json({message:"Forbidden: Invalid token"});
            }
            else
            {
                const role = payload.role;
                if(role==="Cashier")
                {
                    req.body = {
                        TotalPrice:TotalPrice,
                        Customer_payment:Customer_payment,
                        Balance:Balance
                    }
                    next()  
                }
                else
                {
                    return res.status(404).json({message:"UNAUTHORIZED"});
                }
    }    })
}
module.exports = {authtransaction}