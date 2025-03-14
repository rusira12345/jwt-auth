const signupservice = require("../services/Signup")
const createManager = async(req,res) =>{
    try{
            const userinfor = req.body;
            const user = await signupservice.createManager(userinfor);
            res.status(201).json({user:user,message:"Manager created successfully"});
    }catch(error)
    {
        res.status(400).json({message:error.message})
    }
}
const createCashier = async(req,res) =>{
    try{
        const userinfor = req.body;
        await signupservice.createCashier(userinfor);
        res.status(201).json({message:"Cashier created successfully"});
    }catch(error)
    {
        res.status(400).json({message:error.message});
    }
}
module.exports = {createManager,createCashier}