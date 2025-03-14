const jwt  = require("jsonwebtoken");
const {secretkey} = require("../configuration/jwtConfig");
const authenticatetoken = (req,res,next) =>{
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
        req.user = payload;
        next();
    })
}
const authenticateverifyotpbytoken = (req,res,next) =>{
    const authHeader = req.header("Authorization");
    const {otp} = req.body;
    if(!authHeader)
    {
        return res.status(401).json({message:"Unauthorized:missing token"});
    }
    if(otp==='')
    {
        return res.status(401).json({message:"unauthorized:you must enter the otp"})
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
            req.body = {
                otp:otp,
                email:payload.email
            };
            next();
        })
}
const authenticatetokens = (req,res,next) =>{
    const {password} = req.body;
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
        req.body = {
            password:password,
            email:payload.email
        };
        next();
    })
}
const verifytoken =(token) =>{
    return jwt.verify(token,secretkey);
}
module.exports = {authenticatetoken,verifytoken,authenticateverifyotpbytoken,authenticatetokens}