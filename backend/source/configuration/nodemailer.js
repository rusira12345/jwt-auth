const  nodemailer= require("nodemailer");
const transporter = nodemailer.createTransport({
    host:"smtp-relay.brevo.com",
    port:587,
    auth:{
        user:process.env.SMTP_USER || "87c98f001@smtp-brevo.com",
        pass:process.env.SMTP_PASS || "AgJ5zT3R9PX2Ufbv"
    },
    tls:{
        rejectUnauthorized:false
    }
})
module.exports = {transporter}