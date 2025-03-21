const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")("sk_test_51R4LrYGmCOaBKKe5FeIWJxaLv49wdVl3uybU55d4lBah62AmL3CbkkbS1UEdcvPoZ89gCvO0Y7Kxm4gHGf5mpF1I00K5Al6gdD")
const stripess = async(req,res) =>{

        const {items} = req.body;
        const lineItems = items.map((item)=>(
            {
                price_data:{
                    currency:"USD",
                    product_data:{
                        name:item.productname,
                        images:[item.image]
                    },
                    unit_amount:item.priceUSD*100,
                },
                quantity:item.quantity
            }
        ))
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:5173/cashier-dashboard",
            metadata:{items:JSON.stringify(items)}
        })
        res.json({id:session.id});
} 


module.exports = {stripess}

