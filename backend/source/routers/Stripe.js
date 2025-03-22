const express = require("express");
const controller = require("../controllers/stripes")
const authmiddleware = require("../utils/Stripeauth")
const router = express.Router();
router.post("/create-checkout-session",authmiddleware.authcashier,controller.stripess);
module.exports = router;