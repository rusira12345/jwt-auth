const express = require("express");
const router = express.Router();
const dotenv = require("dotenv")
const product = require("../models/Product")
const transaction = require("../models/transaction")
dotenv.config();
const stripe = require("stripe")("sk_test_51R4LrYGmCOaBKKe5FeIWJxaLv49wdVl3uybU55d4lBah62AmL3CbkkbS1UEdcvPoZ89gCvO0Y7Kxm4gHGf5mpF1I00K5Al6gdD");
router.post("/webhooks",async(req,res)=>{
    
    const sig = req.headers['stripe-signature'];
    let event;
    try{
            event = stripe.webhooks.constructEvent(req.body,sig,"whsec_a3d1741e943f9fb417d32b840c2c90156233c83f3a44b04a499b6bf3295b8e80")
    }catch(error)
    {
            console.log("Webhook signature verification failed",error.message);
    }
    if(event.type==="checkout.session.completed")
    {
        const session = event.data.object;
        try{
            const purchaseditems = JSON.parse(session.metadata.items);
            const totalamount = session.amount_total/100;
            for(const item of purchaseditems)
            {
                await product.findOneAndUpdate(
                    {ProductName:item.productname},
                    {$inc:{Quantity:-item.quantity}}
                );
            }
            const newtransaction = new transaction({
                TotalPrice:totalamount,
                Customer_payment:totalamount,
                Balance:0
            })
            await newtransaction.save();
            console.log("Invenory update & transaction saved successfully");
        }catch(error)
        {
            console.error("Error updating data in mongodb",error);
        }
    }
    if (event.type === 'payment_intent.payment_failed') {
        const paymentIntent = event.data.object;
        const lastPaymentError = paymentIntent.last_payment_error;
        console.log('Payment failed:', lastPaymentError.message);
    }
    res.status(200).send("webhook received");
})
module.exports = router