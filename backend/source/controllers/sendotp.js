const {sendotp} = require("../services/sendotp")
const {secretkey} = require("../configuration/jwtConfig")
const jwt = require("jsonwebtoken");
const sendotps = async(req,res) =>{
    let role;
    const {email} = req.body;
    try{
        const token = await sendotp(email);
        jwt.verify(token,secretkey,(err,payload)=>{
                        role = payload.role;
                    })
        res.status(202).json({message:"OTP send to your email",token:{token},role:role});
    }catch(error)
    {
        res.status(401).json({message:error.message});
    }
}
module.exports = {sendotps}