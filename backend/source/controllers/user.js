const {getAllUsers} = require("../services/user");

const getusers = async(req,res) =>{
    try{
            const users = await getAllUsers();
            res.status(200).json(users);
    }catch(error)
    {
            res.status(500).json({message:error.message});
    }
}
module.exports ={getusers}