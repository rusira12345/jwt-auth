const User = require("../models/User")
const bcrypt = require("bcrypt");

const createManager =async (userData) =>{
       const{name,email,password} = userData;
       const hashedpassword = await bcrypt.hash(password,10);
       const existingUser =  await User.findOne({email});
       if(existingUser)
       {
              throw new Error("The manager is already existing");
       }
       const createduser = new User({name:name,
              email:email,
              password:hashedpassword,
              role:"Manager"})      
       const savedUser =await createduser.save();  
       return savedUser;
}
const createCashier = async(userData) =>{
       const {name,email,password} = userData;
       const hashedpassword = await bcrypt.hash(password,10);
       const existingUser =  await User.findOne({email});
       if(existingUser)
              {
                     throw new Error("The Cashier is already existing");
              }
       const createduser = new User({name:name,
                     email:email,
                     password:hashedpassword,
                     role:"Cashier"})      
       await createduser.save();  
       
}
module.exports = {createManager,createCashier};