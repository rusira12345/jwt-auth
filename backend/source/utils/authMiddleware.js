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

const verifytoken =(token) =>{
    return jwt.verify(token,secretkey);
}
module.exports = {authenticatetoken,verifytoken}