const express = require("express");
const {verifyotps} = require("../controllers/verifyotp")
const middleware = require("../utils/authMiddleware")
const router = express.Router();
router.post("/verifyotp",middleware.authenticateverifyotpbytoken,verifyotps);
module.exports = router;