const dotenv = require("dotenv");
dotenv.config();
const transaction = require("../models/transaction")
const product = require("../models/Product")
const stripe = require("stripe")(process.env.SECRET_KEY )
const stripess = async(req,res) =>{
        let total = 0;
        const {items} = req.body;
        const lineItems = items.map((item)=>(
            {
                price_data:{
                    currency:"USD",
                    product_data:{
                        name:item.productname,
                        images:[item.image]
                    },
                    unit_amount:Math.round(item.priceUSD*100),
                },
                quantity:item.quantity
            }
        ))
        try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:5173/payment/successfull",
            cancel_url:"http://localhost:5173/payment/unsuccessfull"
        })
        for(let i=0;i<items.length;i++)
        {
            total +=parseFloat(items[i].price);
            const existingproduct = await product.findOne({ProductName:items[i].productname});
            if(existingproduct)
            {
                existingproduct.Quantity = existingproduct.Quantity - items[i].quantity
                await existingproduct.save();
            }
        }
        const newtransaction = new transaction({
            TotalPrice:total,
            Customer_payment:total,
            Balance:0
        })
        await newtransaction.save()
        res.status(200).json({id:session.id});
    }catch(error)
    {
        return res.status(404).json({message:"Session is not created"});
    }
} 


module.exports = {stripess}

