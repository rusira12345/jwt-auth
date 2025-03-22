const transaction = require("../models/transaction")
require("dotenv").config();
const {transporter} = require("../configuration/nodemailer")
const createtransaction = async(details) =>{
        const {TotalPrice,Customer_payment,Balance,emails} = details;
        if(TotalPrice>Customer_payment)
        {
            throw new Error("Customer payment is less than total price");
        }
        if(!TotalPrice || !Customer_payment || !Balance)
        {
            throw new Error("All fields are required");
        }
        else
        {
                const newtransaction =new transaction({
                    TotalPrice,
                    Customer_payment,
                    Balance
                })
                await newtransaction.save();
                const mainOptions = {
                    from:process.env.SENDER_EMAIL,
                    to:emails,
                    subject:"FRESHFARE Payment Successfull",
                    html:`<p>Total Price : ${TotalPrice}</p><p>Customer Payment : ${Customer_payment}</p><p>Balance : ${Balance}</p>`
                }
                await transporter.sendMail(mainOptions)
        }
}
module.exports = {createtransaction}