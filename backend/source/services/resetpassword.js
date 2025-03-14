const user = require("../models/User")
const bcrypt = require("bcrypt");
const resetpassword = async(password,email) =>{
    if(!password)
    {
        throw new Error("Give a new password");   
    }
    else
    {
        const existinguser = await user.findOne({email});
        const hashedpassword = await bcrypt.hash(password,10);
        existinguser.password = hashedpassword;
        await existinguser.save();
    }
}
module.exports = {resetpassword}