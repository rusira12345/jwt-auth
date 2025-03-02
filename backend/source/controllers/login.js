const authService= require("../services/login")
const login = async(req,res) =>{
    try
    {
        const{email,password} = req.body;
        const token = await authService.login(email,password);
        res.status(200).json({token:token});
    }catch(error)
    {
        res.status(401).json({message:error.message})
    }
}
const refreshtoken = async(req,res) =>{
    try
    {
        const{token} = req.body;
        const newtoken = await authService.refreshtoken(token);
        res.status(200).json({token:newtoken});
    }catch(error)
    {
        res.status(401).json({message:"Invalid token"})
    }
}
module.exports = {login,refreshtoken}