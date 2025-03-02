const User = require("../models/User");

const getAllUsers = async() =>{
    try{
        const users = await User.find();
        return users;
    }catch(error)
    {
        throw new Error(error.message);
    }
}

module.exports = {getAllUsers};