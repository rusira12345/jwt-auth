const bcrypt = require("bcrypt");
const user = require("../models/User")
const {generateToken} = require("../utils/jwtUtils")
const User = require("../models/User");
const login= async(email,password) =>{
        const existuser = await user.findOne({email:email});
        if(!existuser)
        {
            throw new Error(" email is not exist")
        }
        else{
                const isPasswordvalid=await bcrypt.compare(password,existuser.password);
                if(isPasswordvalid)
                {
                       const token=generateToken(existuser);
                       return token;
                }else
                {
                    throw new Error("password is not valid");
                }
        }
}

module.exports = {login}