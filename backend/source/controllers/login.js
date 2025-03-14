const jwt = require("jsonwebtoken");
const  {secretkey}= require("../configuration/jwtConfig")
const authService= require("../services/login")
const login = async(req,res) =>{
    let role;
    try
    {
        const{email,password} = req.body;
        const token = await authService.login(email,password);
        jwt.verify(token,secretkey,(err,payload)=>{
                role = payload.role;
            })
        res.status(200).json({token:token,role:role});
    }catch(error)
    {
        res.status(401).json({message:error.message})
    }
}

module.exports = {login}