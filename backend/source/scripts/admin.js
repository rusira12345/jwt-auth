const user = require("../models/User")
const bcrypt = require("bcrypt");
const createAdmin = async() =>{
    try{
    const findadmin = await user.findOne({email:"adminrusira@gmail.com"});
    if(!findadmin)
    {
        const admin = new user({
            name:"Dineth prabasara",
            email:"adminrusira@gmail.com",
            password:await bcrypt.hash("rusira12345",10),
            role:"Owner"
        })
        try{
        await admin.save();
        }catch(error)
        {
            console.log(error);
        }
    }
    else{
        console.log("Admin already exist");
    }
}catch(error)
{
    console.log(error);
}
}
module.exports = {createAdmin}