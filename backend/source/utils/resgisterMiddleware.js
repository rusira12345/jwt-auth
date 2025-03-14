const jwt = require("jsonwebtoken");
const {secretkey} = require("../configuration/jwtConfig")
const authenticateOwner = (req,res,next) =>{
       const {name,email,password}=req.body; 
       const authheader =  req.header("Authorization");
       if(!authheader)
        {
            return res.status(401).json({message:"Unauthorized:missing token"});
        }
        const [bearer,token] = authheader.split(" ");
        if(bearer !=="Bearer" || !token)
        {
            return res.status(401).json({message:"unauthorized:Invalid token format"});
        }
        jwt.verify(token,secretkey,(err,payload)=>{
                if(err)
                {
                    return res.status(403).json({message:"Forbidden: Invalid token"});
                }
                const role = payload.role;
                if(role === "Owner")
                {
                    req.body = {
                        name:name,
                        email:email,
                        password:password
                    }
                    next();
                }

            })
}
const authenticateManager = (req,res,next) =>{
    const {name,email,password}=req.body;
    const authheader =  req.header("Authorization");
       if(!authheader)
        {
            return res.status(401).json({message:"Unauthorized:missing token"});
        }
        const [bearer,token] = authheader.split(" ");
        if(bearer !=="Bearer" || !token)
        {
            return res.status(401).json({message:"unauthorized:Invalid token format"});
        }
        jwt.verify(token,secretkey,(err,payload)=>{
                if(err)
                {
                    return res.status(403).json({message:"Forbidden: Invalid token"});
                }
                const role = payload.role;
                if(role === "Manager")
                {
                    req.body = {
                        name:name,
                        email:email,
                        password:password
                    }
                    next();
                }

            })
}
module.exports = {authenticateOwner,authenticateManager}