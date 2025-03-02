const crypto = require("crypto");
//Generate a random secret key
const secretkey = crypto.randomBytes(32).toString('hex');
module.exports={
    secretkey:secretkey
}