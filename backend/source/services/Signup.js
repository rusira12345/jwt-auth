const User = require("../models/User")
const bcrypt = require("bcrypt");

const createUser =async (userData) =>{
       const{name,email,password} = userData;
       const hashedpassword = await bcrypt.hash(password,10);
       const existingUser =  await User.findOne({email});
       if(existingUser)
       {
              throw new Error("Email already in use,Please use a different email");
       }
       const createduser = new User({name:name,
              email:email,
              password:hashedpassword,
              role:"customer"})      
       const savedUser =await createduser.save();  
       return savedUser;
}
module.exports = {createUser};