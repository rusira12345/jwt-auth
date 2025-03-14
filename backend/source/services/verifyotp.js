const user = require("../models/User")
const verifyotp = async(otp,email) =>{
        const existinguser = await user.findOne({email});
        if(!existinguser)
        {
            throw new Error("You are not existing our database please sign up");
        }
        else{
            const databaseotp = existinguser.otp;
            if(otp !== databaseotp || otp === '')
            {
                    throw new Error("Otp is not matching");
            }
            if(Date.now()>existinguser.otpExpiretime)
            {
                throw new Error("OTP is expired");
            }
            else
            {
                existinguser.otpExpiretime = 0
                existinguser.otp = ""
                await existinguser.save();
            }
        }
}
module.exports = {verifyotp}