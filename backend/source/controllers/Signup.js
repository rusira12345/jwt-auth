const signupservice = require("../services/Signup")
const createUser = async(req,res) =>{
    try{
            const userinfor = req.body;
            const user = await signupservice.createUser(userinfor);
            res.status(201).json({user:user,message:"User created successfully"});
    }catch(error)
    {
        res.status(400).json({message:error.message})
    }
}
module.exports = {createUser}