const jwt = require("jsonwebtoken");
const {secretkey} = require("../configuration/jwtConfig")

const generateToken = (user) =>{
    const payload ={
        id:user._id,
        email:user.email,
        role:user.role
    }
    return jwt.sign(payload,secretkey,{expiresIn:"1h"})
}
module.exports = {generateToken}