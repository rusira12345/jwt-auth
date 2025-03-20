const service = require("../services/transaction")
const createtransaction = async(req,res) =>{
            const body = req.body;
            try{
                await service.createtransaction(body);
                return res.status(201).json({message:"Transaction created successfully"}); 
            }catch(error)
            {
                return res.status(404).json({message:error.message});
            }
}
module.exports = {createtransaction}