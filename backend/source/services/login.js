const bcrypt = require("bcrypt");
const user = require("../models/User")
const {generateToken} = require("../utils/jwtUtils")
const {verifytoken} = require("../utils/authMiddleware");
const User = require("../models/User");
const login= async(email,password) =>{
        const existemail = await user.findOne({email:email});
        if(!existemail)
        {
            throw new Error(" email is not exist")
        }
        else{
                const isPasswordvalid=await bcrypt.compare(password,existemail.password);
                if(isPasswordvalid)
                {
                       const token=generateToken(existemail);
                       return token;
                }else
                {
                    throw new Error("password is not valid");
                }
        }
}
const refreshtoken = async(oldtoken) =>{
    try{
    const decodedToken = verifytoken(oldtoken);/*when the verifytoken is success when it return 
    the token payload but the verify token is not sucess it means it is expired so it throw an exception*/ 
     const user =  await User.findById(decodedToken.id);
     if(!user)
        {
            throw new Error("user not found");
        }  
        else
        {
                const newtoken = generateToken(user);
                return newtoken;
        }
    }catch(error)
    {
        throw new Error("Invalid token");
    }
} 
module.exports = {login,refreshtoken}