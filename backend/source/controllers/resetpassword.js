const {resetpassword} = require("../services/resetpassword")
const resetpasswords = async(req,res) =>{
    const {password,email} = req.body;
    try{
        await resetpassword(password,email)
        res.status(200).json({message:"password reset successfully"});
    }catch(error)
    {
        res.status(400).json({message:"Cannot reset the password"});
    }
}
module.exports = {resetpasswords}