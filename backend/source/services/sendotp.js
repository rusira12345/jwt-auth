const {transporter} = require("../configuration/nodemailer")
const {generateToken} = require("../utils/jwtUtils")
const user = require("../models/User")
const sendotp = async(email) =>{
    const existingUser = await user.findOne({email});
    if(!existingUser)
    {
        throw new Error("user is not existing");
    }
    else{
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        existingUser.otp = otp;
        existingUser.otpExpiretime = Date.now()+1*60*60*1000;
        const token = generateToken(existingUser);
        await existingUser.save();
        const mainOptions = {
            from:process.env.SENDER_EMAIL,
            to:existingUser.email,
            subject:"Reset password OTP",
            text:`Your otp is ${existingUser.otp},use this otp to reset your password`
        }
        await transporter.sendMail(mainOptions);
        return token;
    }
}
module.exports = {sendotp}