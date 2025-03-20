const transaction = require("../models/transaction")
const createtransaction = async(details) =>{
        const {TotalPrice,Customer_payment,Balance} = details;
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
        }
}
module.exports = {createtransaction}