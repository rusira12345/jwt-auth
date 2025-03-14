const {verifyotp}= require("../services/verifyotp")
const verifyotps =async(req,res) =>{
    const {otp,email} = req.body;
    try{
        await verifyotp(otp,email);
        return res.status(200).json({message:"OTP is valid"});
    }catch(error)
    {
        return res.status(401).json({message:error.message})
    }
}
module.exports = {verifyotps}